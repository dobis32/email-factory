import * as crypto from 'crypto';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import { _TESTING_HASH_ } from '@/constants/Testing';
import iNode from '@/interfaces/iNode';
import iHTMLAttribute from '@/interfaces/iHTMLAttribute';

export default class ElementTreeFactory {
    private _SUPPORTED_HTML_ELEMENTS: Array<string>;
	private _VALID_CHILD_INDEX: any;
	private _testingHash: string;

	constructor(supportedElements: Array<string>, validChildIndex: any, testing?: string) {
		this._SUPPORTED_HTML_ELEMENTS = supportedElements;
		this._VALID_CHILD_INDEX = validChildIndex;
		this._testingHash = testing ? testing : '';
	}	

    getSupportedElement(targetType: string): string | undefined {
		return this._SUPPORTED_HTML_ELEMENTS.find((type: string) => type == targetType);
	}

    getNewElementID(): string {
		if(this._testingHash == _TESTING_HASH_) return this._testingHash;
		else return crypto.randomBytes(16).toString('base64');
	}

	findElementByID(treeData: Array<SupportedHTMLElement>, targetid: string): SupportedHTMLElement | undefined {
		if(this._testingHash == _TESTING_HASH_) return treeData[0];
		else return treeData.find((el: SupportedHTMLElement) => el.getElementID() == targetid);
	}

	findElementByAlias(treeData: Array<SupportedHTMLElement>, targetAlias: string): SupportedHTMLElement | undefined {
		return treeData.find((el: SupportedHTMLElement) => el.getElementAlias() == targetAlias);
	}

	addChildElement(treeData: Array<SupportedHTMLElement>, parentID: string, childID: string, pre: boolean): Array<string> {
		const parent = this.findElementByID(treeData, parentID);
		if (!parent) throw new Error()
		return pre ? [ childID, ...parent.getElementChildren() ] : [ ...parent.getElementChildren(), childID ];
	}

	createTreeElement(type: string,  isRoot: boolean, alias?: string,): SupportedHTMLElement | undefined {
		try {
			const supportedElement = this.getSupportedElement(type);
			if (!supportedElement) throw new Error(`[ Element Tree Factory ] Element of type "${type}" is not supported.`);
			const id = this.getNewElementID();
			const elementAlias = alias ? alias : id;
			const attributes = new Array<iHTMLAttribute>();
			const children = new Array<string>();
			const el = new SupportedHTMLElement(id, elementAlias, type, isRoot, attributes, children);
			return el;
		} catch(e) {
			console.log(e);
			return undefined;
		}
		
	}

	buildTree(treeData: Array<SupportedHTMLElement>): Array<iNode> {
		const builtTree = new Array<iNode>();
		const roots = treeData.filter((el: SupportedHTMLElement) => el.elementIsARoot() == true);
		roots.forEach((r: SupportedHTMLElement) => {
			const branch = this.buildBranch(treeData, r)
			builtTree.push(branch);
		});
		
		return builtTree;
	}

	buildBranch(treeData: Array<SupportedHTMLElement>, head: SupportedHTMLElement): iNode {
		const builtBranch = {
			id: head.getElementID(),
			alias: head.getElementAlias(),
			type: head.getElementType(),
			root: head.elementIsARoot(),
			attributes: head.getElementAttributes(),
			children: this.getChildNodes(treeData, head.getElementChildren())
		} as iNode;
		return builtBranch;
	}

	private getChildNodes(treeData: Array<SupportedHTMLElement>, childIDs: Array<string>): Array<iNode> {
		return childIDs.map((cid: string) => {
			const el = treeData.find((el: SupportedHTMLElement) => el.getElementID() === cid);
			if (!el) throw new Error(`[ Element Tree Factory ] Failed to find tree element with id ${cid}`);
			return {
				id: el.getElementID(),
				alias: el.getElementAlias(),
				type:  el.getElementType(),
				root: el.elementIsARoot(),
				attributes: el.getElementAttributes(),
				children: this.getChildNodes(treeData, el.getElementChildren())
			} as iNode;
		});
	}

