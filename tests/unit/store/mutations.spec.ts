import mutations from '@/store/mutations';
import iTreeElement from '@/interfaces/iTreeElement';
import DefaultStateIndex from '@/constants/DefaultState';

describe('mutations.ts', () => {
    let treeData: Array<iTreeElement> 
    let modalState: boolean;
    let activeModal: string;
    let validChildren: Array<string>;
    let modalcb: Function;
    let state: any;


	beforeEach(() => {
        treeData = DefaultStateIndex.treeData
        modalState = DefaultStateIndex.modalState;
        activeModal = DefaultStateIndex.activeModal;
        validChildren = DefaultStateIndex.validChildren;
        modalcb = DefaultStateIndex.modalcb;

		state = {
            treeData,
            modalState,
            activeModal,
            validChildren,
            modalcb
        }
	});

   it('should have a function to update the tree data of the state index', () => {
    const oldData = state.treeData;
    const newData = [...state.treeData]
    newData[0].children = new Array<iTreeElement>();

    mutations.setTreeData(state, newData);

    expect(mutations.setTreeData).toBeDefined();
    expect(typeof mutations.setTreeData).toEqual('function');
    expect(oldData == state.treeData).toEqual(false);
   });

   it('should have a function to update the modal state of the state index', () => {
    const oldState = state.modalState;
    const newState = !state.modalState;

    mutations.setModalState(state, newState);
    
    expect(mutations.setModalState).toBeDefined();
    expect(typeof mutations.setModalState).toEqual('function');
    expect(oldState == state.modalState).toEqual(false);
   });

   it('should have a function to reset the active modal card of the state index', () => {
    const card = DefaultStateIndex.activeModal;
    state.activeModal = card;

    mutations.setModalCard(state, card);
    
    expect(mutations.setModalCard).toBeDefined();
    expect(typeof mutations.setModalCard).toEqual('function');
    expect(state.activeModal).toEqual(DefaultStateIndex.activeModal);
   });

   it('should have a function to set the active modal card of the state index', () => {
    const oldCard = state.activeModal;
    const card = 'card';

    mutations.setModalCard(state, card);
    
    expect(mutations.setModalCard).toBeDefined();
    expect(typeof mutations.setModalCard).toEqual('function');
    expect(state.activeModal).toEqual(card);
    expect(oldCard == state.activeModal).toEqual(false);
   });

   it('should have a function to reset the modal callback function of the state index', () => {
    const oldCB = () => { return false; }
    state.modalcb = oldCB;

    mutations.setModalCB(state, DefaultStateIndex.modalcb);
    
    expect(mutations.setModalCB).toBeDefined();
    expect(typeof mutations.setModalCB).toEqual('function');
    expect(state.modalcb).toEqual(DefaultStateIndex.modalcb);
    expect(oldCB == state.modalcb).toEqual(false);
   });
   
   it('should have a function to set the valid children of the state index', () => {
    const oldChildren = ['foobar'];
    const updatedChildren = ['fizzbuzz'];

    state.validChildren = oldChildren;
    mutations.setValidChildren(state, updatedChildren);

    expect(mutations.setValidChildren).toBeDefined();
    expect(typeof mutations.setValidChildren).toEqual('function');
    
   });

   it('should have a function to set the modal callback function of the state index', () => {
    const newCB = () => { return false; }

    mutations.setModalCB(state, newCB);
    
    expect(mutations.setModalCB).toBeDefined();
    expect(typeof mutations.setModalCB).toEqual('function');
    expect(state.modalcb).toEqual(newCB);
   });
});
