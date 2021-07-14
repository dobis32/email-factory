import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import _VALID_CHILD_INDEX_ from '@/constants/ValidChildIndex';
import iTreeElement from '@/interfaces/iTreeElement';
import { _TESTING_HASH_ } from '@/constants/Testing';
import _DEFAULT_STATE_ from '@/constants/DefaultState';
import iNode from '@/interfaces/iNode';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';

describe('ElementTreeFactory.ts', () => {
    let mockTreeData: Array<SupportedHTMLElement>;
    let factory: ElementTreeFactory;
	beforeEach(() => {
        factory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_, _VALID_CHILD_INDEX_);
        mockTreeData = _DEFAULT_STATE_.treeData;
	});

    it('should have a function that finds and returns a supported HTML element', () => {
        const elType1 = _SUPPORTED_HTML_ELEMENTS_[0];
        const elType2 = 'foobar';
        expect(factory.getSupportedElement).toBeDefined();
        expect(typeof factory.getSupportedElement).toEqual('function');
        expect(factory.getSupportedElement(elType1)).toBeDefined();
        expect(factory.getSupportedElement(elType2)).toBeUndefined();
    });

    it('should have a function that creates a unique ID', () => {
        const id1 = factory.getNewElementID();
        const id2 = factory.getNewElementID();

        expect(factory.getNewElementID).toBeDefined();
        expect(typeof factory.getNewElementID).toEqual('function');
        expect(typeof factory.getNewElementID()).toEqual('string');
        expect(id1 === id2).toBeFalsy();
    });

    it('should have a function to find an element by ID', () => {
        const targetEl =  mockTreeData[2]
        const targetID = targetEl.getElementID();
        const result = factory.findElementByID(mockTreeData, targetID) as SupportedHTMLElement;
        expect(factory.findElementByID).toBeDefined();
        expect(typeof factory.findElementByID).toEqual('function');
        expect(result.getElementID()).toEqual(targetID);
    });

    it('should have a function to find an element by alias', () => {
        const targetEl = mockTreeData[2];
        const badAlias = 'zzzzzzzzzzzzz';
        expect(factory.findElementByAlias).toBeDefined();
        expect(typeof factory.findElementByAlias).toEqual('function');
        expect(factory.findElementByAlias(mockTreeData, targetEl.getElementAlias())).toBeDefined();
        expect(factory.findElementByAlias(mockTreeData, targetEl.getElementAlias())).toEqual(targetEl);
        expect(factory.findElementByAlias(mockTreeData, badAlias)).toEqual(undefined);
    });

    it('should have a function to add a child element to a specified parent', () => {
        const parent = mockTreeData[1];
        const childType = factory.getValidChildren(parent.getElementType())[0];
        const newChild = factory.createTreeElement(childType, false, `child$-${childType}`) as SupportedHTMLElement;
        const result1 = factory.addChildElement(mockTreeData, parent.getElementID(), newChild.getElementID(), false);
        const result2 = factory.addChildElement(mockTreeData, parent.getElementID(), newChild.getElementID(), true);
        expect(factory.addChildElement).toBeDefined();
        expect(typeof factory.addChildElement).toEqual('function');
        expect(result1).toEqual([ ...parent.getElementChildren(), newChild.getElementID() ]);
        expect(result2).toEqual([ newChild.getElementID(), ...parent.getElementChildren() ]);
    });

    it('should have a function to create a new tree element', () => {
        const type = 'table';
        const alias = 'newTable';
        const isRoot = true;
        const el = factory.createTreeElement(type, isRoot, alias) as SupportedHTMLElement;
        expect(factory.createTreeElement).toBeDefined();
        expect(typeof factory.createTreeElement).toEqual('function');
        expect(el).toBeDefined();
        expect(el.getElementAlias()).toEqual(alias);
        expect(el.getElementType()).toEqual(type);
    });

    it('should return an element with an alias that matches the ID if no alias is provided', () => {
        const type = 'table';
        const el: SupportedHTMLElement = factory.createTreeElement(type, true) as SupportedHTMLElement;
        expect(el.getElementAlias()).toEqual(el.getElementID());
    });

    it('should return undefined if it tries to create a tree element that is not supported', () => {
        const unsupportedElement = 'foobar';
        const isRoot = true;
        const el = factory.getSupportedElement(unsupportedElement);
        const result = factory.createTreeElement(unsupportedElement, isRoot, 'alias')
        expect(factory.createTreeElement).toBeDefined();
        expect(typeof factory.createTreeElement).toEqual('function');
        expect(el).toEqual(undefined);
        expect(result).toEqual(el);
    });

    it('should have a function to build a tree structure from a flattened input array of elements', () => {
        factory.buildBranch = jest.fn(factory.buildBranch);
        const builtTree = factory.buildTree(mockTreeData);
        const numBranches = mockTreeData.filter((te: SupportedHTMLElement) => te.elementIsARoot() === true).length;
        expect(factory.buildTree).toBeDefined();
        expect(typeof factory.buildTree).toEqual('function');
        expect(factory.buildBranch).toHaveBeenCalledTimes(numBranches);
        expect(builtTree).toEqual(builtTree.filter((n: iNode) => n.root === true))
    });
    
    it('should have a function to built a branch from a flattened input array of elements', () => {
        const head = mockTreeData.find((te: SupportedHTMLElement) => te.elementIsARoot() === true) as SupportedHTMLElement;
        factory.buildBranch(mockTreeData, head);
        expect(factory.buildBranch).toBeDefined();
        expect(typeof factory.buildBranch).toEqual('function');
    });

    it('should have a function for copying a branch started at the element that matches the input ID', () => {
        const result = factory.copyBranch(mockTreeData, mockTreeData[0].getElementID());
        expect(factory.copyBranch).toBeDefined();
        expect(typeof factory.copyBranch).toEqual('function');
        expect(Array.isArray(result));
    });

    it('should have a function for deleting a branch', () => {
        const initBranch = [ ...mockTreeData ];
        const copiedBranch = factory.copyBranch(initBranch, initBranch[0].getElementID());
        const tree = [ ...initBranch, ...copiedBranch ];
        const updatedTree = factory.deleteBranch(tree, initBranch[0].getElementID());
        expect(factory.deleteBranch).toBeDefined();
        expect(typeof factory.deleteBranch).toEqual('function');
        expect(updatedTree).toEqual(copiedBranch);
    });

    it('should have a function that retrieves a flat branch specified by head ID', () => {
        const treeData = _DEFAULT_STATE_.treeData;
        const expectedBranchData = [ treeData[2], treeData[3] ];
        const head = treeData[2].getElementID();
        const flatBranch = factory.getFlatBranch(treeData, head);
        expect(factory.getFlatBranch).toBeDefined();
        expect(typeof factory.getFlatBranch).toEqual('function');
        expect(flatBranch).toEqual(expectedBranchData);
    });
});

