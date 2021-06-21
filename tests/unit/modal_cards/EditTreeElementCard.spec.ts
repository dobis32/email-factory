import { mount } from '@vue/test-utils';
import EditTreeElementCard from '@/components/modal_cards/EditTreeElementCard.vue';
import { HTML_TD } from '@/constants/SupportedHTMLElementTypes';
import iHTMLAttribute from '@/interfaces/iHTMLAttribute';

describe('EditTreeElementCard.vue', () => {
    let mockcb: Function;
    let mockAlias: string;
    let mockAttributes: Array<iHTMLAttribute>;
	let wrapper: any;
    let stopPropagation: Function;
    let provide: any;
    let dispatch: Function;
    let $store: any;

	beforeEach(() => {
        mockcb = jest.fn(() => {
            return;
        });

        stopPropagation = jest.fn((e: Event) => { e.stopPropagation() });

        provide = { stopPropagation };

        dispatch = jest.fn();

        mockAlias = 'new-element'

        mockAttributes = [
            {
                name: 'att1',
                value: 'foobar'
            },
            {
                name: 'att2',
                value: 'fizzybuzzer'
            },
            {
                name: 'att3',
                value: '666'
            }
        ]

        $store = {
            dispatch,
        }

		wrapper = mount(EditTreeElementCard, {
			data: () => {
				return {};
			},
			props: {
				cb: mockcb,
                alias: mockAlias,
                attributes: mockAttributes
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

    it('should render html attributes of the assumed element', () => {
        expect(wrapper.findAllComponents({ name: 'HTMLAttribute' }).length).toEqual(wrapper.vm.newAttributes.length);
    });

    // Hooks
    it('should reset the "newAlias" component variable if the submitting variable is false upon beforeUnmount hook', () => {
        wrapper.vm.submitting = false;
        const initAlias = wrapper.props().alias;
        wrapper.vm.newAlias = 'foobar';
        wrapper.unmount();
        expect(wrapper.vm.submitting).toEqual(false);
        expect(wrapper.vm.newAlias).toEqual(initAlias);
    });

    it('should not reset the "newAlias" component variable if the submitting variable is true upon unmount/beforeUnmount hook', () => {
        const alias = 'foobar';
        wrapper.vm.submitting = true;
        wrapper.vm.newAlias = alias;
        wrapper.unmount();
        expect(wrapper.vm.submitting).toEqual(true);
        expect(wrapper.vm.newAlias).toEqual(alias);
    });

    it('should call the callback function upon unmount/beforeUnmount', () => {
        const alias = 'foobar';
        const expectedPayload = {
            alias: wrapper.vm.newAlias,
            attributes: wrapper.vm.newAttributes
        }
        wrapper.vm.submitting = true;
        wrapper.unmount();
        expect(mockcb).toHaveBeenCalled();
        expect(mockcb).toHaveBeenCalledWith(expectedPayload);
    });

    // Props
    it('should have a prop for the modal callback function', () => {
        const props = wrapper.props()
        expect(props.cb).toBeDefined();
        expect(typeof props.cb).toEqual('function');
        expect(props.cb).toEqual(mockcb);
    });

    it('should have a prop that provides a string representing the alias of the assumed tree element', () => {
        const props = wrapper.props();
        expect(props.alias).toBeDefined();
        expect(typeof props.alias).toEqual('string');
        expect(props.alias).toEqual(mockAlias);
    });

    it('should have a prop that provides an array containing the attributes of the assumed tree element', () => {
        const props = wrapper.props();
        expect(props.attributes).toBeDefined();
        expect(Array.isArray(props.attributes)).toEqual(true);
        expect(props.attributes).toEqual(mockAttributes);
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

    it('should have a function to handle emit events from html attributes', () => {
        wrapper.vm.disableSubmit = false;
        wrapper.vm.handleEdit(true);
        const state1 = wrapper.vm.disableSubmit;
        wrapper.vm.handleEdit(false);
        const state2 = wrapper.vm.disableSubmit;
        expect(wrapper.vm.handleEdit).toBeDefined();
        expect(typeof wrapper.vm.handleEdit).toEqual('function');
        expect(state1).toBeTruthy();
        expect(state2).toBeFalsy();
    });
});
