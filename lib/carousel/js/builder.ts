import { Controls } from './controls';
import { Utils } from './utils';
import { Image } from './image';
import { STRUCTURE_BASE, STRUCTURE_IMAGE_CTNR } from './structures';

export class Builder{
	carousel:HTMLElement;
	structure:HTMLElement;

	constructor(){
	}

	// build the carousel, returns the controllers 
	makeCarousel(wrapper:HTMLElement, items:Array<HTMLElement>):Controls{
		if(! items)
			throw new Error('no items added to the carousel, skipping carousel creation.');
		// make the base structure 
		this.structure = Utils.stringToHtml(STRUCTURE_BASE);
		// select carousel from struct, keeping ref for future reference
		this.carousel = this.structure.querySelector(".carousel") as HTMLElement;
		let arrows = this.structure.querySelectorAll('.carousel-arrows') as NodeListOf<HTMLElement>;
		let closeDiv = this.structure.querySelector('.carousel-close') as HTMLElement;
		// push da items to da carousah
		items.forEach(item => this.pushItem(item));
		// add everything to da structure
		this.structure.appendChild(this.carousel);
		wrapper.appendChild(this.structure);
		return { ctnr: this.structure, carousel: this.carousel, arrows, closeDiv};
	}


	// here we can push an element in the carousel
	pushItem(elem:HTMLElement){
		let itemCtnr = Builder.makeItemCtnr(elem);
		this.carousel.appendChild(itemCtnr);
	}


  // we can make an img elemetn from an Image. This comes from the 
	// Carousel configurator where one can set an array of images.
	static makeImage(image:Image):HTMLElement{
		let description = image.description ? `data-description="${image.description}"` : "";
		let img = `<img src="${image.url}" ${description} class="c-img">`;
		return Utils.stringToHtml(img);
	}

	private static makeItemCtnr(elem:HTMLElement){
		let imgCtnr = Utils.stringToHtml(STRUCTURE_IMAGE_CTNR);
		imgCtnr.appendChild(elem);
		return imgCtnr;
	}


}
