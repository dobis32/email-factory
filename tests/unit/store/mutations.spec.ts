import mutations from '@/store/mutations';
import iAppState from '@/interfaces/iAppState';
import DefaultStateIndex from '@/constants/DefaultState';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import { _TESTING_HASH_ } from '@/constants/Testing';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';

describe('mutations.ts', () => {
    let treeData: Array<SupportedHTMLElement> 
    let modalState: boolean;
    let activeModal: string;
    let modalcb: Function;
    let modalCanSubmit: boolean;
    let modalData: any;
    let elementTreeFactory: ElementTreeFactory;
    let state: iAppState;

	beforeEach(() => {
        treeData = DefaultStateIndex.treeData;
        modalState = DefaultStateIndex.modalState;
        activeModal = DefaultStateIndex.activeModal;
        modalcb = DefaultStateIndex.modalcb;
        modalCanSubmit = DefaultStateIndex.modalCanSubmit;
        modalData = DefaultStateIndex.modalData;
        elementTreeFactory = DefaultStateIndex.elementTreeFactory;

		state = {
            treeData,
            modalState,
            activeModal,
            modalcb,
            modalCanSubmit,
            modalData,
            elementTreeFactory
        }
	});

   it('should have a function to update the tree data of the state', () => {
    const oldData: Array<SupportedHTMLElement> = state.treeData;
    const newData: Array<SupportedHTMLElement> = [...state.treeData];
    newData[0].setElementChildren(new Array<string>());

    mutations.setTreeData(state, newData);

    expect(mutations.setTreeData).toBeDefined();
    expect(typeof mutations.setTreeData).toEqual('function');
    expect(oldData == state.treeData).toEqual(false);
   });

   it('should have a function to update the modal state of the state', () => {
    const oldState = state.modalState;
    const newState = !state.modalState;

    mutations.setModalState(state, newState);
    
    expect(mutations.setModalState).toBeDefined();
    expect(typeof mutations.setModalState).toEqual('function');
    expect(oldState == state.modalState).toEqual(false);
   });

   it('should have a function to set the active modal card of the state', () => {
    const oldCard = state.activeModal;
    const card = 'card';

    mutations.setModalCard(state, card);
    
    expect(mutations.setModalCard).toBeDefined();
    expect(typeof mutations.setModalCard).toEqual('function');
    expect(state.activeModal).toEqual(card);
    expect(oldCard == state.activeModal).toEqual(false);
   });

   it('should have a function to set the data used by the modal', () => {
    const modalData = {};
    mutations.setModalData(state, modalData);
    expect(mutations.setModalData).toBeDefined();
    expect(typeof mutations.setModalData).toEqual('function');
    expect(state.modalData).toEqual(modalData);
   });

   it('should have a function to set the modal callback function of the state', () => {
    const newCB = () => { return false; }

    mutations.setModalCallback(state, newCB);
    
    expect(mutations.setModalCallback).toBeDefined();
    expect(typeof mutations.setModalCallback).toEqual('function');
    expect(state.modalcb).toEqual(newCB);
   });

   it('should have a function to set a boolean which decides if the modal can submit any data or not', () => {
    const canSubmit = !DefaultStateIndex.modalCanSubmit;
    mutations.modalCanSubmit(state, canSubmit);
    expect(mutations.modalCanSubmit).toBeDefined();
    expect(typeof mutations.modalCanSubmit).toEqual('function');
    expect(state.modalCanSubmit).toEqual(canSubmit);
   });  
});
