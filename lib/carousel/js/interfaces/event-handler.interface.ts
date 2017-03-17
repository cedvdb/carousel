import { IControls } from './controls.interface';

export interface IEventHandler{
	setup(controls:IControls);
	onScroll(direction:number);
	onElementAdded(item:HTMLElement);
	onImageClick(imgCtnr:HTMLElement);
	onZoomClosed();
	onArrowDown(direction: number);
	onArrowUp(direction: number);
}