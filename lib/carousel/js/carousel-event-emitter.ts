import { EventEmitter } from './event-emitter';
import { Events } from './events';
import { Controls } from './controls';
import { Listener } from './listener';


// this class add event to the different elements then dispatch them to the listenner(carousel).
export class CarouselEventEmitter implements EventEmitter {
	private listener; // listen to events
	private ctnr;
	private carousel; // the moving piece
	private arrows; // controlling arrows
	private closeDiv; // X icon to close when zoomed
	private interval; // for the arrows event listener (moving/scroll)


	constructor(){}

	setup(listener: Listener, controls: Controls) {
		this.listener = listener;
		this.ctnr = controls.ctnr;
		this.carousel = controls.carousel
		this.arrows = controls.arrows;
		this.closeDiv = controls.closeDiv;
		this.addEvents();
	}

	private addEvents(){
		this.addHScroll(this.carousel);
		this.addImageClickEvent();
		this.addArrowScroll(this.arrows[0], "left");
		this.addArrowScroll(this.arrows[1], "right");
		this.addCloseEvent();
	}

	private addHScroll(elem){
		if (elem.addEventListener) {
				// IE9, Chrome, Safari, Opera
				elem.addEventListener("mousewheel", (e) => this.handleScroll(e), false);
				// Firefox
				elem.addEventListener("DOMMouseScroll", (e) => this.handleScroll(e), false);
		} else {
				// IE 6/7/8
				elem.attachEvent("onmousewheel", (e) => this.handleScroll(e));
		}
	}

	private handleScroll(e) {
			e = window.event || e;
			let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
			//if zoomer not active normal scroll, else pagination
			this.listener.listen({type: Events.SCROLL, payload:-delta});
			e.preventDefault();
	}

	private addImageClickEvent(){
		// zoomer closed
		this.carousel.addEventListener("click", e => {
			let type = Events.IMAGE_CLICK;
			let payload = e.target.closest(".carousel-imgCtnr");
			this.listener.listen({type, payload});
		});
	}

	private addCloseEvent(){
		this.closeDiv.addEventListener("click", e => {
			this.listener.listen({type: Events.CLOSE_ZOOMER, payload: null});
		});
	}

	private addArrowScroll(arrow, dir){
		dir = (dir === "right" ? 1 : -1);

		arrow.addEventListener("mousedown", () => {
			// if the zoomer isn't on we scroll else we slide
			// interval set for debouncing / prevent freeze
			this.interval = setInterval(() => {
				this.listener.listen({type: Events.ARROW_DOWN, payload: dir});
			}, 40);
		});

		arrow.addEventListener("mouseup", () => {
			clearInterval(this.interval);
			this.listener.listen({type: Events.ARROW_UP, payload: dir});
		});
		arrow.addEventListener("mouseleave", () => {
			clearInterval(this.interval);
			this.listener.listen({type: Events.ARROW_UP, payload: dir});
		});
	}
}