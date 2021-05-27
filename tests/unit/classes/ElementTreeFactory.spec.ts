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
	beforeEach(() => {
       
	});

    it('should have a function to create a new tree element', () => {
        const type = 'table';
        const alias = 'newTable';
        const isRoot = true;
        const el = factory.createTreeElement(type, alias, isRoot) as iTreeElement;
        expect(factory.createTreeElement).toBeDefined();
        expect(typeof factory.createTreeElement).toEqual('function');
        expect(el).toBeDefined();
        expect(el.alias).toEqual(alias);
        expect(el.element.getElementType()).toEqual(type);
    });

    it('should return an Obj<iTreeElement> with an alias that matches the ID if no alias is provided', () => {
        const type = 'table';
        const alias = 'newTable';
        const el = factory.createTreeElement(type, alias) as iTreeElement;
        expect(el.alias).toEqual(el.id);
    });

    it('should return undefined if it tries to create a tree element that is not supported', () => {
        const unsupportedElement = 'foobar';
        const supported = factory.getSupportedElement(unsupportedElement);
        expect(factory.createTreeElement).toBeDefined();
        expect(typeof factory.createTreeElement).toEqual('function');
        expect(supported).toEqual(false);
        expect(factory.createTreeElement(unsupportedElement, 'alias')).toEqual(undefined);
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
        expect(factory.getSupportedElement(elType1.getElementType())).toEqual(true);
        expect(factory.getSupportedElement(elType2)).toEqual(false);
    });

    it('should have a function to find an element by alias', () => {
        const targetEl = treeData[2];
        const badAlias = 'zzzzzzzzzzzzz';
        expect(factory.findElementByAlias).toBeDefined();
        expect(typeof factory.findElementByAlias).toEqual('function');
        expect(factory.findElementByAlias(treeData, targetEl.alias)).toBeDefined();
        expect(factory.findElementByAlias(treeData, targetEl.alias)).toEqual(targetEl);
        expect(factory.findElementByAlias(treeData, badAlias)).toEqual(undefined);
    });

    it('should have a function to add a sibling element', () => {
        const elToAdd = factory.createTreeElement('td', 'alias');
        const parent = treeData[1]; // tr element
        const result1 = factory.addChildElement(parent, elToAdd.id, true);
        const result2 =  factory.addChildElement(parent, elToAdd.id, false);
        expect(factory.addChildElement).toBeDefined();
        expect(typeof factory.addChildElement).toEqual('function');
        expect(result1[0]).toEqual(elToAdd);
        expect(result2[1]).toEqual(elToAdd);
    });

});
