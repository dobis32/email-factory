import iHTMLAttribute from '@/interfaces/iHTMLAttribute';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';

describe('SupportedHTMLElement.ts', () => {
    let el: SupportedHTMLElement;
    let mockID: string;
    let mockAlias: string;
    let mockType: string;
    let mockChildren: Array<string>;
    let mockRoot: boolean;
    let mockAttributes: Array<iHTMLAttribute>;
    const assumedType = 'foobar';
    const validChild1 = 'fizz';
    const validChild2 = 'buzz';
	beforeEach(() => {
        mockType = assumedType;
        mockChildren =  [validChild1, validChild2];
        mockID = 'some-random-hash';
        mockAlias = 'some-alias';
        mockRoot = false;
        mockAttributes = [
            {
                name: 'color',
                value: '#f00;'
            },
            
        ];

        el = new SupportedHTMLElement(mockID, mockAlias, mockType, mockRoot, mockAttributes, mockChildren);
	});

    it('should have a function for getting the ID of the assumed element', () => {
        expect(el.getElementID).toBeDefined();
        expect(typeof el.getElementID).toEqual('function');
    });

    it('should have a function for getting the alias of the assumed element', () => {
        expect(el.getElementAlias).toBeDefined();
        expect(typeof el.getElementAlias).toEqual('function');
    });

    it('should have a function for getting the type of the assumed element', () => {
        expect(el.getElementType).toBeDefined();
        expect(typeof el.getElementType).toEqual('function');
    });

    it('should have a function for determining if the assumed element is a root element', () => {
        expect(el.elementIsARoot).toBeDefined();
        expect(typeof el.elementIsARoot).toEqual('function');
    });

    it('should have a function for getting the element attributes of the assumed element', () => {
        expect(el.getElementAttributes).toBeDefined();
        expect(typeof el.getElementAttributes).toEqual('function');
    });

    it('should have a function for getting the children of the assumed element', () => {
        expect(el.getElementChildren).toBeDefined();
        expect(typeof el.getElementChildren).toEqual('function');
    });

   it('should have a function for setting the children of the assumed element', () => {
        const updated = [ {name: 'foobar', value: 'something'}];
        el.setElementAttributes(updated)
        expect(el.setElementChildren).toBeDefined();
        expect(typeof el.setElementChildren).toEqual('function');
        
   });
});
