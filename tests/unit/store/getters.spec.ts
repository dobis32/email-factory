import getters from '@/store/getters';
import iTreeElement from '@/interfaces/iTreeElement';
import DefaultStateIndex from '@/constants/DefaultStateIndex';

describe('getters.ts', () => {
    let treeData: Array<iTreeElement> 
    let modalState: boolean;
    let activeModal: string;
    let modalcb: Function;
    let state: any;


	beforeEach(() => {
        treeData = DefaultStateIndex.treeData
        modalState = DefaultStateIndex.modalState;
        activeModal = DefaultStateIndex.activeModal;
        modalcb = DefaultStateIndex.modalcb;

		state = {
            treeData,
            modalState,
            activeModal,
            modalcb
        }
	});

   it('should have a function to get the tree data from the state index', () => {
    expect(getters.getElementTree).toBeDefined();
    expect(typeof getters.getElementTree).toEqual('function');
    expect(getters.getElementTree(state)).toEqual(state.treeData);
   });

   it('should have a function to get the modal state from the state index', () => {
    expect(getters.getModalState).toBeDefined();
    expect(typeof getters.getModalState).toEqual('function');
    expect(getters.getModalState(state)).toEqual(state.modalState);
   });

   it('should have a function to get the active modal card from the state index', () => {
    expect(getters.getActiveModal).toBeDefined();
    expect(typeof getters.getActiveModal).toEqual('function');
    expect(getters.getActiveModal(state)).toEqual(state.activeModal);
   });

   it('should have a function to get the modal callback function from the state index', () => {
    expect(getters.getModalCB).toBeDefined();
    expect(typeof getters.getModalCB).toEqual('function');
    expect(getters.getModalCB(state)).toEqual(state.modalcb);
   });
});
