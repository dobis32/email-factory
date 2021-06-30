import getters from '@/store/getters';
import iTreeElement from '@/interfaces/iTreeElement';
import iAppState from '@/interfaces/iAppState';
import DefaultStateIndex from '@/constants/DefaultState';
import iModalPayload from '@/interfaces/iModalPayload';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
const f = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_);


describe('getters.ts', () => {
    let treeData: Array<iTreeElement> 
    let modalState: boolean;
    let activeModal: string;
    let modalcb: Function;
    let modalCanSubmit: boolean;
    let state: iAppState;
    let mockPayload: iModalPayload;
    let modalData: { activeElement: iTreeElement };
	beforeEach(() => {
        treeData = DefaultStateIndex.treeData
        modalState = DefaultStateIndex.modalState;
        activeModal = DefaultStateIndex.activeModal;
        modalcb = DefaultStateIndex.modalcb;
		modalData = DefaultStateIndex.modalData;
        modalCanSubmit = DefaultStateIndex.modalCanSubmit;

        state = {
            treeData,
            modalState,
            activeModal,
            modalcb,
            modalData,
            modalCanSubmit,
            elementTreeFactory: f
        }

        mockPayload = {
            modalState,
            activeModal,
            modalData,
            modalcb,
        }
	});

   it('should have a function to get the tree data from the state index', () => {
    const treeData = getters.getTreeData(state);
    expect(getters.getTreeData).toBeDefined();
    expect(typeof getters.getTreeData).toEqual('function');
    expect(getters.getTreeData(state)).toEqual(state.treeData);
    expect(treeData).toEqual(DefaultStateIndex.treeData);
   });

   it('should have a function to get the tree data in actual tree form', () => {
    const builtTree = f.buildTree(state.treeData);
    f.buildTree = jest.fn(f.buildTree);
    const result = getters.getBuiltTree(state);

    expect(getters.getBuiltTree).toBeDefined();
    expect(typeof getters.getBuiltTree).toEqual('function');
    expect(result).toEqual(builtTree);
    expect(f.buildTree).toHaveBeenCalledWith(state.treeData);

   });

   it('should have a function to get the modal state from the state index', () => {
    const expectedPayload: iModalPayload = {
        modalState,
        activeModal,
        modalcb,
        modalData
    };
    const payload = getters.getModalPayload(state)
    expect(getters.getModalPayload).toBeDefined();
    expect(typeof getters.getModalPayload).toEqual('function');
    expect(getters.getModalPayload(state)).toEqual(mockPayload);
    expect(payload).toEqual(expectedPayload);
   });
});
