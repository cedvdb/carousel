import { Events } from './utils/events';
import { IEventEmitter } from './interfaces/event-emitter.interface';
import { IControls } from './interfaces/controls.interface';
import { IListener } from './interfaces/listener.interface';


// this class add event to the different elements then dispatch them to the listenner(carousel).
export class DefaultEventEmitter implements IEventEmitter {
	private listener; // listen to events
	private ctnr;
	private carousel; // the moving piece
	private arrows; // controlling arrows
	private closeDiv; // X icon to close when zoomed



	setup(listener: IListener, controls: IControls) {
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
			this.listener.listen({type: Events.ARROW_DOWN, payload: dir});
		});
		arrow.addEventListener("mouseup", () => {
			this.listener.listen({type: Events.ARROW_UP, payload: dir});
		});
		arrow.addEventListener("mouseleave", () => {
			this.listener.listen({type: Events.ARROW_UP, payload: dir});
		});
	}
}