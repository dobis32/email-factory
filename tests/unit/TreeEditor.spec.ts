import { mount, shallowMount } from '@vue/test-utils';
import TreeEditor from '@/components/TreeEditor.vue';
import TreeElement from '@/components/TreeElement.vue';
import iTreeElement from '@/interfaces/iTreeElement';

describe('TreeEditor.vue', () => {
	const mockElementTreeData: Array<iTreeElement> = [
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
	const numberOfElements = getNumberOfElementsInTree(mockElementTreeData);
	let wrapper: any;
	beforeEach(() => {
		wrapper = mount(TreeEditor, {
			data: () => {
				return {};
			},
			props: {
				elementTreeData: mockElementTreeData
			},
			global: {
				mocks: {},
				provide: {}
			}
		});
	});

	// DOM
	it('should render the assumed element tree', () => {
		expect(wrapper.findAllComponents(TreeElement).length).toEqual(numberOfElements);
	});

	// Props
	it('should have a prop for the assumed element tree', () => {
		const props = wrapper.props();
		expect(props.elementTreeData).toBeDefined();
		expect(Array.isArray(props.elementTreeData)).toBeTruthy();
	});	
});
