import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import iTreeElement from '@/interfaces/iTreeElement';
import { HTML_TABLE, HTML_TR, HTML_TD, HTML_P } from '@/constants/SupportedHTMLElementTypes';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import { _TESTING_HASH_ } from '@/constants/Testing';
import _DEFAULT_STATE_ from '@/constants/DefaultState';

describe('ElementTreeFactory.ts', () => {
    let mockTreeData: Array<iTreeElement>;
    let factory: ElementTreeFactory;
	beforeEach(() => {
        factory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_);
        mockTreeData = _DEFAULT_STATE_.treeData;
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

    it('should have a function that creates a unique ID', () => {
        expect(factory.getNewElementID).toBeDefined();
        expect(typeof factory.getNewElementID).toEqual('function');
        expect(typeof factory.getNewElementID()).toEqual('string');
    });

    it('should have a function that finds and returns a supported HTML element', () => {
        const elType1 = _SUPPORTED_HTML_ELEMENTS_[0];
        const elType2 = 'foobar';
        expect(factory.getSupportedElement).toBeDefined();
        expect(typeof factory.getSupportedElement).toEqual('function');
        expect(factory.getSupportedElement(elType1.getElementType())).toBeDefined();
        expect(factory.getSupportedElement(elType2)).toBeUndefined();
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

    it('should have a function to find an element by ID', () => {
        const targetEl =  mockTreeData[2]
        const targetID = targetEl.id;
        const result = factory.findElementByID(mockTreeData, targetID) as iTreeElement;
        expect(factory.findElementByID).toBeDefined();
        expect(typeof factory.findElementByID).toEqual('function');
        expect(result.id).toEqual(targetID);
    });

    
});
