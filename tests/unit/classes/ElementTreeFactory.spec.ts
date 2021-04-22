import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import iTreeElement from '@/interfaces/iTreeElement';

describe('ElementTreeFactory.ts', () => {
    let treeData: Array<iTreeElement>;
    let factory: ElementTreeFactory;
    let treeAsArray: Array<iTreeElement>;
	beforeEach(() => {
        treeData = [
            {
                id: 'foo',
                root: true,
                type: 'table',
                alias: 'rootTable',
                children: [
                    {
                        id: 'bar',
                        root: false,
                        type: 'tr',
                        alias: 'rootTR',
                        children: [
                            {
                                id: 'fizz',
                                root: false,
                                type: 'td',
                                alias: 'rootTD',
                                children: [
                                    {
                                        id: 'buzz',
                                        root: false,
                                        type: 'p',
                                        alias: 'rootP',
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
        factory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_);
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
        expect(el.type).toEqual(type);
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

    it('should have a function to find an element by ID', () => {
        const targetEl = treeAsArray[2];
        const badID = 'zzzzzzzzz';
        expect(factory.findElementByID).toBeDefined();
        expect(typeof factory.findElementByID).toEqual('function');
        expect(factory.findElementByID(treeAsArray, targetEl.id)).toBeDefined();
        expect(factory.findElementByID(treeAsArray, targetEl.id)).toEqual(targetEl);
        expect(factory.findElementByID(treeAsArray, badID)).toEqual(undefined);
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
        const result1 = factory.addElementSibling(parent, elToAdd, true);
        const result2 =  factory.addElementSibling(parent, elToAdd, false);
        expect(factory.addElementSibling).toBeDefined();
        expect(typeof factory.addElementSibling).toEqual('function');
        expect(result1[0]).toEqual(elToAdd);
        expect(result2[1]).toEqual(elToAdd);
    });
});
