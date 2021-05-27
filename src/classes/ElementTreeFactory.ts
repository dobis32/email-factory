import * as crypto from 'crypto';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import { _TESTING_HASH_ } from '@/constants/Testing';
import iTreeElement from '@/interfaces/iTreeElement';
import iNode from '@/interfaces/iNode';
import HTMLAttribute from './HTMLAttribute';


export default class ElementTreeFactory {
    private _SUPPORTED_HTML_ELEMENTS: Array<SupportedHTMLElement>;
	private _testingHash: string;
	

	constructor(supportedElements: Array<SupportedHTMLElement>, testing?: string) {
		this._SUPPORTED_HTML_ELEMENTS = supportedElements;
		this._testingHash = testing ? testing : '';
	}	

    getSupportedElement(targetType: string): SupportedHTMLElement | undefined {
		return this._SUPPORTED_HTML_ELEMENTS.find((el: SupportedHTMLElement) => el.getElementType() == targetType);
	}

    getNewElementID(): string {
		if(this._testingHash == _TESTING_HASH_) return this._testingHash;
		else return crypto.randomBytes(16).toString('base64');
	}

	findElementByID(treeData: Array<iTreeElement>, targetid: string): iTreeElement | undefined {
		if(this._testingHash == _TESTING_HASH_) return treeData[0];
		else  return treeData.find((el: iTreeElement) => el.id == targetid);
	}

	findElementByAlias(treeData: Array<iTreeElement>, targetAlias: string): iTreeElement | undefined {
		return treeData.find((el: iTreeElement) => el.alias == targetAlias);
	}

	addChildElement(parent: iTreeElement, elementToAdd: string, pre: boolean): Array<string> {
		return pre ? [ elementToAdd, ...parent.children ] : [ ...parent.children, elementToAdd ];
	}

	createTreeElement(type: string, alias: string, isRoot?: boolean): iTreeElement {
		const supportedElement = this.getSupportedElement(type);
		const rootDefined = isRoot != undefined;
		if (!supportedElement) throw new Error(`Element of type "${type}" is not supported.`);
		const el = {} as iTreeElement;
		el.id = this.getNewElementID();
		el.root = rootDefined ? isRoot as boolean : false;
		el.element = supportedElement as SupportedHTMLElement;
		el.alias = alias;
		el.attributes = new Array<HTMLAttribute>();
		el.children = new Array<string>();
		return el;
	}

	buildTree(treeData: Array<iTreeElement>): Array<iNode> {
		const builtTree = new Array<iNode>();
		const roots = treeData.filter((el: iTreeElement) => el.root == true);
		roots.forEach((r: iTreeElement) => {
			const node = {
				id: r.id,
				alias: r.alias,
				type: r.type,
				root: r.root,
				children: this.getChildNodes(r.children, treeData)
			} as iNode;
			builtTree.push(node);
		});
		
		return builtTree;
	}

	private getChildNodes(childIDs: Array<string>, treeData: Array<iTreeElement>): Array<iNode> {
		const childNodes = new Array<iNode>();
		childIDs.forEach((cid: string) => {
			const el = treeData.find((el: iTreeElement) => el.id == cid);
			if (!el) throw new Error(`Failed to find tree element with id ${cid}`)
			const node = {
				id: el.id,
				alias: el.alias,
				type: el.type,
				root: el.root,
				children: this.getChildNodes(el.children, treeData)
			} as iNode;
			childNodes.push(node);
		});

		return childNodes;
	}

	

	// generateCode(roots: Array<iElementDescriptor | iTreeRootDescriptor>, nestLevel = 0): string { // TODO unit test
	// 	let retString = '';
	// 	roots.forEach((el: iElementDescriptor) => {
	// 		let indent = '';
	// 		for(let i = 0; i < nestLevel; i++) {
	// 			indent += '\t';
	// 		}
	// 		let attributes = '';
	// 		let content = '';
	// 		el.attributes.forEach((att: HTMLAttribute) => {
	// 			const data = att.getAttributeData()
	// 			if(data.attributeName == 'innerText') content += data.attributeValue;
	// 			else attributes += `${data.attributeName}="${data.attributeValue}" `;
	// 		})
	// 		const headTag = `${indent}<${el.element.getElementType()} ${attributes}>\n`;
	// 		const tailTag = `${indent}</${el.element.getElementType()}>\n`;
	// 		if(!content.length) {
	// 			content = this.generateCode(el.children, nestLevel + 1);
	// 		}
	// 		retString += headTag;
	// 		retString += `${content}`;
	// 		retString += tailTag;
	// 	});
    //     return retString;
    // }

}