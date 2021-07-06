import { mount } from '@vue/test-utils';
import iHTMLAttribute from '@/interfaces/iHTMLAttribute';
import EditableHTMLAttribute from '@/components/modal_cards/modal_elements/EditableHTMLAttribute.vue';

describe('EditableHTMLAttribute.vue', () => {
    let mockName: string;
    let mockValue: string;    
    let mockAttributes: Array<iHTMLAttribute>;
	let wrapper: any;
    let nonEditWrapper: any;
    let dispatch: Function;
    let props: any;
    let $store: any;

	beforeEach(() => {
     

        dispatch = jest.fn();

        mockName = 'new-name'

        mockValue = 'mock-value';

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

        props = {
            name: mockName,
            value: mockValue,
            existingAttributes: mockAttributes
        };

        $store = {
            dispatch,
        }

		wrapper = mount(EditableHTMLAttribute, {
			data: () => {
				return {
                    editing: true
                };
			},
			props,
			global: {
				mocks: { $store }
			}
		});

        nonEditWrapper = mount(EditableHTMLAttribute, {
			data: () => {
				return {
                    editing: false
                };
			},
			props,
			global: {
				mocks: { $store }
			}
		});
	});

    // Data
    it('should have boolean data that determines if the attribute is being edited or not', () => {
        expect(wrapper.vm.editing).toBeDefined();
        expect(typeof wrapper.vm.editing).toEqual('boolean');
    });

    it('should have string data that acts as the new attribute name', () => {
        expect(wrapper.vm.newName).toBeDefined();
        expect(typeof wrapper.vm.newName).toEqual('string');
    });

    it('should have string data that acts as the new attribute value', () => {
        expect(wrapper.vm.newValue).toBeDefined();
        expect(typeof wrapper.vm.newValue).toEqual('string');
    });

	// DOM
    it('should have the name input bound to the new name property', () => {
        const newName = 'updated-name';
        const input = wrapper.find('#name-input');
        input.setValue(newName);
        expect(wrapper.vm.newName).toEqual(newName);
    });

    it('should have the name input bound to the new name property', () => {
        const newValue = 'updated-value';
        const input = wrapper.find('#value-input');
        input.setValue(newValue);
        expect(wrapper.vm.newValue).toEqual(newValue);
    });

    it('should have a button that saves the attribute editing', () => {
        wrapper.vm.save = jest.fn(wrapper.vm.save);
        wrapper.find('#save-btn').trigger('click');
        expect(wrapper.vm.save).toHaveBeenCalled();
    });

    it('should have a button that cancels the attribute editing', () => {
        wrapper.vm.cancel = jest.fn(wrapper.vm.cancel);
        wrapper.find('#cancel-btn').trigger('click');
        expect(wrapper.vm.cancel).toHaveBeenCalled();
    });

    it('should have a button that causes the attribute to be removed', () => {
        wrapper.vm.remove = jest.fn(wrapper.vm.remove);
        wrapper.find('#remove-btn').trigger('click');
        expect(wrapper.vm.remove).toHaveBeenCalled();
    });

    it('should display the attribute name when the attribute is not being edited', () => {
        const heading = nonEditWrapper.find('#att-name-heading');
        expect(heading.exists()).toBeTruthy();
        expect(heading.text()).toEqual(nonEditWrapper.vm.newName);
    });

    it('should have a button that triggers attribute editing', () => {
        nonEditWrapper.vm.edit = jest.fn(wrapper.vm.edit);
        nonEditWrapper.find('#edit-btn').trigger('click');
        expect(nonEditWrapper.vm.edit).toHaveBeenCalled();
    });

    // Props
    it('should have a prop for the attribute name', () => {
        const props = wrapper.props();
        expect(props.name).toBeDefined();
        expect(typeof props.name).toEqual('string');
    });

    it('should have a prop for the attribute value', () => {
        const props = wrapper.props();
        expect(props.value).toBeDefined();
        expect(typeof props.value).toEqual('string');
    });

    it('should have a prop for the existing attribute names', () => {
        const props = wrapper.props();
        expect(props.existingAttributes).toBeDefined();
        expect(Array.isArray(props.existingAttributes)).toBeTruthy();
    });

    // Methods
    it('should have a function for editing the assumed attribute', () => {
        nonEditWrapper.vm.edit();
        expect(nonEditWrapper.vm.edit).toBeDefined();
        expect(typeof nonEditWrapper.vm.edit).toEqual('function');
        expect(nonEditWrapper.emitted()).toHaveProperty('editing');
        expect(nonEditWrapper.emitted()['editing']).toEqual([[true]])
        expect(nonEditWrapper.vm.editing).toEqual(true);
    });


    it('should have a method for saving the attribute data', () => {
        wrapper.vm.newName = 'some-new-name';
        const payload = { name: wrapper.props().name, newName: wrapper.vm.newName, value: wrapper.vm.newValue };
        wrapper.vm.save();
        expect(wrapper.vm.save).toBeDefined();
        expect(typeof wrapper.vm.save).toEqual('function');
        expect(wrapper.emitted()).toHaveProperty('update-attribute');
        expect(wrapper.emitted()['update-attribute']).toEqual([[payload]])
        expect(wrapper.emitted()).toHaveProperty('editing');
        expect(wrapper.emitted()['editing']).toEqual([[false]]);
    });

    it('should have a function that cancels the editing of the assumed elements', () => {
        wrapper.vm.newName = 'asdfasdfasdfa'; // gibberish
        wrapper.vm.newValue = 'zcvapewjrfdsakl' // also gibberish
        wrapper.vm.editing = true;
        wrapper.vm.cancel();
        expect(wrapper.vm.cancel).toBeDefined();
        expect(typeof wrapper.vm.cancel).toEqual('function');
        expect(wrapper.emitted()).toHaveProperty('editing');
        expect(wrapper.emitted()['editing']).toEqual([[false]]);
        expect(wrapper.vm.newName).toEqual(wrapper.props().name);
        expect(wrapper.vm.newValue).toEqual(wrapper.props().value);
        expect(wrapper.vm.editing).toEqual(false);
    });

    it('should have a function that removes the assumed attribute from the associated element', () => {
        wrapper.vm.remove()
        expect(wrapper.vm.remove).toBeDefined();
        expect(typeof wrapper.vm.remove).toEqual('function');
        expect(wrapper.emitted()).toHaveProperty('remove-attribute');
        expect(wrapper.emitted()['remove-attribute']).toEqual([[wrapper.props().name]]);
        expect(wrapper.emitted()).toHaveProperty('editing');
        expect(wrapper.emitted()['editing']).toEqual([[false]]);
    });
});
