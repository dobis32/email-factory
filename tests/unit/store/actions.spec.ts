import actions from '@/store/actions';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import DefaultState from '@/constants/DefaultState';
import { _TESTING_HASH_ } from '@/constants/Testing';
import iTreeElement from '@/interfaces/iTreeElement';
import iHTMLAttribute from '@/interfaces/iHTMLAttribute';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';

let mockContext: any;
let factory: ElementTreeFactory;
describe('actions.ts', () => {
	beforeEach(() => {
        factory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_, _TESTING_HASH_);

        factory.findElementByID = jest.fn(factory.findElementByID);
        factory.addChildElement = jest.fn(factory.addChildElement);

		mockContext = {
            commit: jest.fn(),
            state: {
                treeData: [ ... DefaultState.treeData ],
                elementTreeFactory: factory
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
        const treeData: Array<SupportedHTMLElement> = mockContext.state.treeData;
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
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('setTreeData', updatedTreeData);
    });


    it('should have a function for adding a child to a given parent', () => {
        const treeData: Array<SupportedHTMLElement> = mockContext.state.treeData;
        const newElement = factory.createTreeElement('tr', false, 'test tr') as SupportedHTMLElement;
        const parentID = DefaultState.treeData[0].getElementID(); // expect root table
        const payload: {newElement: SupportedHTMLElement, parentID: string } = { newElement, parentID }
        const parentEl: SupportedHTMLElement = mockContext.state.treeData.find((el: SupportedHTMLElement) => el.getElementID() == parentID);
        const expectedResult = [ ...treeData, newElement ]
        actions.addChild(mockContext, payload);
        expect(actions.addChild).toBeDefined();
        expect(typeof actions.addChild).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledTimes(1);
        expect(mockContext.commit).toHaveBeenCalledWith('setTreeData', expectedResult);
        expect(parentEl.getElementChildren().find((c: string) => c == newElement.getElementID())).toBeDefined();
    });

    it('should have a function for deleting a branch from the element tree', () => {
        const idToRemove = 'bar';
        const parentid = 'foo';
        const payload = { idToRemove, parentid };
        const treeData: Array<SupportedHTMLElement> = mockContext.state.treeData;
        const f = mockContext.state.elementTreeFactory;
        const updatedData = f.deleteBranch(treeData, idToRemove, parentid);
        f.deleteBranch = jest.fn(f.deleteBranch);
        actions.deleteBranch(mockContext, payload);
        expect(actions.deleteBranch).toBeDefined();
        expect(typeof actions.deleteBranch).toEqual('function');
        expect(f.deleteBranch).toHaveBeenCalledWith(treeData, idToRemove, parentid);
        expect(mockContext.commit).toHaveBeenCalledWith('setTreeData', updatedData);
    });

    it('should have a function for updating the alias and attributes of a specified tree element', () => {
        const treeData: Array<SupportedHTMLElement> = DefaultState.treeData;
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
        expect(mockContext.commit).toHaveBeenCalledWith('setTreeData', updatedTreeData);
    });

    it('should have a function for setting a boolean that controls wether or not the modal can submit data', () => {
        const b = false;
        actions.modalCanSubmit(mockContext, b);
        expect(actions.modalCanSubmit).toBeDefined();
        expect(typeof actions.modalCanSubmit).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalledWith('modalCanSubmit', b);
    });
});