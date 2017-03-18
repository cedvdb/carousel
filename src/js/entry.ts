/*This is the entry point for webpack, you can add your entry point here*/
// to add your entry point do it as such:
// import { main } from "./main"


//styles

import "../css/styles.scss";
import { Carousel } from "../../carousel/src/js/carousel";

let elem = document.getElementById('ctnr')
let images = [
						"https://unsplash.it/450/450/?random",
            "https://unsplash.it/400/400/?random",
            "https://www.google.be/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwj75eqQ4ODSAhWLuhoKHdFtACoQjBwIBA&url=http%3A%2F%2Fwww.planwallpaper.com%2Fstatic%2Fimages%2Fdesktop-year-of-the-tiger-images-wallpaper.jpg&psig=AFQjCNHr4864-XOGv9H-XolM8psQnwIazg&ust=1489950458753450",
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
								.create(elem)
								.load(images);