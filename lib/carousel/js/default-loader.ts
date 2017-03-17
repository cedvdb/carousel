import { ILoader } from './interfaces/loader.interface';


export class DefaultLoader implements ILoader{
	// load element
	// push it to the list of items
	load(item:any):Promise<HTMLElement>{
		let downloadingImage = new Image();
		let img:HTMLImageElement = document.createElement("img");
		let prom =  new Promise((resolve,reject) => {
			downloadingImage.onload = () => {
				img.src = item;
				resolve(img);
			};
    });
		downloadingImage.src = item;
		return prom;
	}
}