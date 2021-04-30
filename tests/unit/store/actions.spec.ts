import actions from '@/store/actions';
import iAddSiblingPayload from '@/interfaces/iAddSiblingPayload';
import iTreeElement from '@/interfaces/iTreeElement';
import { HTML_TD } from '@/constants/SupportedHTMLElementTypes';
import HTMLAttribute from '@/classes/HTMLAttribute';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import DefaultState from '@/constants/DefaultState';

let mockContext: any;
const factory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_);
describe('actions.ts', () => {
	beforeEach(() => {
        factory.getTreeAsArray = jest.fn(factory.getTreeAsArray);
        factory.findElementByID = jest.fn(factory.findElementByID);
        factory.addChildElement = jest.fn(factory.addChildElement);

		mockContext = {
            commit: jest.fn(),
            state: {
                treeData: DefaultState.treeData
            }
        }
	});

    it('should have a function for adding a sibling to the assumed element', () => {
        const elementToAdd = { id: 'foo',  root: false, element: HTML_TD, alias: 'foo', children: [] as Array<iTreeElement>, attributes: [] as Array<HTMLAttribute> } as iTreeElement;
        const treeData = DefaultState.treeData;
        const parentid =  DefaultState.treeData[0].children[0].id;
        const pre = true;
		const parentEl = factory.findElementByID(treeData, parentid) as iTreeElement;
		
        parentEl.children = factory.addChildElement(parentEl, elementToAdd, pre);

        const payload = {
            elementToAdd,
            parentid: parentid,
            factory,
            pre
         } as iAddSiblingPayload;
        
        actions.addElementSibling(mockContext, payload);
        
        expect(actions.addElementSibling).toBeDefined();
        expect(typeof actions.addElementSibling).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('updateTreeData', treeData);
    });

    it('should have a function to close the modal', () => {
        actions.closeModal(mockContext);
        expect(actions.closeModal).toBeDefined();
        expect(typeof actions.closeModal).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalledTimes(2);
        expect(mockContext.commit).toHaveBeenCalledWith('updateModalState', false);
        expect(mockContext.commit).toHaveBeenCalledWith('resetModalCard');
    });

    it('should have a function to open the modal', () => {
        const card = 'someModalCard';
        actions.openModal(mockContext, card);
        expect(actions.openModal).toBeDefined();
        expect(typeof actions.openModal).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalledTimes(2);
        expect(mockContext.commit).toHaveBeenCalledWith('updateModalState', true);
        expect(mockContext.commit).toHaveBeenCalledWith('setModalCard', card);
    });

    it('should have a function that resets the modal CB', () => {
        actions.resetModalCB(mockContext)
        expect(actions.resetModalCB).toBeDefined();
        expect(typeof actions.resetModalCB).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('resetModalCB');
    });

    it('should have a function that resets the modal CB', () => {
        const cb = () => { return true; }
        actions.setModalCB(mockContext, cb);
        expect(actions.setModalCB).toBeDefined();
        expect(typeof actions.setModalCB).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('setModalCB', cb);
    });
});
