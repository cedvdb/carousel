import { Events } from './events';
import { EventEmitter } from './event-emitter';
import { ILoader } from './interfaces/loader.interface';
import { Loader } from './loader';
import { mapper } from './function-mapper';
import { CarouselEventHandler } from './carousel-event-handler';
import { EventHandler } from './event-handler';
import { Controls } from './controls';
import { CarouselEventEmitter } from './carousel-event-emitter';
import { Action } from './action';
import { Listener } from './listener';
import { CarouselConfigurator } from './carousel-configurator';
import { Builder } from './builder';
import "../css/carousel.scss";

export class Carousel extends Builder implements Listener{
	private config: CarouselConfigurator;
	private handler: EventHandler;
	private emitter:EventEmitter;
	private loader:ILoader;

	constructor(){
		super();
		if(! window ) return;
	}

	// creates the carousel
	createDefault(wrapper:HTMLElement){
		if(! wrapper ) throw Error("A target element is required in create.");
		this.makeCarousel(wrapper);
		this.loader = new Loader();
		this.handler = new CarouselEventHandler();
		this.handler.setup(this.controls)
		this.emitter = new CarouselEventEmitter();
		this.emitter.setup(this, this.controls);
		return this;
	}
	// we load item(s) then add it to the carousel
	load(items:Array<any>){
		items.forEach(item => {
			this.loader
					.load(item)
					.then(elem => this.pushItem(elem))
					.then(elem => this.listen({ type: Events.ITEM_ADDED, payload: elem }));
		});
		return this;
	}

	listen(action: Action) {
		// this is weird but it's to allow to give custom mappers if needed
    this.handler[mapper[action.type]](action.payload);
  }

	private handleError(){
		throw new Error(' wrong configuration for the Carousel. Check doc')
	}
}
