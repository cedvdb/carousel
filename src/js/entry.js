/*This is the entry point for webpack, you can add your entry point here*/
// to add your entry point do it as such:
// import { main } from "./main"


//styles

import "../css/styles.scss";
import { Carousel } from "../../lib/carousel/js/carousel";

let config = {
	images: [
						{url: "http://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg"}
					]
	};
let elem = document.getElementById('carouselCtnr')
new Carousel(elem, config);