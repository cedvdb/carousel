/*This is the entry point for webpack, you can add your entry point here*/
// to add your entry point do it as such:
// import { main } from "./main"


//styles

import "../css/styles.scss";
import { Carousel } from "../../lib/carousel/js/carousel";

let elem = document.getElementById('ctnr')
let images = [
						"https://unsplash.it/450/450/?random",
            "https://unsplash.it/400/400/?random",
            "https://unsplash.it/300/300/?random",
            "https://unsplash.it/400/?random",
            "https://unsplash.it/600/?random",
            "https://unsplash.it/500/?random",
            "https://unsplash.it/550/?random",
            "https://unsplash.it/450/?random",
            "https://unsplash.it/700/?random",
            "https://unsplash.it/250/?random",
            "https://unsplash.it/350/?random"
						];
let carousel = new Carousel()
								.createDefault(elem)
								.load(images);