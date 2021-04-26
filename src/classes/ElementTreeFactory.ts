import iTreeElement from '@/interfaces/iTreeElement';
import * as crypto from 'crypto';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import HTMLAttribute from '@/classes/HTMLAttribute';

export default class ElementTreeFactory {
	private _SUPPORTED_HTML_ELEMENTS: Array<SupportedHTMLElement>;

	constructor(supportedElements: Array<SupportedHTMLElement>) {
		this._SUPPORTED_HTML_ELEMENTS = supportedElements;
	}

	createTreeElement(elementType: string, alias?: string): iTreeElement | undefined {
		if (!this.elementIsSupported(elementType)) return undefined;
		const id = this.getNewElementID();
		const element = this.getElementOfType(elementType);
		if(!element) return undefined;
		else return {
			id,
			element,
			root: element.getElementType() == 'table' ? true : false,
			alias: alias ? alias : id,
			children: new Array<iTreeElement>(),
			attributes:  new Array<HTMLAttribute>()
		}
	}

	getElementOfType(type: string): SupportedHTMLElement | undefined {
		return this._SUPPORTED_HTML_ELEMENTS.find((el: SupportedHTMLElement) => el.getElementType() == type);
	}

	getNewElementID(): string {
		return crypto.randomBytes(16).toString('base64');
	}

	elementIsSupported(targetType: string): boolean {
		return this._SUPPORTED_HTML_ELEMENTS.find((el: SupportedHTMLElement) => el.getElementType() == targetType) ? true : false;
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

	generateCode(tree: Array<iTreeElement>): string {
		let retString = '';
		tree.forEach((el: iTreeElement) => {
			let attributes = '';
			let content = '';
			el.attributes.forEach((att: HTMLAttribute) => {
				const attObject = att.getAttribute()
				if(attObject.attributeName == 'content' || attObject.attributeName == 'innerHTML') content += attObject.attributeValue;
				else attributes += `${attObject.attributeName}="${attObject.attributeValue}" `;
			})
			retString += `<${el.element.getElementType()} ${attributes}>`;
			retString += content;
			retString += `</${el.element.getElementType()}>`;
		});


        return retString;
    }
}