	copyBranch(treeData: Array<SupportedHTMLElement>, headID: string): Array<SupportedHTMLElement> {
		let newHead: SupportedHTMLElement = {} as SupportedHTMLElement;
		const copiedBranch = new Array<SupportedHTMLElement>();
		const copyPairs = new Array<{ old: SupportedHTMLElement, new: SupportedHTMLElement}>();
		const flattenedBanch = this.getFlatBranch(treeData, headID);
		flattenedBanch.forEach((el: SupportedHTMLElement) => {
			const elCopy = this.copyElement(el);
			copyPairs.push({old: el, new: elCopy});
			if (el.getElementID() === headID) newHead = elCopy;
			else copiedBranch.push(elCopy);
		});

		const updatedChildren = new Array<SupportedHTMLElement>();
		copiedBranch.forEach((el: SupportedHTMLElement) => {
			const updated = this.getUpdatedChildren(el, copyPairs);
			updatedChildren.push(updated);
		});

		const updatedHead = this.getUpdatedChildren(newHead, copyPairs);

		return [ updatedHead, ...updatedChildren ]; // Add branch state action assumes head is at index 0
	}

	deleteBranch(treeData: Array<SupportedHTMLElement>, head: string, parent?: string): Array<SupportedHTMLElement> {
		const idsToRemove = this.getFlatBranch(treeData, head).map((el: SupportedHTMLElement) => el.getElementID() );

		if (parent) { // if there's a prent element, it needs its children updated
			const parentElement = treeData.find((el: SupportedHTMLElement) => el.getElementID() === parent) as SupportedHTMLElement;
			const updatedChildren = parentElement.getElementChildren().filter((cid: string) => cid != head);
			parentElement.setElementChildren(updatedChildren);
		}
		return treeData.filter((el: SupportedHTMLElement) => idsToRemove.find((id: string) => id === el.getElementID()) === undefined); // filter out elements with IDs in idsToRemove
	}

	getFlatBranch(treeData: Array<SupportedHTMLElement>, head: string): Array<SupportedHTMLElement> {
		const flatBranch = [ ] as Array<SupportedHTMLElement>;
		const aux = [ head ];
		while (aux.length) {
			const target = aux.shift();
			const element = treeData.find((el: SupportedHTMLElement) => el.getElementID() === target);
			if (!element) throw new Error(`[ Element Tree Factory ] Element with ID ${target} not found.`);
			flatBranch.push(element);
			element.getElementChildren().forEach((cid: string) => {
				aux.push(cid);
			});
		}
		return flatBranch;
	}

	private getUpdatedChildren(el: SupportedHTMLElement, childPairs: Array<{ old: SupportedHTMLElement, new: SupportedHTMLElement}>): SupportedHTMLElement {
		const updatedChildren = new Array<string>();
		el.getElementChildren().forEach((c: string) => {
			const targetPair = childPairs.find((pair: { old: SupportedHTMLElement, new: SupportedHTMLElement}) => pair.old.getElementID() === c)
			if (!targetPair) throw new Error(`[ Element Tree Factory ] Element pair with old id ${c} not found`)
			updatedChildren.push(targetPair.new.getElementID());
		});
		return new SupportedHTMLElement(el.getElementID(), el.getElementAlias(), el.getElementType(), el.elementIsARoot(), el.getElementAttributes(), el.getElementChildren());
	}

	private copyElement(elementToCopy: SupportedHTMLElement): SupportedHTMLElement {
		const alias = elementToCopy.getElementAlias();
		const type = elementToCopy.getElementType();
		const id = this.getNewElementID();
		const isRoot = elementToCopy.elementIsARoot();
		const attributes = elementToCopy.getElementAttributes();
		const children = elementToCopy.getElementChildren();
		return new SupportedHTMLElement(id, alias, type, isRoot, attributes, children);
	}

	getValidChildren(type: string): Array<string> {
		return this._VALID_CHILD_INDEX[type];
	}
}