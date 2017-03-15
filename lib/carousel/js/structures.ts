
export const STRUCTURE_BASE = 
`<div id="carouselCtnr" class=" carouselCtnr">

	<div class="carousel-arrowCtnr">
		<div class="carousel-arrows carousel-arrow-left">
			<i class="fa fa-angle-left"></i>
		</div>
		<div class="carousel-arrows carousel-arrow-right" style="display: flex;">
				<i class="fa fa-angle-right"></i>
		</div>
	</div>
	
	<div class="carousel"></div>
	
	<div class="carousel-close">
		<i class="fa fa-times"></i>
	</div>
</div>`;
export const STRUCTURE_IMAGE_CTNR = 
`<div class="carousel-imgCtnr">
	<div class="carousel-overlay"></div>
</div>`

const structureFull = `

<div id="carouselCtnr" class=" carouselCtnr">

	<div class="carousel-arrowCtnr">
		<div class="carousel-arrows carousel-arrow-left">
			<i class="fa fa-angle-left"></i>
		</div>
		<div class="carousel-arrows carousel-arrow-right" style="display: flex;">
				<i class="fa fa-angle-right"></i>
		</div>
	</div>
	
	<div class="carousel">
		<div class="carousel-imgCtnr">
			<img src="https://unsplash.it/450/450/?random" class=" c-img">
			<div class="carousel-overlay"></div>
		</div>
	</div>
	
	<div class="carousel-close">
		<i class="fa fa-times"></i>
	</div>
</div>
`