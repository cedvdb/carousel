/*This is the entry point for webpack, you can add your entry point here*/
// to add your entry point do it as such:
// import { main } from "./main"


//styles

import "../css/styles.scss";
import { Carousel } from "../../carousel/src/js/carousel";

let elem = document.getElementById('ctnr')
let images = [
            "http://www.psdgraphics.com/file/red-number-0.jpg",
						"http://www.kidsmathgamesonline.com/images/pictures/numbers600/number1.jpg",
            "http://www.psdgraphics.com/file/red-number-2.jpg",
            "http://www.psdgraphics.com/file/red-number-3.jpg",
            "http://www.thecompliancecenter.com/img_temp/decals/numbers/dc4_hi.gif",
            "http://hhhincorporated.com/images/stickers/4-inch-black-number-5-vinyl-sticker.gif",
            "http://www.clipartkid.com/images/769/number-6-outline-signs-symbol-alphabets-numbers-outlined-numbers-VcUGgR-clipart.png",
            "https://unsplash.it/550/?random",
            "http://icons.iconarchive.com/icons/icons8/windows-8/512/Numbers-8-icon.png",
            "https://unsplash.it/250/?random",
            "http://www.drodd.com/images15/number10-1.jpg"
						];
let carousel = new Carousel()
								.create(elem)
								.load(images);