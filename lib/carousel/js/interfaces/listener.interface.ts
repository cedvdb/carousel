import { IAction } from './action.interface';

export interface IListener{
	listen(action:IAction);
}