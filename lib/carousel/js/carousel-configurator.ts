import { Image } from './image';

export class CarouselConfigurator{
	zoomer = true;
	zoomer_only = false;
	creationFn;
	images: Array<Image> = [];

	constructor(images?:Array<Image>, creationFn?:Function){
		this.images = images;
		this.creationFn = creationFn;
	}
}