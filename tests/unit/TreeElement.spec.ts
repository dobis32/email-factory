import { mount, shallowMount, flushPromises } from '@vue/test-utils';
import TreeElement from '@/components/TreeElement.vue';
import iTreeElement from '@/interfaces/iTreeElement';

describe('TreeElement.vue', () => {
	const mockChildren: Array<iTreeElement> = [
		{
			type: 'tr',
			alias: 'rootTR',
			id: 'bar',
			children: [
				{
					type: 'td',
					id: 'fizz',
					alias: 'rootTD',
					children: [
						{
							type: 'p',
							alias: 'rootP',
							id: 'buzz',
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
	const mockProps = {
		type: 'table',
		alias: 'rootTable',
		id: 'foo',
		children: mockChildren
	};
	const numberOfChildren = getNumberOfElementsInTree(mockChildren);
	const mockTreeElement = 'tree-element';
	let wrapper: any;
	beforeEach(() => {
		wrapper = mount(TreeElement, {
			data: () => {
				return {
					treeElementClass: mockTreeElement
				};
			},
			props: mockProps,
			global: {
				mocks: {},
				provide: {}
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

	// Props
	it('should have a component variable for the type of the assumed tree element', () => {
		expect(wrapper.vm.type).toEqual(mockProps.type);
	});

	it('should have a component variable for the alias of the assumed tree element', () => {
		expect(wrapper.vm.alias).toEqual(mockProps.alias);
	});

	it('should have a component variable for the id of the tree assumed element', () => {
		expect(wrapper.vm.id).toEqual(mockProps.id);
	});

	it('should have a component variable for the child elements of the assumed tree element', () => {
		expect(wrapper.vm.children).toEqual(mockProps.children);
		expect(Array.isArray(wrapper.vm.children)).toBeTruthy();
	});
});
