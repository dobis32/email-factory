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
				children: this.getChildNodes(treeData, el.children)
			} as iNode;
			childNodes.push(node);
		});

		return childNodes;
	}

	copyBranch(head: iTreeElement, children: Array<iNode>): Array<iTreeElement> {
		const copiedBranch = new Array<iTreeElement>();
		// need to change IDs of all the nodes
		// must traverse to the end of a branch before copying (?)
		// I think you need to know the new ID's of copied children before copying an given element

		return copiedBranch;
	}
}