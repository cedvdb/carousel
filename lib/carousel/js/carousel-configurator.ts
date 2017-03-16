import { CarouselEventEmitter } from './carousel-event-emitter';
import { EventHandler } from './event-handler';
import { Image } from './image';

export class CarouselConfigurator{
	//function that deals with the creation of elements, not implemented yet
	creationFn: Function;
	images: Array<Image> = [];
	// receive events
	eventHandler: EventHandler;
	// emits events
	eventEmitter: any;

	constructor(images?:Array<Image>, creationFn?:Function, 
							eventHandler?: EventHandler, eventEmitter?){
		this.images = images;
		this.creationFn = creationFn;
		this.eventEmitter = eventEmitter;
		this.eventHandler = eventHandler;
	}
}