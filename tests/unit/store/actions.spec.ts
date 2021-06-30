import actions from '@/store/actions';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import DefaultState from '@/constants/DefaultState';
import { _TESTING_HASH_ } from '@/constants/Testing';
import iTreeElement from '@/interfaces/iTreeElement';
import iHTMLAttribute from '@/interfaces/iHTMLAttribute';

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
        const data = { activeElement: {} as iTreeElement };
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
        const treeData = mockContext.state.treeData;
        const headID = treeData[1].id;
        const branch = factory.copyBranch(treeData, headID);
        const parent = treeData[0];
        const parentID = parent.id;
        const payload = { branch, parentID };
        const updatedTreeData = [ ...treeData, ...branch ];
        parent.children.push(branch[0].id); // assumes branch head is at index 0
        actions.addBranch(mockContext, payload);
        expect(actions.addBranch).toBeDefined();
        expect(typeof actions.addBranch).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('setTreeData', updatedTreeData);
    });


    it('should have a function for adding a child to a given parent', () => {
        const treeData = mockContext.state.treeData;
        const newElement = factory.createTreeElement('tr', false, 'test tr') as iTreeElement;
        const parentID = DefaultState.treeData[0].id; // expect root table
        const payload: {newElement: iTreeElement, parentID: string } = { newElement, parentID }
        const parentEl = mockContext.state.treeData.find((el: iTreeElement) => el.id == parentID);
        const expectedResult = [ ...treeData, newElement ]
        actions.addChild(mockContext, payload);
        expect(actions.addChild).toBeDefined();
        expect(typeof actions.addChild).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledTimes(1);
        expect(mockContext.commit).toHaveBeenCalledWith('setTreeData', expectedResult);
        expect(parentEl.children.find((c: string) => c == newElement.id)).toBeDefined();
    });

    it('should have a function for deleting a branch from the element tree', () => {
        const idToRemove = 'bar';
        const parentid = 'foo';
        const payload = { idToRemove, parentid };
        const treeData = mockContext.state.treeData;
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
        const treeData = DefaultState.treeData;
        const targetEl = treeData[1];
        const eid = targetEl.id;
        const alias = 'new-alias';
        const attributes = [ { name: 'style', value: 'color: #f00;' } as iHTMLAttribute ];
        targetEl.alias = alias;
        targetEl.attributes = attributes;
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