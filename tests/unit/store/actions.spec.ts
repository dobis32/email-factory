import actions from '@/store/actions';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import DefaultState from '@/constants/DefaultState';
import { _TESTING_HASH_ } from '@/constants/Testing';
import iTreeElement from '@/interfaces/iTreeElement';

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
                treeData: [ ... DefaultState.treeData ]
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
        const card = 'someModalCard';
        actions.openModal(mockContext, card);
        expect(actions.openModal).toBeDefined();
        expect(typeof actions.openModal).toEqual('function');
        expect(mockContext.commit).toHaveBeenCalled();
        expect(mockContext.commit).toHaveBeenCalledWith('setModalState', true);
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
});