import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import iTreeElement from '@/interfaces/iTreeElement';
import { HTML_TABLE, HTML_TR, HTML_TD, HTML_P } from '@/constants/SupportedHTMLElementTypes';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import { _TESTING_HASH_ } from '@/constants/Testing';
import _DEFAULT_STATE_ from '@/constants/DefaultState';
import iNode from '@/interfaces/iNode';
describe('ElementTreeFactory.ts', () => {
    let mockTreeData: Array<iTreeElement>;
    let factory: ElementTreeFactory;
	beforeEach(() => {
        factory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_);
        mockTreeData = _DEFAULT_STATE_.treeData;
	});

    it('should have a function that finds and returns a supported HTML element', () => {
        const elType1 = _SUPPORTED_HTML_ELEMENTS_[0];
        const elType2 = 'foobar';
        expect(factory.getSupportedElement).toBeDefined();
        expect(typeof factory.getSupportedElement).toEqual('function');
        expect(factory.getSupportedElement(elType1.getElementType())).toBeDefined();
        expect(factory.getSupportedElement(elType2)).toBeUndefined();
    });

    it('should have a function that creates a unique ID', () => {
        expect(factory.getNewElementID).toBeDefined();
        expect(typeof factory.getNewElementID).toEqual('function');
        expect(typeof factory.getNewElementID()).toEqual('string');
    });

    it('should have a function to find an element by ID', () => {
        const targetEl =  mockTreeData[2]
        const targetID = targetEl.id;
        const result = factory.findElementByID(mockTreeData, targetID) as iTreeElement;
        expect(factory.findElementByID).toBeDefined();
        expect(typeof factory.findElementByID).toEqual('function');
        expect(result.id).toEqual(targetID);
    });

    it('should have a function to find an element by alias', () => {
        const targetEl = mockTreeData[2];
        const badAlias = 'zzzzzzzzzzzzz';
        expect(factory.findElementByAlias).toBeDefined();
        expect(typeof factory.findElementByAlias).toEqual('function');
        expect(factory.findElementByAlias(mockTreeData, targetEl.alias)).toBeDefined();
        expect(factory.findElementByAlias(mockTreeData, targetEl.alias)).toEqual(targetEl);
        expect(factory.findElementByAlias(mockTreeData, badAlias)).toEqual(undefined);
    });

    it('should have a function to add a child element to a specified parent', () => {
        const parent = mockTreeData[1];
        const childType = parent.element.getValidChildren()[0]
        const newChild = factory.createTreeElement(childType, false, `child$-${childType}`) as iTreeElement;
        const result1 = factory.addChildElement(mockTreeData, parent.id, newChild.id, false);
        const result2 = factory.addChildElement(mockTreeData, parent.id, newChild.id, true);
        expect(factory.addChildElement).toBeDefined();
        expect(typeof factory.addChildElement).toEqual('function');
        expect(result1).toEqual([ ...parent.children, newChild.id ]);
        expect(result2).toEqual([ newChild.id, ...parent.children ]);
    });

    it('should have a function to create a new tree element', () => {
        const type = 'table';
        const alias = 'newTable';
        const isRoot = true;
        const el = factory.createTreeElement(type, isRoot, alias) as iTreeElement;
        expect(factory.createTreeElement).toBeDefined();
        expect(typeof factory.createTreeElement).toEqual('function');
        expect(el).toBeDefined();
        expect(el.alias).toEqual(alias);
        expect(el.element.getElementType()).toEqual(type);
    });

    it('should return an element with an alias that matches the ID if no alias is provided', () => {
        const type = 'table';
        const el: iTreeElement = factory.createTreeElement(type, true) as iTreeElement;
        expect(el.alias).toEqual(el.id);
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
        const numBranches = mockTreeData.filter((te: iTreeElement) => te.root === true).length;
        expect(factory.buildTree).toBeDefined();
        expect(typeof factory.buildTree).toEqual('function');
        expect(factory.buildBranch).toHaveBeenCalledTimes(numBranches);
        expect(builtTree).toEqual(builtTree.filter((n: iNode) => n.root === true))
    });
    
    it('should have a function to built a branch from a flattened input array of elements', () => {
        const head = mockTreeData.find((te: iTreeElement) => te.root === true) as iTreeElement;
        factory.buildBranch(mockTreeData, head);
        expect(factory.buildBranch).toBeDefined();
        expect(typeof factory.buildBranch).toEqual('function');
    });

    it('should have a function for copying a branch started at the element that matches the input ID', () => {
        const result = factory.copyBranch(mockTreeData, mockTreeData[0].id);
        expect(factory.copyBranch).toBeDefined();
        expect(typeof factory.copyBranch).toEqual('function');
        expect(Array.isArray(result));
    });

    it('should have a function for deleting a branch', () => {
        const initBranch = [ ...mockTreeData ];
        const copiedBranch = factory.copyBranch(initBranch, initBranch[0].id);
        const tree = [ ...initBranch, ...copiedBranch ];
        const updatedTree = factory.deleteBranch(tree, initBranch[0].id);
        expect(factory.deleteBranch).toBeDefined();
        expect(typeof factory.deleteBranch).toEqual('function');
        expect(updatedTree).toEqual(copiedBranch);
    });
});

