import actions from '@/store/actions';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import DefaultState from '@/constants/DefaultState';
import { _TESTING_HASH_ } from '@/constants/Testing';
import iTreeElement from '@/interfaces/iTreeElement';

let mockContext: any;
let factory: ElementTreeFactory;
describe('actions.ts', () => {
	beforeEach(() => {
        factory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_, _TESTING_HASH_);

        factory.findElementByID = jest.fn(factory.findElementByID);
        factory.addChildElement = jest.fn(factory.addChildElement);

		mockContext = {
            commit: jest.fn(),
            state: {
                treeData: [ ... DefaultState.treeData ]
            }
        }
	});

    it('should have a function to close the modal', () => {
        actions.closeModal(mockContext);
        expect(actions.closeModal).toBeDefined();
        expect(typeof actions.closeModal).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalledTimes(2);
        expect(mockContext.commit).toHaveBeenCalledWith('setModalState', false);
        expect(mockContext.commit).toHaveBeenCalledWith('setModalCard', DefaultState.activeModal);
    });

    it('should have a function to open the modal', () => {
        const card = 'someModalCard';
        actions.openModal(mockContext, card);
        expect(actions.openModal).toBeDefined();
        expect(typeof actions.openModal).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalledTimes(2);
        expect(mockContext.commit).toHaveBeenCalledWith('setModalState', true);
        expect(mockContext.commit).toHaveBeenCalledWith('setModalCard', card);
    });

    it('should have a function that resets the modal CB', () => {
        actions.resetModalCB(mockContext)
        expect(actions.resetModalCB).toBeDefined();
        expect(typeof actions.resetModalCB).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('setModalCB', DefaultState.modalcb);
    });

    it('should have a function that resets the modal CB', () => {
        const cb = () => { return true; }
        actions.setModalCB(mockContext, cb);
        expect(actions.setModalCB).toBeDefined();
        expect(typeof actions.setModalCB).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('setModalCB', cb);
    });

    it('should have a function for setting the active element', () => {
        const activeElement = DefaultState.treeData[1];
        actions.setActiveElement(mockContext, activeElement);
        expect(actions.setActiveElement).toBeDefined();
        expect(typeof actions.setActiveElement).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('setActiveElement', activeElement);
    });

    it('should have a function for resetting the active element', () => {
        const defaultElement = DefaultState.activeElement;
        actions.resetActiveElement(mockContext);
        expect(actions.resetActiveElement).toBeDefined();
        expect(typeof actions.resetActiveElement).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('setActiveElement', defaultElement);
    });

    it('should have a function for setting validchildren', () => {
        const validChildren = DefaultState.treeData[1].children;
        actions.setValidChildren(mockContext, validChildren);
        expect(actions.setValidChildren).toBeDefined();
        expect(typeof actions.setValidChildren).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('setValidChildren', validChildren);
    });

    it('should have a function for adding a child to a given parent', () => {
        const treeData = mockContext.state.treeData;
        const newElement = factory.createTreeElement('tr', false, 'test tr') as iTreeElement;
        const parentID = DefaultState.treeData[0].id; // expect root table
        const payload: {newElement: iTreeElement, parentID: string } = { newElement, parentID }
        const parentEl = mockContext.state.treeData.find((el: iTreeElement) => el.id == parentID);
        const expectedResult = [ ...treeData, newElement]
        parentEl.children.push(newElement.id);
        const finalChildren = [ ...parentEl.children, newElement.id  ]
        actions.addChild(mockContext, payload);
        expect(actions.addChild).toBeDefined();
        expect(typeof actions.addChild).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledTimes(1);
        expect(mockContext.commit).toHaveBeenCalledWith('setTreeData', expectedResult);
        expect(finalChildren).toEqual([ ...parentEl.children, newElement.id ]);
    });
});