import { mount } from '@vue/test-utils';
import TreeElementControlsCard from '@/components/modal_cards/TreeElementControlsCard.vue';
import iTreeElement from '@/interfaces/iTreeElement';
import _DEFAULT_STATE_ from '@/constants/DefaultState';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';

describe('TreeElementControlsCard.vue', () => {
    let mockcb: Function;
    let mockActiveElement: SupportedHTMLElement;
    let mockModalData: any;
	let wrapper: any;
    let stopPropagation: Function;
    let provide: any;
    let dispatch: Function;
    let $store: any;
    let mockInitSelectedAction: string;
    let mockInitSubmittingBool: boolean;

	beforeEach(() => {
        mockcb = jest.fn(() => {
            return;
        });

        mockActiveElement = _DEFAULT_STATE_.activeModule.getModuleTreeData()[1];

        mockInitSelectedAction = 'edit';

        mockInitSubmittingBool = false;

        stopPropagation = jest.fn((e: Event) => { e.stopPropagation() });

        provide = { stopPropagation };

        dispatch = jest.fn();

        $store = {
            dispatch,
        }

		wrapper = mount(TreeElementControlsCard, {
			data: () => {
				return {
                    selectedAction: mockInitSelectedAction,
                    submitting: mockInitSubmittingBool
                };
			},
			props: {
                activeElement: mockActiveElement,
				cb: mockcb,
			},
			global: {
				mocks: { $store },
				provide
			}
		});
	});

    // DOM
    it('should select the appropriate action when the "add" button is clicked', () => {
        const targetAction = 'add';
        wrapper.vm.selectAction = jest.fn(wrapper.vm.selectAction);
        wrapper.find('#add-button').exists();
        wrapper.find('#add-button').trigger('click');
        expect(wrapper.vm.selectAction).toHaveBeenCalled();
        expect(wrapper.vm.selectAction).toHaveBeenCalledWith(targetAction);
    });

    it('should select the appropriate action when the "edit" button is clicked', () => {
        const targetAction = 'edit';
        wrapper.vm.selectAction = jest.fn(wrapper.vm.selectAction);
        wrapper.find('#edit-button').exists();
        wrapper.find('#edit-button').trigger('click');
        expect(wrapper.vm.selectAction).toHaveBeenCalled();
        expect(wrapper.vm.selectAction).toHaveBeenCalledWith(targetAction);
    });

    it('should select the appropriate action when the "copy" button is clicked', () => {
        const targetAction = 'copy';
        wrapper.vm.selectAction = jest.fn(wrapper.vm.selectAction);
        wrapper.find('#copy-button').exists();
        wrapper.find('#copy-button').trigger('click');
        expect(wrapper.vm.selectAction).toHaveBeenCalled();
        expect(wrapper.vm.selectAction).toHaveBeenCalledWith(targetAction);
    });

    it('should select the appropriate action when the "delete" button is clicked', () => {
        const targetAction = 'delete';
        wrapper.vm.selectAction = jest.fn(wrapper.vm.selectAction);
        wrapper.find('#delete-button').exists();
        wrapper.find('#delete-button').trigger('click');
        expect(wrapper.vm.selectAction).toHaveBeenCalled();
        expect(wrapper.vm.selectAction).toHaveBeenCalledWith(targetAction);
    });

    it('should have the assumed element alias rendered to the DOM', () => {
        expect(wrapper.find('#element-alias').text()).toEqual(wrapper.props().activeElement.getElementAlias());
    });

    it('should have the assumed element type rendered to the DOM', () => {
        expect(wrapper.find('#element-type').text()).toEqual(wrapper.props().activeElement.getElementType());
    });

    it('should stop event propagation when the modal-card is clicked', () => {
        wrapper.vm.stopPropagation = jest.fn(wrapper.vm.stopPropagation);
        wrapper.find('#modal-card').trigger('click');
        expect(wrapper.vm.stopPropagation).toHaveBeenCalled();
    });

    // Props
    it('should have a prop value for the assumed element', () => {
        const props = wrapper.props();
        expect(props.activeElement).toBeDefined();
        expect(props.activeElement).toEqual(mockActiveElement);
    });

    it('should have a prop value for the modal callback function', () => {
        const props = wrapper.props();
        expect(props.cb).toBeDefined();
        expect(typeof props.cb).toEqual('function');
        expect(props.cb).toEqual(mockcb);
    });

    // Methods
    it('should have a function for stopping event propagation', () => {
        expect(wrapper.vm.stopPropagation).toBeDefined();
        expect(typeof wrapper.vm.stopPropagation).toEqual('function');
    });

    it('should have a function for closing the modal', () => {
        const dispatchCommand = 'closeModal';
        wrapper.vm.closeModal();
        expect(wrapper.vm.closeModal).toBeDefined();
        expect(typeof wrapper.vm.closeModal).toEqual('function');
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(dispatchCommand);
    });

    it('should have a function for selecting an action to be performed on the assumed element', () => {
        const targetAction = 'close';
        wrapper.vm.closeModal = jest.fn(wrapper.vm.closeModal);
        wrapper.vm.selectAction(targetAction);
        expect(mockInitSubmittingBool).toBeFalsy();
        expect(mockInitSelectedAction === 'targetAction').toBeFalsy();
        expect(wrapper.vm.selectAction).toBeDefined();
        expect(typeof wrapper.vm.selectAction).toEqual('function');
        expect(wrapper.vm.submitting).toBeTruthy();
        expect(wrapper.vm.selectedAction).toEqual(targetAction);
    });
});

