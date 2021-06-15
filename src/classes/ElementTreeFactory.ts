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
		const copyPairs = new Array<{ old: iTreeElement, new: iTreeElement}>();
		const aux = new Array<string>();
		aux.push(headID);
		while (aux.length) {
			const target = aux.shift();
			const el = treeData.find((te: iTreeElement) => te.id == target);
			if (!el) throw new Error(`[ Element Tree Factory ] Element with ID ${target} not found.`);
			el.children.forEach((c: string) => { aux.push(c) });
			const elCopy = this.copyElement(el);
			copyPairs.push({old: el, new: elCopy});
			if (target === headID) newHead = elCopy;
			else copiedBranch.push(elCopy);
		}

		const updatedChildren = new Array<iTreeElement>();
		copiedBranch.forEach((el: iTreeElement) => {
			const updated = this.updateChildren(el, copyPairs);
			updatedChildren.push(updated);
		});

		const updatedHead = this.updateChildren(newHead, copyPairs);

		return [ updatedHead, ...updatedChildren ]; // Add branch state action assumes head is at index 0
	}

	deleteBranch(treeData: Array<iTreeElement>, head: string, parent?: string): Array<iTreeElement> {
		const idsToRemove = [ head ];
		const aux = [ head ];
		while (aux.length) {
			const target = aux.shift();
			const element = treeData.find((el: iTreeElement) => el.id === target);
			if (!element) throw new Error(`[ Element Tree Factory ] Element with ID ${head} not found.`);

			element.children.forEach((cid: string) => {
				idsToRemove.push(cid);
				aux.push(cid);
			});
			
		}
		if (parent) { // remove head's ID from parent element's children
			const parentElement = treeData.find((el: iTreeElement) => el.id === parent) as iTreeElement;
			parentElement.children = parentElement.children.filter((cid: string) => cid != head);
		}
		return treeData.filter((el: iTreeElement) => idsToRemove.find((id: string) => id === el.id) === undefined); // filter out elements with IDs in idsToRemove
	}

	private updateChildren(el: iTreeElement, childPairs: Array<any>): iTreeElement {
		const updatedChildren = new Array<string>();
		el.children.forEach((c: string) => {
			const targetPair = childPairs.find((pair: any) => pair.old.id === c)
			updatedChildren.push(targetPair.new.id);
		});
		return { ...el, children: updatedChildren };
	}

	private copyElement(elementToCopy: iTreeElement): iTreeElement {
		return {
			... elementToCopy,
			id: this.getNewElementID(),
		} as iTreeElement;
	}
}