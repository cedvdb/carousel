import { EventHandler } from './event-handler';
import { Controls } from './controls';
import { Builder } from './builder';

export class CarouselEventHandler implements EventHandler{
	private controls;
	private _zoomer; // if it's zoomed (fullscreen)
	private _activeElement; // when zoomed, the element in the foreground
	private scrollLeft; // memorize scroll position 
	private interval; // for the arrows event listener (moving/scroll)

	constructor(){}

	setup(controls:Controls){
		this.controls = controls;
	}

	onScroll(direction:number){
		// if not zoomed we scroll else we slide
		// we only get the direction so when we have it we multiply it for 
		// faster scroll
		if(!this._zoomer){
			this.controls.carousel.scrollLeft += direction * 100; 
		}else{
			this.slide(direction);
		}
		this.refreshArrows();
	}

	onArrowDown(direction: number){
		// when not zoomed we use an interval so we keep scrolling
		// when mouse down
		if(this.zoomer)
			this.onScroll(direction)
		else
			this.interval = setInterval(() => {
				this.onScroll(direction);
			}, 40);
	}

	onArrowUp(direction: number){
		clearInterval(this.interval);
	}

	onImageClick(imgCtnr:HTMLElement) {
		let carou = this.controls.carousel;
		//saving scroll so when we unzoom we can re-establish it
		this.scrollLeft = carou.scrollLeft;
		// putting the scrollLeft to 0 so when we are zoomed the image is centered.
		// Ultimately we shouldn't have to have to do that because we could rely on css, 
		// but I didn't find a solution and this is an easy and clean fix
		carou.scrollLeft = 0;
		this.activeElement = imgCtnr;
		this.zoomer = true;
		this.refreshArrows();
  }

  onZoomClosed() {
		this.zoomer = false;
		// re-establishing scroll
		this.controls.carousel.scrollLeft = this.scrollLeft;
  }

	private slide(dir){
		if(dir >= 0){
			let next = <HTMLElement> this.activeElement.nextElementSibling;
			// we can't slide to an element that isn't there
			if(next)
				this.activeElement = next;
		}
		else{
			let previous = <HTMLElement> this.activeElement.previousElementSibling
			if(previous)
				this.activeElement = previous;
		}
		this.refreshArrows();
	}

	// hides / show arrows depending if we are at the end / beginning 
	// of the carousel
	private refreshArrows(){
		if(this.zoomer)
			this.refreshArrowsZoomed();
		else
			this.refreshArrowsUnzoomed();
	}

	private refreshArrowsZoomed(){
		let prev = this.activeElement.previousElementSibling;
		let next = this.activeElement.nextElementSibling;
		if(prev)
			this.controls.arrows[0].style.display = "flex";
		else
			this.controls.arrows[0].style.display = "none";
		if(next)
			this.controls.arrows[1].style.display = "flex";
		else
			this.controls.arrows[1].style.display = "none";
	}

	private refreshArrowsUnzoomed(){
		if(this.controls.carousel.scrollLeft === 0)
			this.controls.arrows[0].style.display = "none";
		else
			this.controls.arrows[0].style.display = "flex";

		let scrolledDistance = this.controls.carousel.clientWidth + this.controls.carousel.scrollLeft;

		if(this.controls.carousel.scrollWidth === scrolledDistance)
			this.controls.arrows[1].style.display = "none";
		else
			this.controls.arrows[1].style.display = "flex";	
	}

	private replaceClass(elem, classname){
			elem.className = elem.className.replace(" " + classname,"")
	}

	set activeElement(elem:HTMLElement){
		if(this._activeElement)
			this.replaceClass(this._activeElement, 'carousel-elem-active');
		// for when we call the setter with undefined values
		if(elem)
			elem.className += " carousel-elem-active";
		this._activeElement = elem;
	}

	get activeElement(){
		return this._activeElement;
	}

	set zoomer(bool:boolean){
		let ctnr = this.controls.ctnr;
		if(bool && ctnr.className.indexOf("zoomer") < 0){
			ctnr.className += " zoomer";
			this.controls.closeDiv.style.display = "block";
		}
		else{
			this.controls.closeDiv.style.display = "none";
			this.replaceClass(ctnr, "zoomer");
			this.activeElement = undefined;
		}
		this._zoomer = bool;
	}

	get zoomer(){
		return this._zoomer;
	}
}



