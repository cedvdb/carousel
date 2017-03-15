import { Image } from './image';
import { CarouselConfigurator } from './carousel-configurator';
import { Builder } from './builder';
import { CarouselEventHandler } from "./carousel-event-handler"
import "../css/carousel.scss";

export class Carousel{
	private ctnr;
	public items: Array<HTMLElement> = [];
	private config;
	private builder;

	constructor(wrapper: HTMLElement, config?: CarouselConfigurator){
		if(! wrapper ) throw Error("A target element is required in the constructor.");
		this.config = config;
		this.create(wrapper);
	}

	// creates the carousel
	private create(wrapper:HTMLElement){
		// if elements are supplied add them, if images are supplied add them
		// TODO: this is a bug in typescript with a fix in the way, this ugly cast should be removed
		this.pushElements(<HTMLCollectionOf<HTMLElement>>wrapper.children);
		// images are converted to HTMLElement
		this.pushImages(this.config.images);
		this.builder = new Builder();
		this.ctnr = this.builder.makeCarousel(wrapper, this.items)
		//new CarouselEventHandler(this.ctnr);
	}

	// push image url
	pushElement(elem:HTMLElement){
		if(elem.className.indexOf("c-img") < 0)
			elem.className += "c-img";
		this.items.push(elem);

	}

	pushElements(elems:HTMLCollectionOf<HTMLElement> | Array<HTMLElement>){
		for(let i = 0; i < elems.length; i++){
			// TODO bug in typescript, with a fix in the way, this cast should be removed
			this.pushElement(<HTMLElement> elems[i]);
		}
	}

	// insert image url
	insertElement(index:number, elem:HTMLElement){
		this.items.splice(index, 0, elem);
	}
	
	// push image url
	pushImage(img:Image){
		this.pushElement(Builder.makeImage(img));
	}
	// push an array of Image .
	pushImages(images:Array<Image>){
		images.forEach(img => this.pushImage(img))
	}

	// insert image url
	insertImage(index:number, img:Image){
		this.items.splice(index, 0, Builder.makeImage(img));
	}

	private handleError(){
		throw new Error(' wrong configuration for the Carousel. Check doc')
	}
}
