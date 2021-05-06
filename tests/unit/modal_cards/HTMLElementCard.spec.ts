import { mount } from '@vue/test-utils';
import HTMLElementCard from '@/components/modal_cards/HTMLElementCard.vue';
import { HTML_TD } from '@/constants/SupportedHTMLElementTypes';
describe('HTMLElementCard.vue', () => {
    let cb: Function;
    let validChildren: Array<string>;
    let siblingType: string;
	let wrapper: any;
    let stopPropagation: Function;
    let provide: any;
    let dispatch: Function;
    let $store: any;

	beforeEach(() => {
        cb = jest.fn(() => {
            return;
        });

        validChildren = HTML_TD.getValidChildren();

        stopPropagation = jest.fn((e: Event) => { e.stopPropagation() });

        provide = { stopPropagation };

        dispatch = jest.fn();

        $store = {
            dispatch,
        }

		wrapper = mount(HTMLElementCard, {
			data: () => {
				return {};
			},
			props: {
				cb,
                validChildren,
                siblingType
			},
			global: {
				mocks: { $store },
				provide
			}
		});
	});

    // Data
    it('should have a component variable that dictates if the input data on the card is being submitted (the default value should be "false")', () => {
        expect(wrapper.vm.submitting).toEqual(false);
        expect(typeof wrapper.vm.submitting).toEqual('boolean');
    });

	// DOM
    it('should call the provided "stopPropagation" function when the #modal-card is called', () => {
        wrapper.find('#modal-card').trigger('click');
        expect(wrapper.find('#modal-card').exists()).toBeTruthy();
        expect(stopPropagation).toHaveBeenCalled();
    });

    it('should have a submit button that triggers the "submitData" function when clicked', () => {
        wrapper.vm.submitData = jest.fn();
        wrapper.find('#submit-button').trigger('click');
        expect(wrapper.find('#submit-button').exists()).toBeTruthy();
        expect(wrapper.vm.submitData).toHaveBeenCalled();
    });

    // Hooks
    it('should reset the "elementAlias" component variable if the submitting variable is false upon beforeUnmount hook', () => {
        const initSubmitting = wrapper.vm.submitting;
        wrapper.vm.elementAlias = 'foobar';
        wrapper.unmount();
        expect(initSubmitting).toEqual(false);
        expect(wrapper.vm.elementAlias).toEqual('');
    });

    it('should not reset the "elementAlias" component variable if the submitting variable is true upon unmount/beforeUnmount hook', () => {
        const alias = 'foobar';
        wrapper.vm.submitting = true;
        const initSubmitting = wrapper.vm.submitting;
        wrapper.vm.elementAlias = alias;
        wrapper.unmount();
        expect(initSubmitting).toEqual(true);
        expect(wrapper.vm.elementAlias).toEqual(alias);
    });

    it('should call the callback function upon unmount/beforeUnmount', () => {
        const alias = 'foobar';
        wrapper.vm.submitting = true;
        wrapper.vm.elementAlias = alias;
        wrapper.unmount();
        expect(cb).toHaveBeenCalled();
        expect(cb).toHaveBeenCalledWith({ alias })
    });

    it('should dispatch the "resetModalCB" action to the store', () => {
        const targetAction = "resetModalCB";
        wrapper.unmount();
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(targetAction);
    });

    // Props
    it('should have a prop for the modal callback function', () => {
        const props = wrapper.props()
        expect(props.cb).toBeDefined();
        expect(typeof props.cb).toEqual('function');
        expect(props.cb).toEqual(cb);
    });

    it('should have a prop that provides an array containing the valid child element types of the parent element', () => {
        const props = wrapper.props();
        expect(props.validChildren).toBeDefined();
        expect(Array.isArray(props.validChildren)).toEqual(true);
        expect(props.validChildren).toEqual(HTML_TD.getValidChildren());
    });

    // Methods
    it('should have a stopPropagation function provided', () => {
        expect(wrapper.vm.stopPropagation).toBeDefined();
        expect(wrapper.vm.stopPropagation).toEqual(provide.stopPropagation);
    });

    it('should have a function for submitting data', () => {
        expect(wrapper.vm.submitData).toBeDefined();
        expect(typeof wrapper.vm.submitData).toEqual('function');
    });

    it('should set the "submitting" component variable to "true" when submitting data', () => {
        expect(wrapper.vm.submitting).toBeDefined();
        expect(typeof wrapper.vm.submitting).toEqual('boolean');
    });

    it('should close the modal when submitting data', () => {
        wrapper.vm.submitData();
        expect(dispatch).toHaveBeenCalledWith('closeModal');
    });
});
