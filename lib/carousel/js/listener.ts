import { Action } from './action';

export interface Listener{
	listen(action:Action);
}