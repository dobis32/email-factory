import { mount, shallowMount, flushPromises } from '@vue/test-utils';
import TreeElement from '@/components/TreeElement.vue';
import iTreeElement from '@/interfaces/iTreeElement';
import iAddElementPayload from '@/interfaces/iAddElementPayload';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '@/constants/SupportedHTMLElementTypes';
import _DEFAULT_STATE_ from '@/constants/DefaultState';
import { HTML_TABLE, HTML_P, HTML_TD, HTML_TR } from '@/constants/SupportedHTMLElementTypes';
import HTMLAttribute from '@/classes/HTMLAttribute';
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
				{
					id: 'fizz',
					root: false,
					element: HTML_TD,
					alias: 'rootTD',
					children: [
						{
							id: 'buzz',
							root: false,
							element: HTML_P,
							alias: 'rootP',
							children: [],
							attributes: new Array<HTMLAttribute>()
						}
					],
					attributes: new Array<HTMLAttribute>()
				}
			],
			attributes: new Array<HTMLAttribute>()
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
	const mockElement = HTML_TABLE;
	const mockAlias = 'rootTable';
	const mockParentid = _TESTING_HASH_;
	const numberOfChildren = getNumberOfElementsInTree(mockChildren);
	const mockTreeElement = 'tree-element';
	const mockID = _TESTING_HASH_;
	let mockProps: any;
	let wrapper: any;
	let dispatch: any;
	let state: any;
	let $store: any;
	let mockGetTreeFactoryInstance = () => {
		return elFactory;

	}
	beforeEach(() => {
		mockProps = {
			root: false,
			element: mockElement,
			alias: mockAlias,
			id: _TESTING_HASH_,
			children: mockChildren,
			parentid: mockParentid,
			attributes: new Array<HTMLAttribute>()
		}

		dispatch = jest.fn();

		state = _DEFAULT_STATE_;

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
				provide: { getTreeFactoryInstance: mockGetTreeFactoryInstance }
				
			}
		});

		flushPromises();
	});

	// Data
	it('should concatenate the default tree-element css class with the appropriate element type', () => {
		expect(wrapper.vm.treeElementClass).toEqual(`${mockProps.element.getElementType()} ${mockTreeElement}`);
	});

	// DOM
	it('should have the alias of the assumed tree element rendered to the DOM', () => {
		expect(wrapper.find('#alias').exists()).toBeTruthy();
	});

	it('should have the type of the assumed tree element rendered to the DOM', () => {
		expect(wrapper.find('#type').exists()).toBeTruthy();
	});

	it('should render the assumed tree element and all child tree elements to the DOM', () => {
		expect(wrapper.findAll(`.tree-element`).length).toEqual(1 + numberOfChildren);
	});

	// Method
	it('should have an action for prompting the user for an action', () => {
		wrapper.vm.promptAction();

		expect(wrapper.vm.promptAction).toBeDefined();
		expect(typeof wrapper.vm.promptAction).toEqual('function');
		expect(dispatch).toHaveBeenCalledWith('setActiveElement', {factory: mockGetTreeFactoryInstance(), id: mockProps.id})
		expect(dispatch).toHaveBeenCalledWith('openModal', 'ElementControlsCard');
	});

	// Props
	it('should have a prop for the type of the assumed tree element', () => {
		const props = wrapper.props();
		expect(props.element.getElementType()).toEqual(mockProps.element.getElementType());
		expect(typeof props.element.getElementType()).toEqual('string');
		expect( Array.isArray(props.element.getValidChildren())).toEqual(true);

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
		expect(typeof props.parentid).toEqual('string');
	});
});
