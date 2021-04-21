import iTreeElement from '../interfaces/iTreeElement';
import * as crypto from 'crypto';

export default class ElementTreeFactory {
	private _SUPPORTED_HTML_ELEMENTS: Array<string>;

	constructor(supportedElements: Array<string>) {
		this._SUPPORTED_HTML_ELEMENTS = supportedElements;
	}

	createTreeElement(type: string, alias?: string): iTreeElement {
		const id = this.getNewElementID();
		return {
			id,
			type,
			root: type == 'table' ? true : false,
			alias: alias ? alias : id,
			children: []
		}
	}

	getNewElementID() {
		return crypto.randomBytes(16).toString('base64');
	}

	elementIsSupported(el: string): boolean {
		return this._SUPPORTED_HTML_ELEMENTS.find((type: string) => type == el) ? true : false;
	}

	getTreeAsArray(treeData: Array<iTreeElement>): Array<iTreeElement> {
		const treeAsArray = new Array<iTreeElement>();
		const aux = [ ...treeData ];
		while(aux.length) {
			const el = aux.shift() as iTreeElement;
			treeAsArray.push(el);
			el?.children.forEach((child: iTreeElement) => {
				aux.push(child);
			});
		}
		return treeAsArray;
	}

	findElementByID(treeAsArray: Array<iTreeElement>, targetid: string): iTreeElement | undefined {
		return treeAsArray.find((el: iTreeElement) => el.id == targetid);
	}

	findElementByAlias(treeAsArray: Array<iTreeElement>, targetAlias: string): iTreeElement | undefined {
		return treeAsArray.find((el: iTreeElement) => el.alias == targetAlias);
	}

	addElementSibling(parent: iTreeElement, elementToAdd: iTreeElement, pre: boolean): Array<iTreeElement> {
		return pre ? [ elementToAdd, ...parent.children ] : [ ...parent.children, elementToAdd ];
	}
}
