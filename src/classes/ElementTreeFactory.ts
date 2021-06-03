import * as crypto from 'crypto';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import { _TESTING_HASH_ } from '@/constants/Testing';
import SUPPORTED_HTML_ELEMENTS from '@/constants/SupportedHTMLElementTypes';
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
		else return treeData.find((el: iTreeElement) => el.id == targetid);
	}

	findElementByAlias(treeData: Array<iTreeElement>, targetAlias: string): iTreeElement | undefined {
		return treeData.find((el: iTreeElement) => el.alias == targetAlias);
	}

	addChildElement(treeData: Array<iTreeElement>, parentID: string, childID: string, pre: boolean): Array<string> {
		const parent = this.findElementByID(treeData, parentID);
		if (!parent) throw new Error()
		return pre ? [ childID, ...parent.children ] : [ ...parent.children, childID ];
	}

	createTreeElement(type: string,  isRoot: boolean, alias?: string,): iTreeElement | undefined {
		try {
			const supportedElement = this.getSupportedElement(type);
			const rootDefined = isRoot != undefined;
			if (!supportedElement) throw new Error(`Element of type "${type}" is not supported.`);
			const el = {} as iTreeElement;
			const id = this.getNewElementID();
			el.id = id;
			el.root = rootDefined ? isRoot as boolean : false;
			el.element = supportedElement as SupportedHTMLElement;
			el.alias = alias ? alias : id;
			el.attributes = new Array<HTMLAttribute>();
			el.children = new Array<string>();
			return el;
		} catch(e) {
			console.log(e);
			return undefined;
		}
		
	}

	buildTree(treeData: Array<iTreeElement>): Array<iNode> {
		const builtTree = new Array<iNode>();
		const roots = treeData.filter((el: iTreeElement) => el.root == true);
		roots.forEach((r: iTreeElement) => {
			const branch = this.buildBranch(treeData, r)
			builtTree.push(branch);
		});
		
		return builtTree;
	}

	buildBranch(treeData: Array<iTreeElement>, head: iTreeElement): iNode {
		console.log('build branch')
		const builtBranch = {
			id: head.id,
			alias: head.alias,
			type: head.element.getElementType(),
			root: head.root,
			attributes: head.attributes,
			children: this.getChildNodes(treeData, head.children)
		} as iNode;
		return builtBranch;
	}

	private getChildNodes(treeData: Array<iTreeElement>, childIDs: Array<string>): Array<iNode> {
		const childNodes = new Array<iNode>();
		childIDs.forEach((cid: string) => {
			const el = treeData.find((el: iTreeElement) => el.id == cid);
			if (!el) throw new Error(`Failed to find tree element with id ${cid}`)
			const node = {
				id: el.id,
				alias: el.alias,
				type:  el.element.getElementType(),
				root: el.root,
				attributes: el.attributes,
				children: this.getChildNodes(treeData, el.children)
			} as iNode;
			childNodes.push(node);
		});

		return childNodes;
	}

	copyBranch(treeData: Array<iTreeElement>, headID: string): Array<iTreeElement> {
		let newHead: iTreeElement = {} as iTreeElement;
		const copiedBranch = new Array<iTreeElement>();
		const aux = new Array<string>();
		aux.push(headID);
		while (aux.length) {
			const target = aux.shift();
			const el = treeData.find((te: iTreeElement) => te.id == target);
			if (!el) throw new Error(`[ Element Tree Factory ] Element with ID ${target} not found.`);
			el.children.forEach((c: string) => { aux.push(c) });
			const copiedElement = this.copyElement(el);
			if (target === headID) newHead = copiedElement;
			else copiedBranch.push(copiedElement);
		}	


		return [ newHead, ...copiedBranch ]; // Add branch state action assumes head is at index 0
	}

	copyElement(elementToCopy: iTreeElement): iTreeElement {
		return {
			... elementToCopy,
			id: this.getNewElementID(),
		} as iTreeElement;
	}

	// copyNode(n: iNode): iNode {
	// 	const children = new Array<iNode>();
	// 	n.children.forEach((c: iNode) => {
	// 		const c_copy = this.copyNode(c);
	// 		children.push(c_copy);
	// 	});
	// 	const copy: iNode = {
	// 		id: this.getNewElementID(),
	// 		root: n.root,
	// 		type: n.type,
	// 		alias: n.alias,
	// 		attributes: n.attributes,
	// 		children
	// 	}
	// 	return copy;
	// }

	// flattenBranch(head: iNode): Array<iTreeElement> {
	// 	const flattenedBranch = new Array<iTreeElement>();
	// 	const aux = new Array<iNode>();
	// 	aux.push(head);
	// 	head.children.forEach((c: iNode) => {
	// 		aux.push(c);
	// 	});
	// 	while (aux.length) {
	// 		const n = aux.shift() as iNode;
	// 		const htmlElement = this.getSupportedElement(head.type);
	// 		if (!htmlElement) throw new Error(`[ Element Tree Factory ] Failed to find supported element of type ${head.type}`)
	// 		const childIDs = n.children.map((c: iNode) => c.id);
	// 		const el = {
	// 			id: n.id,
	// 			root: n.root,
	// 			element: htmlElement,
	// 			alias: n.alias,
	// 			attributes: n.attributes,
	// 			children: childIDs
	// 		} as iTreeElement;
	// 		flattenedBranch.push(el);
	// 	}
	// 	return flattenedBranch;
	// }
}