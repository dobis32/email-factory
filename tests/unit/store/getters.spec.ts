import getters from '@/store/getters';
import iAppState from '@/interfaces/iAppState';
import iNode from '@/interfaces/iNode';
import DefaultStateIndex from '@/constants/DefaultState';
import iModalPayload from '@/interfaces/iModalPayload';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import _VALID_CHILD_INDEX_ from '@/constants/ValidChildIndex';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import CodeModule from '@/classes/CodeModule';
const f = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_, _VALID_CHILD_INDEX_);


describe('getters.ts', () => {
    let activeModule: CodeModule ;
    let builtTree: Array<iNode>;
    let modalState: boolean;
    let activeModal: string;
    let modalcb: Function;
    let modalCanSubmit: boolean;
    let state: iAppState;
    let mockPayload: iModalPayload;
    let modalData: { activeElement: SupportedHTMLElement };
	beforeEach(() => {
        activeModule = DefaultStateIndex.activeModule;
        builtTree = DefaultStateIndex.builtTree;
        modalState = DefaultStateIndex.modalState;
        activeModal = DefaultStateIndex.activeModal;
        modalcb = DefaultStateIndex.modalcb;
		modalData = DefaultStateIndex.modalData;
        modalCanSubmit = DefaultStateIndex.modalCanSubmit;

        state = {
            activeModule,
            codeModules: [] as Array<CodeModule>,
            builtTree, 
            modalState,
            activeModal,
            modalcb,
            modalData,
            modalCanSubmit,
            elementTreeFactory: f,
        } as iAppState

        mockPayload = {
            modalState,
            activeModal,
            modalData,
            modalcb,
        }
	});

   it('should have a function to get the tree data from the state index', () => {
    const treeData: Array<SupportedHTMLElement> = getters.getTreeData(state);
    expect(getters.getTreeData).toBeDefined();
    expect(typeof getters.getTreeData).toEqual('function');
    expect(getters.getTreeData(state)).toEqual(state.activeModule.getModuleTreeData());
    expect(treeData).toEqual(DefaultStateIndex.activeModule.getModuleTreeData());
   });

   it('should have a function to get the tree data in actual tree form', () => {
    const builtTree = f.buildTree(state.activeModule.getModuleTreeData());
    const result = getters.getBuiltTree(state);

    expect(getters.getBuiltTree).toBeDefined();
    expect(typeof getters.getBuiltTree).toEqual('function');
    expect(result).toEqual(builtTree);

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
