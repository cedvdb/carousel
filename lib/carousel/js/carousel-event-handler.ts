import { Builder } from './builder';

export class CarouselEventHandler{
	private ctnr;
	private carousel; // the moving piece
	private arrows; // controlling arrows
	private interval; // for the arrows event listener (moving/scroll)
	private _zoomer; // if it's zoomed (fullscreen)
	private _activeElement; // when zoomed, the element in the foreground
	private scrollLeft; // memorize scroll position 

	constructor(element:HTMLElement){
		this.ctnr = element;
		this.create();
	}

	create(){
		this.carousel = this.ctnr.querySelector('.carousel');
		this.arrows = this.ctnr.querySelectorAll('.carousel-arrows');
		this.addEvents();
	}


	scroll(val:number){
		// if not zoomed we scroll else we slide
		if(!this._zoomer){
			this.carousel.scrollLeft += val;
			this.refreshArrows();
		}else{
			this.slide(val);
		}
	}

	refreshArrows(){
		if(this.carousel.scrollLeft === 0)
			this.arrows[0].style.display = "none";
		else
			this.arrows[0].style.display = "flex";
		if(this.carousel.scrollWidth === (this.carousel.clientWidth + this.carousel.scrollLeft))
			this.arrows[1].style.display = "none";
		else
			this.arrows[1].style.display = "flex";	
	}

	private slide(dir){
		if(dir >= 0){
			let next = <HTMLElement> this.activeElement.nextElementSibling;
			if(next)
				this.activeElement = next;
		}
		else{
			let previous = <HTMLElement> this.activeElement.previousElementSibling
			if(previous)
				this.activeElement = previous;
		}
	}


	private addEvents(){
		this.addHScroll(this.carousel);
		this.addImageClickEvent();
		this.addArrowScroll(this.arrows[0], "left");
		this.addArrowScroll(this.arrows[1], "right");
	}

	private addHScroll(elem){
		if (elem.addEventListener) {
				// IE9, Chrome, Safari, Opera
				elem.addEventListener("mousewheel", (e) => this.scrollHorizontally(e), false);
				// Firefox
				elem.addEventListener("DOMMouseScroll", (e) => this.scrollHorizontally(e), false);
		} else {
				// IE 6/7/8
				elem.attachEvent("onmousewheel", (e) => this.scrollHorizontally(e));
		}
	}

	private scrollHorizontally(e) {
			e = window.event || e;
			let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
			//if zoomer not active normal scroll, else pagination
			this.scroll(-delta * 100); // Multiplied by 100, won't affect the slider
			e.preventDefault();
	}

	private addCloser(){

	}

	private addImageClickEvent(){
		// //builder should do that
		// let closeDiv = Builder.makeCloseIcon();
		// // zoomer open
		// closeDiv.addEventListener("click", e => {
		// 	this.ctnr.removeChild(closeDiv);
		// 	this.zoomer = false;
		// 	this.activeElement = undefined;
		// 	this.carousel.scrollLeft = this.scrollLeft;
		// });
		// zoomer closed
		this.carousel.addEventListener("click", e => {
			//saving scroll so when we unzoom we can re-establish it
			this.scrollLeft = this.carousel.scrollLeft;
			// putting the scrollLeft to 0 so when we are zoomed the image is centered.
			// Ultimately we shouldn't have to have to do that because we could rely on css, 
			// but I didn't find a solution and this is an easy and clean fix
			this.carousel.scrollLeft = 0;
			this.activeElement = e.target.closest(".carousel-imgCtnr");
			this.zoomer = true
		});
	}

	private addArrowScroll(arrow, dir){
		dir = (dir === "right" ? 1 : -1);

		arrow.addEventListener("mousedown", () => {
			// if the zoomer isn't on we scroll else we slide
			if(! this.zoomer)
				this.interval = setInterval(() => this.scroll( dir * 50) , 40);
			else
				this.slide(dir);
		})
		arrow.addEventListener("mouseup", () => {
			clearInterval(this.interval);
		});
		arrow.addEventListener("mouseleave", () => {
			clearInterval(this.interval);
		});
	}

	private replaceClass(elem, classname){
			elem.className = elem.className.replace(" " + classname,"")
	}

	set activeElement(elem:HTMLElement){
		if(this._activeElement)
			this.replaceClass(this._activeElement, 'carousel-elem-active');
		if(elem)
			elem.className += " carousel-elem-active";
		this._activeElement = elem;
	}

	get activeElement(){
		return this._activeElement;
	}

	set zoomer(bool:boolean){
		if(bool && this.ctnr.className.indexOf("zoomer") < 0)
			this.ctnr.className += " zoomer";
		else
			this.replaceClass(this.ctnr, "zoomer")
		this._zoomer = bool;
	}

	get zoomer(){
		return this._zoomer;
	}
}



