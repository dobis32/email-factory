import { mount, shallowMount, flushPromises } from '@vue/test-utils';
import TreeElement from '@/components/TreeElement.vue';
import iTreeElement from '@/interfaces/iTreeElement';
import iAddSiblingPayload from '@/interfaces/iAddSiblingPayload';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import SUPPORTED_HTML_ELEMENTS from '@/constants/SupportedHTMLElementTypes';

const elFactory = new ElementTreeFactory(SUPPORTED_HTML_ELEMENTS);
describe('TreeElement.vue', () => {
	const mockChildren: Array<iTreeElement> = [
		{
			id: 'bar',
			root: false,
			type: 'tr',
			alias: 'rootTR',
			children: [
				{
					id: 'fizz',
					root: false,
					type: 'td',
					alias: 'rootTD',
					children: [
						{
							id: 'buzz',
							root: false,
							type: 'p',
							alias: 'rootP',
							children: []
						}
					]
				}
			]
		}
	];
	const getNumberOfElementsInTree = function(elementTree: Array<iTreeElement>) {
		let elements: number = 0;

		const adder = (el: iTreeElement, n: number) => {
			elements++;
			return el.children.forEach(adder);
		};

		elementTree.forEach(adder);

		return elements;
	};
	const mockType = 'table';
	const mockAlias = 'rootTable';
	const mockid = 'elementid';
	const mockParentid = 'parentid';
	const mockProps = {
		root: false,
		type: mockType,
		alias: mockAlias,
		id: mockid,
		children: mockChildren,
		parentid: mockParentid
	};
	const numberOfChildren = getNumberOfElementsInTree(mockChildren);
	const mockTreeElement = 'tree-element';
	let wrapper: any;
	let dispatch: any;
	let state: any;
	let $store: any;

	beforeEach(() => {
		dispatch = jest.fn();

		state = {
			nonceFactory: {
				getNonce: jest.fn(()=>{ return 'mockNonce' })
			}
		};

		$store = {
			state,
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
				provide: { getTreeFactoryInstance: () => {
					return elFactory; }
				}
			}
		});

		flushPromises();
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

	it('should have two buttons for adding a sibling tree element to any given element of the assumed element tree', () => {
		expect(wrapper.findAll('.add-button').length).toEqual(2 + numberOfChildren * 2);
	});

	it('should render the assumed tree element and all child tree elements to the DOM', () => {
		expect(wrapper.findAll(`.tree-element`).length).toEqual(1 + numberOfChildren);
	});

	it('should call the method to add a sibling before the assumed tree element when the corresponding DOM element is clicked', () => {
		wrapper.vm.addSiblingBefore = jest.fn();
		wrapper.find('#add-before').trigger('click');
		expect(wrapper.vm.addSiblingBefore).toHaveBeenCalled();
	});

	it('should call the method to add a sibling after the assumed tree element when the corresponding DOM element is clicked', () => {
		wrapper.vm.addSiblingAfter = jest.fn();
		wrapper.find('#add-after').trigger('click');
		expect(wrapper.vm.addSiblingAfter).toHaveBeenCalled();
	});

	// Method
	it('should have a method for getting credentials for a new tree element', () => {
		expect(wrapper.vm.getNewElementCredentials).toBeDefined();
		expect(typeof wrapper.vm.getNewElementCredentials).toEqual('function');
	});

	it('should have a method for adding a sibbling tree element before the assumed tree element', () => {
		wrapper.vm.addSibling = jest.fn(wrapper.vm.addSibling);
		wrapper.vm.addSiblingBefore();

		expect(wrapper.vm.addSiblingBefore).toBeDefined();
		expect(typeof wrapper.vm.addSiblingBefore).toEqual('function');
		expect(wrapper.vm.addSibling).toHaveBeenCalledWith(true);
	});


	// TODO: make this miserable piece of shit pass
	// it('should have a method for adding a sibling to the assumed tree element', async () => {
	// 	const mockType = 'tr';
	// 	const mockAlias = 'new-tr';
	// 	const mockPre = true;

	// 	wrapper.vm.getNewElementCredentials = jest.fn(() => {
	// 		return Promise.resolve({ type: mockType, alias: mockAlias });
	// 	});

	// 	const mockNewEl: iTreeElement = {
	// 		id: elFactory.getNewElementID(),
	// 		root: false,
	// 		type: mockType,
	// 		alias: mockAlias,
	// 		children: []
	// 	};
	// 	const mockPayload: iAddSiblingPayload = {
	// 		elementToAdd: mockNewEl,
	// 		parentid: mockParentid,
	// 		pre: mockPre
	// 	};

	// 	await wrapper.vm.addSibling(mockPre);

	// 	expect(wrapper.vm.addSibling).toBeDefined();
	// 	expect(typeof wrapper.vm.addSibling).toEqual('function');
	// 	expect(dispatch).toHaveBeenCalledWith('addElementSibling', mockPayload);
	// });

	// TODO: make this OTHER miserable PIECE OF SHIT pass
	// it('should know to create a root sibbling if the assumed tree element is a root', async () => {
	// 	const mockType = 'table';
	// 	const mockAlias = 'new-table';
	// 	const mockPre = true;
	// 	let newProps = { ...mockProps };
	// 	newProps.root = true;
	// 	wrapper = mount(TreeElement, {
	// 		data: () => {
	// 			return {
	// 				treeElementClass: mockTreeElement
	// 			};
	// 		},
	// 		props: newProps,
	// 		global: {
	// 			mocks: { $store },
	// 			provide: {}
	// 		}
	// 	});

	// 	wrapper.vm.getNewElementID = jest.fn(() => {
	// 		return 'mockElementID';
	// 	});
	// 	wrapper.vm.getNewElementCredentials = jest.fn(() => {
	// 		return Promise.resolve({ type: mockType, alias: mockAlias });
	// 	});

	// 	const mockRootEl: iTreeElement = {
	// 		id: wrapper.vm.getNewElementID(),
	// 		root: true,
	// 		type: mockType,
	// 		alias: mockAlias,
	// 		children: []
	// 	};
	// 	const mockPayload: iAddSiblingPayload = {
	// 		elementToAdd: mockRootEl,
	// 		parentid: mockParentid,
	// 		pre: mockPre
	// 	};
	// 	await wrapper.vm.addSibling(mockPre);

	// 	expect(wrapper.vm.addSibling).toBeDefined();
	// 	expect(typeof wrapper.vm.addSibling).toEqual('function');
	// 	expect(dispatch).toHaveBeenCalledWith('addElementSibling', mockPayload);
	// });

	it('should not add a sibling to the assumed tree element if the type or alias credentials are not valid', () => {
		wrapper.vm.getNewElementCredentials = jest.fn(async () => {
			return { type: '', alias: '' };
		});
		wrapper.vm.addSibling(true);
		expect(dispatch).toHaveBeenCalledTimes(0);
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
});
