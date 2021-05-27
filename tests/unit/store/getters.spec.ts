import getters from '@/store/getters';
import iTreeElement from '@/interfaces/iTreeElement';
import DefaultStateIndex from '@/constants/DefaultState';
import iModalPayload from '@/interfaces/iModalPayload';

describe('getters.ts', () => {
    let treeData: Array<iTreeElement> 
    let modalState: boolean;
    let activeModal: string;
    let modalcb: Function;
    let activeElement: iTreeElement;
    let state: any;
    let mockPayload: iModalPayload;

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

        mockPayload = {
            modalState,
            activeModal,
            activeElement,
            modalcb
        }
	});

   it('should have a function to get the tree data from the state index', () => {
    expect(getters.getElementTree).toBeDefined();
    expect(typeof getters.getElementTree).toEqual('function');
    expect(getters.getElementTree(state)).toEqual(state.treeData);
   });

   it('should have a function to get the modal state from the state index', () => {
    expect(getters.getModalPayload).toBeDefined();
    expect(typeof getters.getModalPayload).toEqual('function');
    expect(getters.getModalPayload(state)).toEqual(mockPayload);
   });
});
