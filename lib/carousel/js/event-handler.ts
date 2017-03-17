import { Controls } from './controls';

export interface EventHandler{
	setup(controls:Controls);
	onScroll(direction:number);
	onElementAdded(item:HTMLElement);
	onImageClick(imgCtnr:HTMLElement);
	onZoomClosed();
	onArrowDown(direction: number);
	onArrowUp(direction: number);
}