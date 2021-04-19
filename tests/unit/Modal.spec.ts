import { mount, shallowMount } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';
import TreeElement from '@/components/TreeElement.vue';
import iTreeElement from '@/interfaces/iTreeElement';

describe('Modal.vue', () => {
    let wrapper: any;
    let mockModalState: boolean = true;
    let mockActiveModal: string = 'AddElementCard';
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
        // this test was written under the pretense that the mockActiveModal variable is set to 'AddElementCard'
        expect(mockActiveModal).toEqual('AddElementCard');
        expect(wrapper.findComponent({ name: mockActiveModal }).exists()).toBeTruthy();

    });

    it('should call the component method to close the modal when the #modal-wrapper is clicked', () => {
        wrapper.vm.closeModal = jest.fn();
        wrapper.find('#modal-wrapper').trigger('click')
        expect(wrapper.vm.closeModal).toHaveBeenCalled();
    });

	// Props
    it('should have a prop for the active modal state', () => {
        expect(wrapper.vm.activeState).toBeDefined();
        expect(typeof wrapper.vm.activeState).toEqual('boolean');
        expect(wrapper.vm.activeState).toEqual(mockModalState);
    });

    it('should have a props for the active modal card', () => {
        expect(wrapper.vm.activeModal).toBeDefined();
        expect(typeof wrapper.vm.activeModal).toEqual('string');
        expect(wrapper.vm.activeModal).toEqual(mockActiveModal);
    });

    it('should have a prop for the modal callback function', () => {
        expect(wrapper.vm.cb).toBeDefined();
        expect(typeof wrapper.vm.cb).toEqual('function');
        expect(wrapper.vm.cb).toEqual(mockModalCB);
    });

    // Methods
    it('should have a function for closing the modal', () => {
        wrapper.vm.closeModal();
        expect(wrapper.vm.closeModal).toBeDefined();
        expect(typeof wrapper.vm.closeModal).toEqual('function');
        expect($store.dispatch).toHaveBeenCalled();
    });
});
