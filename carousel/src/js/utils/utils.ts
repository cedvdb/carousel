export class Utils{

	static stringToHtml(str):HTMLElement{
		let div = document.createElement("div");
		div.innerHTML = str;
		return <HTMLElement> div.firstChild;
	}

}
