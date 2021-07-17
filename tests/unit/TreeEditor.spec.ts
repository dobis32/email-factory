import { mount } from '@vue/test-utils';
import TreeEditor from '@/components/TreeEditor.vue';
import _DEFAULT_STATE_ from '@/constants/DefaultState';
import _SUPPORTED_HTML_ELEMENTS_ from "@/constants/SupportedHTMLElementTypes";
import _VALID_CHILD_INDEX_ from '@/constants/ValidChildIndex';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import iNode from '@/interfaces/iNode';

describe('TreeEditor.vue', () => {
	let mockElementTree: Array<iNode>;
	const factory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_, _VALID_CHILD_INDEX_);
	const openModal = () => {
		return Promise.resolve();
	}
	let wrapper: any;

	beforeEach(() => {
		mockElementTree = _DEFAULT_STATE_.builtTree;
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
				provide: { openModal }
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
