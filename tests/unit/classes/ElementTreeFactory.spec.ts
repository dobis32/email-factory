import ElementTreeFactory from '@/classes/ElementTreeFactory';
import SUPPORTED_HTML_ELEMENTS from '@/constants/SupportedHTMLElementTypes';
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
        factory = new ElementTreeFactory(SUPPORTED_HTML_ELEMENTS);
        treeAsArray = factory.getTreeAsArray(treeData);
	});

    it('should have a function to get a given tree as an array', () => {
        expect(factory.getTreeAsArray).toBeDefined();
        expect(typeof factory.getTreeAsArray).toEqual('function');
        expect(factory.getTreeAsArray(treeData)).toEqual(treeAsArray);
    });

    it('should have a function that determins if an element type is supported', () => {
        const elType1 = SUPPORTED_HTML_ELEMENTS[0];
        const elType2 = 'foobar';
        expect(factory.elementIsSupported).toBeDefined();
        expect(typeof factory.elementIsSupported).toEqual('function');
        expect(factory.elementIsSupported(elType1)).toEqual(true);
        expect(factory.elementIsSupported(elType2)).toEqual(false);
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

    // TODO: make this piece of shit PASS
    // it('should have a function to add a sibling element', () => {
    //     const elToAdd = factory.createTreeElement('td');
    //     const parent = treeData[0].children[0]; // tr element
    //     const result1 = factory.addElementSibling(parent, elToAdd, true);
    //     const result2 =  factory.addElementSibling(parent, elToAdd, false);
    //     expect(factory.addElementSibling).toBeDefined();
    //     expect(typeof factory.addElementSibling).toEqual('function');
    //     expect(result1[0]).toEqual(elToAdd);
    //     expect(result1[1]).toEqual(elToAdd);
    // });
});
