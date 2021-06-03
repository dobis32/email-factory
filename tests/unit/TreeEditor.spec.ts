import { mount } from '@vue/test-utils';
import TreeEditor from '@/components/TreeEditor.vue';
import TreeElement from '@/components/TreeElement.vue';
import iTreeElement from '@/interfaces/iTreeElement';
import _DEFAULT_STATE_ from '@/constants/DefaultState';
import _SUPPORTED_HTML_ELEMENTS_ from "@/constants/SupportedHTMLElementTypes";
import ElementTreeFactory from '@/classes/ElementTreeFactory';

describe('TreeEditor.vue', () => {
	let mockElementTree: Array<iTreeElement>;
	const factory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_);
	const getTreeFactoryInstance = () => {
		return factory;
	}
	let numberOfElements: number;
	let wrapper: any;

	beforeEach(() => {
		mockElementTree = _DEFAULT_STATE_.treeData;
		const mockProps =  {
			elementTree: mockElementTree
		}
		wrapper = mount(TreeEditor, {
			
			data: () => {
				return {};
			},
			props: mockProps,
			global: {
				mocks: {},
				provide: { getTreeFactoryInstance }
			}
		});
	});

	// DOM
	

	// Props
	it('should have a prop for the assumed element tree', () => {
		const props = wrapper.props();
		expect(props.elementTree).toBeDefined();
		expect(Array.isArray(props.elementTree)).toBeTruthy();
	});	
});
