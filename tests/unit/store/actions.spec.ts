import actions from '@/store/actions';
import iAddSiblingPayload from '@/interfaces/iAddSiblingPayload';
import iTreeElement from '@/interfaces/iTreeElement';


let mockContext: any;
describe('actions.ts', () => {
	beforeEach(() => {
		mockContext = {
            commit: jest.fn()
        }
	});

    it('should have a function for adding a sibling to the assumed element', () => {
        const elementToAdd = { id: 'foo', type: 'table', alias: 'foo', root: false, children: [] } as iTreeElement;
        const payload = {
            elementToAdd,
            parentid: 'parentID', 
            pre: true
         } as iAddSiblingPayload;
        
        actions.addElementSibling(mockContext, payload);
        
        expect(actions.addElementSibling).toBeDefined();
        expect(typeof actions.addElementSibling).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('addTreeElement', payload);
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
