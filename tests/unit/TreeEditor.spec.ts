import { mount } from '@vue/test-utils';
import TreeEditor from '@/components/TreeEditor.vue';
import TreeElement from '@/components/TreeElement.vue';
import iTreeElement from '@/interfaces/iTreeElement';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import SUPPORTED_HTML_ELEMENTS from '@/constants/SupportedHTMLElementTypes';
import { HTML_TR, HTML_TD, HTML_P } from '@/constants/SupportedHTMLElementTypes';
describe('TreeEditor.vue', () => {
	const factory = new ElementTreeFactory(SUPPORTED_HTML_ELEMENTS);
	const getTreeFactoryInstance = () => {
		return factory;
	}
	const mockElementTreeData: Array<iTreeElement> = [
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
				provide: { getTreeFactoryInstance }
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
