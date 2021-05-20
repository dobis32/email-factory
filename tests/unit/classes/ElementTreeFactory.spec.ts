import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import iTreeElement from '@/interfaces/iTreeElement';
import { HTML_TABLE, HTML_TR, HTML_TD, HTML_P } from '@/constants/SupportedHTMLElementTypes';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import { _TESTING_HASH_ } from '@/constants/Testing';
import _DEFAULT_STATE_ from '@/constants/DefaultState';

describe('ElementTreeFactory.ts', () => {
    let treeData: Array<iTreeElement>;
    let factory: ElementTreeFactory;
    let treeAsArray: Array<iTreeElement>;
	beforeEach(() => {
        treeData = _DEFAULT_STATE_.treeData;
        factory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_, _TESTING_HASH_);
        treeAsArray = factory.getTreeAsArray(treeData);
	});

    it('should have a function to create a new tree element', () => {
        const type = 'table';
        const alias = 'newTable';
        const el = factory.createTreeElement(type, alias) as iTreeElement;
        expect(factory.createTreeElement).toBeDefined();
        expect(typeof factory.getNewElementID).toEqual('function');
        expect(el).toBeDefined();
        expect(el.alias).toEqual(alias);
        expect(el.element.getElementType()).toEqual(type);
    });

    it('should return an Obj<iTreeElement> with an alias that matches the ID if no alias is provided', () => {
        const type = 'table';
        const el = factory.createTreeElement(type) as iTreeElement;
        expect(el.alias).toEqual(el.id);
    });

    it('should return undefined if it tries to create a tree element that is not supported', () => {
        const unsupportedElement = 'foobar';
        const supported = factory.elementIsSupported(unsupportedElement);
        expect(factory.createTreeElement).toBeDefined();
        expect(typeof factory.createTreeElement).toEqual('function');
        expect(supported).toEqual(false);
        expect(factory.createTreeElement(unsupportedElement)).toEqual(undefined);
    });

    it('should have a function that creates a unique ID', () => {
        expect(factory.getNewElementID).toBeDefined();
        expect(typeof factory.getNewElementID).toEqual('function');
        expect(typeof factory.getNewElementID()).toEqual('string');
    });

    it('should have a function that determines if an element type is supported', () => {
        const elType1 = _SUPPORTED_HTML_ELEMENTS_[0];
        const elType2 = 'foobar';
        expect(factory.elementIsSupported).toBeDefined();
        expect(typeof factory.elementIsSupported).toEqual('function');
        expect(factory.elementIsSupported(elType1.getElementType())).toEqual(true);
        expect(factory.elementIsSupported(elType2)).toEqual(false);
    });

    it('should have a function to get a given tree as an array', () => {
        expect(factory.getTreeAsArray).toBeDefined();
        expect(typeof factory.getTreeAsArray).toEqual('function');
        expect(factory.getTreeAsArray(treeData)).toEqual(treeAsArray);
    });


    it('should have a function to find an element by alias', () => {
        const targetEl = treeAsArray[2];
        const badAlias = 'zzzzzzzzzzzzz';
        expect(factory.findElementByAlias).toBeDefined();
        expect(typeof factory.findElementByAlias).toEqual('function');
        expect(factory.findElementByAlias(treeAsArray, targetEl.alias)).toBeDefined();
        expect(factory.findElementByAlias(treeAsArray, targetEl.alias)).toEqual(targetEl);
        expect(factory.findElementByAlias(treeAsArray, badAlias)).toEqual(undefined);
    });

    it('should have a function to add a sibling element', () => {
        const elToAdd = factory.createTreeElement('td') as iTreeElement;
        const parent = treeData[0].children[0]; // tr element
        const result1 = factory.addChildElement(parent, elToAdd, true);
        const result2 =  factory.addChildElement(parent, elToAdd, false);
        expect(factory.addChildElement).toBeDefined();
        expect(typeof factory.addChildElement).toEqual('function');
        expect(result1[0]).toEqual(elToAdd);
        expect(result2[1]).toEqual(elToAdd);
    });

});
