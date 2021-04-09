import { mount, shallowMount } from '@vue/test-utils';
import TreeEditor from '@/components/TreeEditor.vue';
import TreeElement from '@/components/TreeElement.vue';
import iTreeElement from '@/interfaces/iTreeElement';

describe('TreeEditor.vue', () => {
	const mockElementTreeData: Array<iTreeElement> = [
		{
			type: 'table',
			alias: 'rootTable',
			id: 'foo',
			children: [
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
				return { root: undefined };
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

	// Data
	it('should have a component variable for the root tree element', () => {
		expect(wrapper.vm.root).toEqual(mockElementTreeData[0]);
	});

	// Props
	it('should have a prop for the assumed element tree', () => {
		expect(wrapper.vm.elementTreeData).toBeDefined();
		expect(Array.isArray(wrapper.vm.elementTreeData)).toBeTruthy();
	});

	it('should render the assumed element tree', () => {
		expect(wrapper.findAllComponents(TreeElement).length).toEqual(numberOfElements);
	});
});
