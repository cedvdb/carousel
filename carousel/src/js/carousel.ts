import { Events } from './utils/events';
import { IAction } from './interfaces/action.interface';
import { DefaultEventEmitter } from './default-event-emitter';
import { DefaultEventHandler } from './default-event-handler';
import { DefaultLoader } from './default-loader';
import { ILoader } from './interfaces/loader.interface';
import { IEventEmitter } from './interfaces/event-emitter.interface';
import { IEventHandler } from './interfaces/event-handler.interface';
import { IListener } from './interfaces/listener.interface';

import { Builder } from './builder';
import "../css/carousel.scss";
import { mapper } from "./utils/function-mapper";

export class Carousel extends Builder implements IListener{
	// private config: CarouselConfigurator;
	private handler: IEventHandler;
	private emitter: IEventEmitter;
	private loader: ILoader;
	private index = 0;

	constructor(){
		super();
		if(! window ) return;
	}

	// creates the carousel
	create(wrapper:HTMLElement){
		if(! wrapper ) throw Error("A target element is required in create.");
		this.makeCarousel(wrapper);
		this.loader = new DefaultLoader();
		this.handler = new DefaultEventHandler();
		this.handler.setup(this.controls)
		this.emitter = new DefaultEventEmitter();
		this.emitter.setup(this, this.controls);
		return this;
	}
	// we load item(s) then add it to the carousel
	load(items:Array<any>){
		items.forEach((item) => {
			let currIndex = this.index;
			this.loader
					.load(item)
					.then(elem => this.insertItem(currIndex, elem))
					.then(elem => this.listen({ type: Events.ITEM_ADDED, payload: elem }));
			this.index++;
		});
		return this;
	}

	listen(action: IAction):void {
		// this is weird but it's to allow to give custom mappers if needed
    this.handler[mapper[action.type]](action.payload);
  }

	private handleError(){
		throw new Error(' wrong configuration for the Carousel. Check doc')
	}
}
