export interface ILoader{
	load(item:any):Promise<HTMLElement>;
}