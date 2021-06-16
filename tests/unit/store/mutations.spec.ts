import mutations from '@/store/mutations';
import iTreeElement from '@/interfaces/iTreeElement';
import DefaultStateIndex from '@/constants/DefaultState';

describe('mutations.ts', () => {
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

   it('should have a function to update the tree data of the state', () => {
    const oldData = state.treeData;
    const newData = [...state.treeData]
    newData[0].children = new Array<iTreeElement>();

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

   it('should have a function to reset the active modal card of the state', () => {
    const card = DefaultStateIndex.activeModal;
    state.activeModal = card;

    mutations.setModalCard(state, card);
    
    expect(mutations.setModalCard).toBeDefined();
    expect(typeof mutations.setModalCard).toEqual('function');
    expect(state.activeModal).toEqual(DefaultStateIndex.activeModal);
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

   it('should have a function to set the modal callback function of the state', () => {
    const newCB = () => { return false; }

    mutations.setModalCallback(state, newCB);
    
    expect(mutations.setModalCallback).toBeDefined();
    expect(typeof mutations.setModalCallback).toEqual('function');
    expect(state.modalcb).toEqual(newCB);
   });
});
