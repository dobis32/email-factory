import iTreeElement from '../interfaces/iTreeElement';
export default class ElementTreeFactory {
	private _SUPPORTED_HTML_ELEMENTS: Array<string>;
	constructor(supportedElements: Array<string>) {
		this._SUPPORTED_HTML_ELEMENTS = supportedElements;
	}

	findElementByID(elements: Array<iTreeElement>, targetid: string): iTreeElement | undefined {
		return elements.find((el: iTreeElement) => el.id == targetid);
	}

	findElementByAlias(elements: Array<iTreeElement>, targetAlias: string): iTreeElement | undefined {
		return elements.find((el: iTreeElement) => el.alias == targetAlias);
	}

	addElementSibling(parent: iTreeElement, elementToAdd: iTreeElement, pre: boolean): Array<iTreeElement> {
		return pre ? [ elementToAdd, ...parent.children ] : [ ...parent.children, elementToAdd ];
	}
}
