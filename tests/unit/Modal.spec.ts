import { mount } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';

describe('Modal.vue', () => {
    let wrapper: any;
    let mockModalState: boolean = true;
    let mockActiveModal: string = 'HTMLElementCard'; // tests will definitely break if this value is NOT a valid modal element
    let mockModalCB: Function = () => { return; };
    const stopPropagation = jest.fn((e: Event) => { e.stopPropagation(); })
    const $store = {
        dispatch: jest.fn()
    }
	beforeEach(() => {
		wrapper = mount(Modal, {
			data: () => {
				return {};
			},
			props: {
				activeState: mockModalState,
                activeModal: mockActiveModal,
                cb: mockModalCB
			},
			global: {
				mocks: {
                    $store
                },
				provide: { stopPropagation } // used by child elements (modal cards)
			}
		});
	});

    // DOM
    it('should have a wrapper for the modal', () => {
        expect(wrapper.find('#modal-wrapper').exists()).toBeTruthy();
    });

    it('render the corresponding modal card according to the value of the activeModal prop', () => {
        // this test was written under the pretense that the mockActiveModal variable is set to 'HTMLElementCard'
        expect(wrapper.findComponent({ name: mockActiveModal }).exists()).toBeTruthy();
    });

    it('should call the component method to close the modal when the #modal-wrapper is clicked', () => {
        wrapper.vm.closeModal = jest.fn();
        wrapper.find('#modal-wrapper').trigger('click')
        expect(wrapper.vm.closeModal).toHaveBeenCalled();
    });

	// Props
    it('should have a prop for the active modal state', () => {
        const props = wrapper.props();
        expect(props.activeState).toBeDefined();
        expect(typeof props.activeState).toEqual('boolean');
        expect(props.activeState).toEqual(mockModalState);
    });

    it('should have a props for the active modal card', () => {
        const props = wrapper.props();
        expect(props.activeModal).toBeDefined();
        expect(typeof props.activeModal).toEqual('string');
        expect(props.activeModal).toEqual(mockActiveModal);
    });

    it('should have a prop for the modal callback function', () => {
        const props = wrapper.props();
        expect(props.cb).toBeDefined();
        expect(typeof props.cb).toEqual('function');
        expect(props.cb).toEqual(mockModalCB);
    });

    // Methods
    it('should have a function for closing the modal', () => {
        wrapper.vm.closeModal();
        expect(wrapper.vm.closeModal).toBeDefined();
        expect(typeof wrapper.vm.closeModal).toEqual('function');
        expect($store.dispatch).toHaveBeenCalled();
    });
});
