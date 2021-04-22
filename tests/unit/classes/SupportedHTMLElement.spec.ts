import SupportedHTMLElement from '@/classes/SupportedHTMLElement';

describe('SupportedHTMLElement.ts', () => {
    let el: SupportedHTMLElement;
    let mockType: string;
    let mockChildren: Array<string>;
    const assumedType = 'foobar';
    const validChild1 = 'fizz';
    const validChild2 = 'buzz';
	beforeEach(() => {
        mockType = assumedType;
        mockChildren =  [validChild1, validChild2];
        el = new SupportedHTMLElement(mockType, mockChildren);
	});

    it('should have a function for getting valid children of the assumed html element', () => {
        expect(el.getValidChildren).toBeDefined();
        expect(typeof el.getValidChildren).toEqual('function');
    });

    it('should have a function for getting element type of the assumed html element', () => {
        expect(el.getElementType).toBeDefined();
        expect(typeof el.getElementType).toEqual('function');
        expect(el.getElementType()).toEqual
    });

    it('should have a function that can determine if a given element type is a valid child of the assumed html element', () => {
        const invalidChild = 'zzzzzzzzz';
        expect(el.isValidChild).toBeDefined();
        expect(typeof el.isValidChild).toEqual('function');
        const result1 = el.isValidChild(validChild1);
        const result2 = el.isValidChild(invalidChild);
        expect(result1).toEqual(true);
        expect(result2).toEqual(false);
    });
});
