import { mount, flushPromises } from '@vue/test-utils';
import TreeElement from '@/components/TreeElement.vue';
import iTreeElement from '@/interfaces/iTreeElement';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import _DEFAULT_STATE_ from '@/constants/DefaultState';
import { HTML_TABLE, HTML_P, HTML_TD, HTML_TR } from '@/constants/SupportedHTMLElementTypes';
import iHTMLAttribute from '@/interfaces/iHTMLAttribute';
import { _TESTING_HASH_ } from '@/constants/testing';

const elFactory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_, _TESTING_HASH_);
describe('TreeElement.vue', () => {
	const mockChildren: Array<iTreeElement> = [
		{
			id: 'bar',
			root: false,
			element: HTML_TR,
			alias: 'rootTR',
			children: [
				'fizz'
			],
			attributes: new Array<iHTMLAttribute>()
		},
		{
			id: 'fizz',
			root: false,
			element: HTML_TD,
			alias: 'rootTD',
			children: [
				'buzz'
			],
			attributes: new Array<iHTMLAttribute>()
		},
		{
			id: 'buzz',
			root: false,
			element: HTML_P,
			alias: 'rootP',
			children: [],
			attributes: new Array<iHTMLAttribute>()
		}
	];
	const mockBuiltBranch = elFactory.buildTree(mockChildren);
	const mockElement = HTML_TABLE.getElementType();
	const mockAlias = 'rootTable';
	const mockParentid = _TESTING_HASH_;
	const numberOfChildren = mockChildren.length;
	const mockTreeElement = 'tree-element';
	const mockID = _DEFAULT_STATE_.treeData[0].id;
	let mockProps: any;
	let wrapper: any;
	let dispatch: any;
	let state: any;
	let $store: any;
	let modalResult: any;
	const openModal = () => Promise.resolve(modalResult);
	beforeEach(() => {
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
		wrapper.vm.addChild = jest.fn(wrapper.vm.addChild);
		const action  = 'add';
		wrapper.vm.performAction(action);
		expect(wrapper.vm.performAction).toBeDefined();
		expect(typeof wrapper.vm.performAction).toEqual('function');
		expect(wrapper.vm.addChild).toHaveBeenCalled();
	});

	it('should have a function to add a child to the assumed tree element', async () => {
		wrapper.vm.performAction = jest.fn(wrapper.vm.performAction);
		const supportedElement = elFactory.getSupportedElement(mockProps.type);
		const assumedElement = elFactory.findElementByID(state.treeData, mockProps.id) as iTreeElement;
		const card = 'CreateChildElementCard';
		const data = { activeElement: assumedElement };
		const payload1 = { card, data };
		modalResult = { alias: 'foobar', type: assumedElement.children[0] };
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
