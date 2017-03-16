import { mapper } from './function-mapper';
import { CarouselEventHandler } from './carousel-event-handler';
import { EventHandler } from './event-handler';
import { Controls } from './controls';
import { CarouselEventEmitter } from './carousel-event-emitter';
import { Action } from './action';
import { Listener } from './listener';
import { Image } from './image';
import { CarouselConfigurator } from './carousel-configurator';
import { Builder } from './builder';
import "../css/carousel.scss";

export class Carousel implements Listener{
	public items: Array<HTMLElement> = [];
	private config: CarouselConfigurator;
	private builder;
	private controls:Controls;
	private eventHandler: EventHandler;

	constructor(wrapper: HTMLElement, config?: CarouselConfigurator){
		if(! wrapper ) throw Error("A target element is required in the constructor.");
		this.config = config;
		this.create(wrapper);
	}

	// creates the carousel
	private create(wrapper:HTMLElement){
		this.addImages(wrapper);
		this.builder = new Builder();
		// build the carousel, returns the controllers 
		this.controls = this.builder.makeCarousel(wrapper, this.items);
		this.addEventsEmitter();
		this.addEventHandler();
	}

	private addImages(wrapper){
		// if elements are supplied add them, if images are supplied add them as well
		// TODO: this is a bug in typescript with a fix in the way, this ugly cast should be removed
		this.pushElements(<HTMLCollectionOf<HTMLElement>>wrapper.children);
		// images are converted to HTMLElement
		this.pushImages(this.config.images);
	}

	private addEventsEmitter(){
		let emitter;
		if(this.config.eventEmitter)
			emitter = this.config.eventEmitter();
		else
			emitter = new CarouselEventEmitter();
		emitter.setup(this, this.controls);
	}

	private addEventHandler(){
		if(this.config.eventHandler)
			this.eventHandler = this.config.eventHandler;
		else
			this.eventHandler = new CarouselEventHandler();
		this.eventHandler.setup(this.controls)
	}

	listen(action: Action) {
		// this is weird but it's to allow to give custom mappers if needed
    this.eventHandler[mapper[action.type]](action.payload);
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
