import { IControls } from './controls.interface';
import { IListener } from './listener.interface';

export interface IEventEmitter{
	setup(listener: IListener, controls: IControls);
}