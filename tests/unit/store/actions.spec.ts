import actions from '@/store/actions';
import iTreeElement from '@/interfaces/iTreeElement';
import { HTML_TD } from '@/constants/SupportedHTMLElementTypes';
import HTMLAttribute from '@/classes/HTMLAttribute';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import DefaultState from '@/constants/DefaultState';
import { _TESTING_HASH_ } from '@/constants/Testing';

let mockContext: any;
const factory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_, _TESTING_HASH_);
describe('actions.ts', () => {
	beforeEach(() => {
        factory.findElementByID = jest.fn(factory.findElementByID);
        factory.addChildElement = jest.fn(factory.addChildElement);

		mockContext = {
            commit: jest.fn(),
            state: {
                treeData: DefaultState.treeData
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
});
