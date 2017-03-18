import { STRUCTURE_IMAGE_CTNR } from './utils/structures';
import { IControls } from './interfaces/controls.interface';
import { STRUCTURE_BASE } from './utils/structures';
import { Utils } from './utils/utils';


export class Builder{
	private carousel:HTMLElement;
	private structure:HTMLElement;
	private closeDiv:HTMLElement;
	private arrows:NodeListOf<HTMLElement>;
	private elemList:Array<HTMLElement> = [];


	constructor(){
	}

	// build the carousel, returns the controllers 
	protected makeCarousel(wrapper:HTMLElement){
		// make the base structure 
		this.structure = Utils.stringToHtml(STRUCTURE_BASE);
		// select carousel from struct, keeping ref for future reference
		this.carousel = this.structure.querySelector(".carousel") as HTMLElement;
		this.arrows = this.structure.querySelectorAll('.carousel-arrows') as NodeListOf<HTMLElement>;
		this.closeDiv = this.structure.querySelector('.carousel-close') as HTMLElement;
		// add everything to da structure
		this.structure.appendChild(this.carousel);
		wrapper.appendChild(this.structure);
	}

	// here we can push an element in the carousel
	pushItem(elem:HTMLElement):HTMLElement{
		if(elem.className.indexOf("c-img") < 0)
			elem.className += "c-img";
		let itemCtnr = this.makeItemCtnr(elem);
		this.carousel.appendChild(itemCtnr);
		this.elemList.push(itemCtnr)
		return itemCtnr;
	}

	pushItems(elems:HTMLCollectionOf<HTMLElement> | Array<HTMLElement>){
		for(let i = 0; i < elems.length; i++){
			// TODO bug in typescript, with a fix in the way, this cast should be removed
			console.log('fix this');
			this.pushItem(<HTMLElement> elems[i]);
		}
	}

	// We isnert an element according to it's index
	// this function is somewhat complex
	//first we check if an element with an index higher than the 
	// one we try to insert already exist (eg: the image data came back sooner
	// from the request).
	// Then if that element does not exist we append to the container
	// if there is one we use insert before.
	// then we add the element to the correct index
	insertItem(index:number, elem:HTMLElement){
		let i = index;
		let prevElem;
		let itemCtnr;
		let arrLength = this.elemList.length;

		while(this.elemList[i] === undefined && i < arrLength){
			i++;
		}
		if(elem.className.indexOf("c-img") < 0)
			elem.className += "c-img";
		itemCtnr = this.makeItemCtnr(elem);
		// if no elem after it
		if(this.elemList[i] === undefined)
			this.carousel.appendChild(itemCtnr);
		else
			this.carousel.insertBefore(itemCtnr, this.elemList[i]);
		this.elemList[index] = itemCtnr;

	}


	private makeItemCtnr(elem:HTMLElement){
		let imgCtnr = Utils.stringToHtml(STRUCTURE_IMAGE_CTNR);
		imgCtnr.appendChild(elem);
		return imgCtnr;
	}

	get controls():IControls{
		return {
			carousel: this.carousel, 
			ctnr: this.structure,
			arrows: this.arrows,
			closeDiv: this.closeDiv
		}
	}

}
