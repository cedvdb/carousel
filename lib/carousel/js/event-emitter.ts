import { Controls } from './controls';
import { Listener } from './listener';

export interface EventEmitter{
	setup(listener:Listener, controls:Controls);
}