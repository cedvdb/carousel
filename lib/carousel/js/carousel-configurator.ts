import { CarouselEventEmitter } from './carousel-event-emitter';
import { EventHandler } from './event-handler';

export class CarouselConfigurator{
	//function that deals with the creation of elements, not implemented yet
	creationFn: Function;
	images: Array<any> = [];
	// receive events
	eventHandler: EventHandler;
	// emits events
	eventEmitter: any;

	constructor(images?:Array<any>, creationFn?:Function, 
							eventHandler?: EventHandler, eventEmitter?){
		this.images = images;
		this.creationFn = creationFn;
		this.eventEmitter = eventEmitter;
		this.eventHandler = eventHandler;
	}
}