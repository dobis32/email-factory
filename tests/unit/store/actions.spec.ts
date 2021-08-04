import actions from '@/store/actions';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import _VALID_CHILD_INDEX_ from '@/constants/ValidChildIndex';
import DefaultState from '@/constants/DefaultState';
import { _TESTING_HASH_ } from '@/constants/Testing';
import iAppState from '@/interfaces/iAppState';
import iHTMLAttribute from '@/interfaces/iHTMLAttribute';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import CodeModule from '@/classes/CodeModule';
import iNode from '@/interfaces/iNode';
let mockContext: any;
let factory: ElementTreeFactory;
let state: iAppState;
describe('actions.ts', () => {
	beforeEach(() => {
        factory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_, _VALID_CHILD_INDEX_);
        factory.findElementByID = jest.fn(factory.findElementByID);
        factory.addChildElement = jest.fn(factory.addChildElement);
        state = {
            activeModule: DefaultState.codeModules[0],
            modalCanSubmit: false,
            activeModal: 'foobar',
            codeModules: DefaultState.codeModules,
            builtTree: [] as Array<iNode>,
            modalState: false,
            modalcb: DefaultState.modalcb,
            modalData: {},
            elementTreeFactory: factory
        } as iAppState;
		mockContext = {
            commit: jest.fn(),
            dispatch: jest.fn(),
            state
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
        actions.openModal(mockContext);
        expect(actions.openModal).toBeDefined();
        expect(typeof actions.openModal).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('setModalState', true);
    });

    it('should have a function to set data for the modal to use', () => {
        const card = 'TreeElementControlsCard';
        const data = { activeElement: {} as SupportedHTMLElement };
        const payload = { card, data };
        actions.setModal(mockContext, payload);
        expect(actions.setModal).toBeDefined();
        expect(typeof actions.setModal).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('setModalCard', card);
        expect(mockContext.commit).toHaveBeenCalledWith('setModalData', data);
    });

    it('should have a function for resetting the modal callback function to default', () => {
        actions.resetModalCallback(mockContext);
        expect(actions.resetModalCallback).toBeDefined();
        expect(typeof actions.resetModalCallback).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalledWith('setModalCallback', DefaultState.modalcb);
    });

    it('should have a function for setting the modal callback function', () => {
        const cb = () => true
        actions.setModalCallback(mockContext, cb);
        expect(actions.setModalCallback).toBeDefined();
        expect(typeof actions.setModalCallback).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('setModalCallback', cb);
    });

    it('should have a function for adding a branch to the element tree', () => {
        const state: iAppState = mockContext.state;
        actions.updateTree = jest.fn(actions.updateTree);
        const treeData: Array<SupportedHTMLElement> = state.codeModules[0].getModuleTreeData();
        const headID = treeData[1].getElementID();
        const branch = factory.copyBranch(treeData, headID);
        const parent: SupportedHTMLElement = treeData[0];
        const parentID = parent.getElementID();
        const payload = { branch, parentID };
        const updatedTreeData = [ ...treeData, ...branch ];
        parent.getElementChildren().push(branch[0].getElementID()); // assumes branch head is at index 0
        actions.addBranch(mockContext, payload);
        expect(actions.addBranch).toBeDefined();
        expect(typeof actions.addBranch).toEqual('function');
        expect(mockContext.dispatch).toHaveBeenCalled();
        expect(mockContext.dispatch).toHaveBeenCalledWith('updateTree', updatedTreeData);
    });


    it('should have a function for adding a child to a given parent', () => {
        const state: iAppState = mockContext.state;
        const treeData: Array<SupportedHTMLElement> = state.codeModules[0].getModuleTreeData();
        const newElement = factory.createTreeElement('tr', false, 'test tr') as SupportedHTMLElement;
        const parentID = treeData[0].getElementID(); // expect root table
        const payload: {newElement: SupportedHTMLElement, parentID: string } = { newElement, parentID }
        const parentEl: SupportedHTMLElement = treeData.find((el: SupportedHTMLElement) => el.getElementID() == parentID) as SupportedHTMLElement;
        const expectedResult = [ ...treeData, newElement ]
        actions.addChild(mockContext, payload);
        expect(actions.addChild).toBeDefined();
        expect(typeof actions.addChild).toEqual('function');
        expect(mockContext.dispatch).toHaveBeenCalled();
        expect(mockContext.dispatch).toHaveBeenCalledTimes(1);
        expect(mockContext.dispatch).toHaveBeenCalledWith('updateTree', expectedResult);
        expect(parentEl.getElementChildren().find((c: string) => c == newElement.getElementID())).toBeDefined();
    });

    it('should have a function for deleting a branch from the element tree', () => {
        const state: iAppState = mockContext.state;
        actions.updateTree = jest.fn(actions.updateTree);
        const parent: SupportedHTMLElement = state.codeModules[0].getModuleTreeData()[0]; // this should be a root
        const idToRemove = parent.getElementChildren()[0];
        const parentid = parent.getElementID();
        const payload = { idToRemove, parentid };
        const treeData: Array<SupportedHTMLElement> = state.activeModule.getModuleTreeData();
        const f = mockContext.state.elementTreeFactory;
        const updatedData = f.deleteBranch(treeData, idToRemove, parentid);
        f.deleteBranch = jest.fn(f.deleteBranch);
        actions.deleteBranch(mockContext, payload);
        expect(actions.deleteBranch).toBeDefined();
        expect(typeof actions.deleteBranch).toEqual('function');
        expect(f.deleteBranch).toHaveBeenCalledWith(treeData, idToRemove, parentid);
        expect(mockContext.dispatch).toHaveBeenCalledWith('updateTree', updatedData);
    });

    it('should have a function for updating the alias and attributes of a specified tree element', () => {
        actions.updateTree = jest.fn(actions.updateTree);
        const treeData: Array<SupportedHTMLElement> = DefaultState.codeModules[0].getModuleTreeData();
        const targetEl = treeData[1];
        const eid = targetEl.getElementID();
        const alias = 'new-alias';
        const attributes = [ { name: 'style', value: 'color: #f00;' } as iHTMLAttribute ];
        targetEl.setElementAlias(alias);
        targetEl.setElementAttributes(attributes);
        const updatedTreeData = [ ...treeData ];
        const payload = { eid, alias, attributes }
        actions.updateElement(mockContext, payload);
        expect(actions.updateElement).toBeDefined();
        expect(typeof actions.updateElement).toEqual('function');
        expect(mockContext.dispatch).toHaveBeenCalledWith('updateTree', updatedTreeData);
    });

    it('should have a function for setting a boolean that controls wether or not the modal can submit data', () => {
        const b = false;
        actions.modalCanSubmit(mockContext, b);
        expect(actions.modalCanSubmit).toBeDefined();
        expect(typeof actions.modalCanSubmit).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalledWith('modalCanSubmit', b);
    });

    it('should have a function to update the tree', () => {
        // fuck you do it later
        // it is later, fuck you
    });
});