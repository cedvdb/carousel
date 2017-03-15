import { Builder } from '../carousel/js/builder';
import {} from 'jasmine';

describe("Testing builder", () => {
	let ctnr;

	beforeEach(() =>{
		ctnr = document.createElement("div");
	})

	it("should create image",() => {
		let img = `<img src="lol.png">`;
		expect(Builder.makeImage({ url: "lzol.png" }).outerHTML).not.toEqual(img);
		expect(Builder.makeImage({ url: "lol.png" }).outerHTML).toEqual(img);
	});

	it("should return the html structure for the carousel",() => {
		//html structure changed
			// let images = [];
			// images.push(Builder.createImage({ url: "lzol.png" }));
			// images.push(Builder.createImage({ url: "lol.png" }));
			// let carou = Builder.makeCarousel(ctnr, images);
			// expect(carou.outerHTML.replace(/[\n\r\s]+/g, ""))
			// .toEqual(innerctnr.replace(/[\n\r\s]+/g, ""));
	});
});

const innerctnr = 
`
<div class=" carouselCtnr">
 <div class="carousel-arrowCtnr">
   <div class="carousel-arrows carousel-arrow-left">
	   <i class="fa fa-angle-left"></i>
	 </div>
	 <div class="carousel-arrows carousel-arrow-right">
	  <i class="fa fa-angle-right"></i>
	</div>
 </div>
 <div class="carousel">
	<div class="carousel-imgCtnr">
	   <img src="lzol.png" class=" c-img">
	   <div class="carousel-overlay"></div>
	</div>
	<div class="carousel-imgCtnr">
	  <img src="lol.png" class=" c-img">
		  <div class="carousel-overlay"></div>
	</div>
 </div>
</div>
`