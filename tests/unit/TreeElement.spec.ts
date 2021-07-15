import { mount, flushPromises } from '@vue/test-utils';
import TreeElement from '@/components/TreeElement.vue';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import _VALID_CHILD_INDEX_ from '@/constants/ValidChildIndex';
import _DEFAULT_STATE_ from '@/constants/DefaultState';
import iHTMLAttribute from '@/interfaces/iHTMLAttribute';
import { _TESTING_HASH_ } from '@/constants/testing';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';

const elFactory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_, _VALID_CHILD_INDEX_, _TESTING_HASH_);
describe('TreeElement.vue', () => {
	const mockChildren: Array<SupportedHTMLElement> = _DEFAULT_STATE_.treeData
	const mockBuiltBranch = elFactory.buildTree(mockChildren);
	const mockElement = 'table';
	const mockAlias = 'rootTable';
	const mockParentid = _TESTING_HASH_;
	const numberOfChildren = mockChildren.length;
	const mockTreeElement = 'tree-element';
	const mockID = _DEFAULT_STATE_.treeData[0].getElementID();
	let mockProps: any;
	let wrapper: any;
	let dispatch: any;
	let state: any;
	let $store: any;
	let modalResult: any;
	let openModal: Function;
	beforeEach(() => {
		modalResult = {
			alias: 'new-el-name',
			attributes: [ { name: 'style', value: 'color: #f00;' }]
		};

		openModal = jest.fn(() => { return Promise.resolve(modalResult)});

		mockProps = {
			isRoot: false,
			type: mockElement,
			alias: mockAlias,
			id: mockID,
			children: mockBuiltBranch,
			parentid: mockParentid,
			attributes: new Array<iHTMLAttribute>()
		}

		dispatch = jest.fn((action: string, payload: any) => {
			if (action === 'setModalCB') state.modalcb = payload;
		});

		state = _DEFAULT_STATE_;
		state.elementTreeFactory = elFactory; // replace with testing instance 

		$store = {
			state,
			getters: {
				getElementTree: () => {
					return _DEFAULT_STATE_.treeData;
				}
			},
			dispatch
		};

		wrapper = mount(TreeElement, {
			data: () => {
				return {
					treeElementClass: mockTreeElement
				};
			},
			props: mockProps,
			global: {
				mocks: { $store },
				provide: { openModal }
				
			}
		});

		flushPromises();
	});

	afterEach(() => {
		state.modalcb()
	});

	// Data
	it('should concatenate the default tree-element css class with the appropriate element type', () => {
		expect(wrapper.vm.treeElementClass).toEqual(`${mockProps.type} ${mockTreeElement}`);
	});

	// DOM
	it('should have the alias of the assumed tree element rendered to the DOM', () => {
		expect(wrapper.find('#alias').exists()).toBeTruthy();
	});

	it('should have the type of the assumed tree element rendered to the DOM', () => {
		expect(wrapper.find('#type').exists()).toBeTruthy();
	});

	it('should call the promptAction function when the tree element is clicked', () => {
		wrapper.vm.promptAction = jest.fn();
		wrapper.find('.tree-element').trigger('click');
		expect(wrapper.vm.promptAction).toHaveBeenCalled();
	});

	// Method
	it('should have an action for prompting the user for an action', () => {
		const id = wrapper.props().id;
		const el = elFactory.findElementByID(state.treeData, id);
		const payload = { card: 'ElementControlsCard', data: { activeElement: el }};
		wrapper.vm.promptAction();
		expect(wrapper.vm.promptAction).toBeDefined();
		expect(typeof wrapper.vm.promptAction).toEqual('function');
		expect(dispatch).toHaveBeenCalledWith('setModal', payload);
	});

	it('should have a function for performing an action on the assumed tree element', () => {
		wrapper.vm.addChild = jest.fn(() => {});
		const actionAdd  = 'add';

		wrapper.vm.copyBranch = jest.fn(() => {});
		const actionCopy = 'copy';

		wrapper.vm.editElement = jest.fn(() => {});
		const actionEdit = 'edit';

		wrapper.vm.deleteBranch = jest.fn(() => {});
		const actionDelete = 'delete';


		expect(wrapper.vm.performAction).toBeDefined();
		expect(typeof wrapper.vm.performAction).toEqual('function');

		wrapper.vm.performAction(actionAdd);
		expect(wrapper.vm.addChild).toHaveBeenCalled();

		wrapper.vm.performAction(actionCopy);
		expect(wrapper.vm.copyBranch).toHaveBeenCalled();
		
		wrapper.vm.performAction(actionEdit);
		expect(wrapper.vm.editElement).toHaveBeenCalled();

		wrapper.vm.performAction(actionDelete);
		expect(wrapper.vm.deleteBranch).toHaveBeenCalled();
	});

	it('should have a function to add a child to the assumed tree element', async () => {
		wrapper.vm.performAction = jest.fn(wrapper.vm.performAction);
		// const supportedElement = elFactory.getSupportedElement(mockProps.type);
		const assumedElement = elFactory.findElementByID(state.treeData, mockProps.id) as SupportedHTMLElement;
		const card = 'CreateChildElementCard';
		const data = { activeElement: assumedElement };
		const payload1 = { card, data };
		const assumedChildren = assumedElement.getElementChildren()[0]
		modalResult = { alias: 'foobar', type: assumedChildren };
		const newEl = elFactory.createTreeElement(modalResult.type, modalResult.alias);
		const payload2 = { newElement: newEl, parentID: mockProps.id };
		await wrapper.vm.addChild();
		expect(wrapper.vm.addChild).toBeDefined();
		expect(typeof wrapper.vm.addChild).toEqual('function');
		expect(dispatch).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith('setModal', payload1);
		expect(dispatch).toHaveBeenCalledWith('addChild', payload2);
	});

	it('should have a function to copy the branch of the element tree where the assumed element is the head', () => {
		const flatBranch = elFactory.copyBranch(state.treeData, mockProps.id);
		const parentid = mockProps.parentid;
		const payload = { branch: flatBranch, parentID: parentid };
		wrapper.vm.copyBranch();
		expect(wrapper.vm.copyBranch).toBeDefined();
		expect(typeof wrapper.vm.copyBranch).toEqual('function');
		expect(dispatch).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith('addBranch', payload);
	});

	it('should have a function for deleting a branch with the assumed tree element as the branch root', () => {
		// const treeData = _DEFAULT_STATE_.treeData;
		const idToRemove = mockProps.id;
		const parentid = mockProps.parentid;
		const payload = {
			idToRemove,
			parentid
		};
		wrapper.vm.deleteBranch();
		expect(wrapper.vm.deleteBranch).toBeDefined();
		expect(typeof wrapper.vm.deleteBranch).toEqual('function');
		expect(dispatch).toHaveBeenCalledWith('deleteBranch', payload);
	});

	it('should have a function for editing an element and opening the corresponding modal card', async () => {
		const cardToOpen = 'EditTreeElementCard'; // this is hard-coded; adjust according to what is in the tested function
		const props = wrapper.props();
		const initAlias = wrapper.vm.alias;
		const initAttributes = wrapper.vm.initAttributes;
		const data = {
			alias: props.alias,
			attributes: props.attributes
		}
		const modalPayload = {
			alias: initAlias,
			attributes: initAttributes
		};
		await wrapper.vm.editElement();

		expect(wrapper.vm.editElement).toBeDefined();
		expect(typeof wrapper.vm.editElement).toEqual('function');
	});

	// Props
	it('should have a prop for the type of the assumed tree element', () => {
		const props = wrapper.props();
		expect(props.type).toEqual(mockProps.type);
		expect(typeof props.type).toEqual('string');
	});

	it('should have a prop for the alias of the assumed tree element', () => {
		const props = wrapper.props();
		expect(props.alias).toEqual(mockProps.alias);
		expect(typeof props.alias).toEqual('string');
	});

	it('should have a prop for the id of the tree assumed element', () => {
		const props = wrapper.props();
		expect(props.id).toEqual(mockProps.id);
		expect(typeof props.id).toEqual('string');
	});

	it('should have a prop for the child elements of the assumed tree element', () => {
		const props = wrapper.props();
		expect(props.children).toEqual(mockProps.children);
		expect(Array.isArray(props.children)).toBeTruthy();
	});

	it('should have a prop for the parent id of the assumed tree element', () => {
		const props = wrapper.props();
		expect(props.parentid).toEqual(mockProps.parentid);
		expect(typeof props.parentid).toEqual('string');
	});

	it('should have a prop for attributes associated with the assumed tree element', () => {
		const props = wrapper.props();
		expect(props.attributes).toEqual(mockProps.attributes);
		expect( Array.isArray(props.attributes)).toBeTruthy();
	});

	it('should have a prop for determining if the assumed tree element is a root element', () => {
		const props = wrapper.props();
		expect(props.isRoot).toEqual(mockProps.isRoot);
		expect(typeof props.isRoot).toEqual('boolean');
	});


});
