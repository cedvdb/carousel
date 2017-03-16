import { Controls } from './controls';

export interface EventHandler{
	setup(controls:Controls);
	onScroll(value:number);
	onImageClick(imgCtnr:HTMLElement);
	onZoomClosed();
	onArrowDown(direction: number);
	onArrowUp(direction: number);
	// onDrag(value:number);
}