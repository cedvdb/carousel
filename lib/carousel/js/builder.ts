import { Utils } from './utils';
import { Image } from './image';
import { STRUCTURE_BASE, STRUCTURE_IMAGE_CTNR } from './structures';

export class Builder{
	carousel:HTMLElement;
	structure:HTMLElement;

	constructor(){
	}
	// This is a comment
	makeCarousel(wrapper:HTMLElement, items:Array<HTMLElement>){
		if(! items)
			throw new Error('no items added to the carousel, skipping carousel creation.');
		// make the base structure 
		this.structure = Utils.stringToHtml(STRUCTURE_BASE);
		// select carousel from struct
		this.carousel = this.structure.querySelector(".carousel") as HTMLElement;
		// push da items to da carousah
		items.forEach(item => this.pushItem(item));
		// add everything to da structure
		this.structure.appendChild(this.carousel);
		wrapper.appendChild(this.structure);
		return this.structure;
	}

	// here we can push an element in the carousel
	pushItem(elem:HTMLElement){
		let itemCtnr = Builder.makeItemCtnr(elem);
		this.carousel.appendChild(itemCtnr);
	}

  // we can make an img elemetn from an Image. This comes from the 
	// Carousel configurator where one can set an array of images.
	static makeImage(image:Image):HTMLElement{
		let img = `<img src="${image.url}" data-description="${image.description}" class="c-img">`
		return Utils.stringToHtml(img)
	}

	private static makeItemCtnr(elem:HTMLElement){
		let imgCtnr = Utils.stringToHtml(STRUCTURE_IMAGE_CTNR);
		imgCtnr.appendChild(elem)
		return imgCtnr;
	}


}
