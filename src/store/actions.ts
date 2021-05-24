/* eslint-disable */
import iAddElementPayload from '@/interfaces/iAddElementPayload';
import iElementDescriptor from '@/interfaces/iElementDescriptor';
import _DEFAULT_STATE_ from '@/constants/DefaultState';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
export default {
	addTreeElement: (context: any, payload: iAddElementPayload) => { // TODO unit test
		const { elementToAdd, parentid, pre } = payload; 
		const treeData = context.state.treeData
		// const parentEl = factory.findElementByID(treeData, parentid) as iTreeElement;
		// parentEl.children = factory.addChildElement(parentEl, elementToAdd, pre);
		context.commit('setTreeData', context.state.treeData);
	},
	closeModal: (context: any) => {
		context.commit('setModalState', false);
		context.commit('setModalCard', _DEFAULT_STATE_.activeModal);
	},

	openModal: (context: any, modalCard: string) => {
		context.commit('setModalState', true);
		context.commit('setModalCard', modalCard);
	},
	setModalCB: (context: any, modalcb: Function): void => {
		context.commit('setModalCB', modalcb);
	},
	resetModalCB: (context: any): void => {
		context.commit('setModalCB', _DEFAULT_STATE_.modalcb);
	},
	setActiveElement: (context: any, el: iElementDescriptor): void => {
		context.commit('setActiveElement', el ? el : {} as iElementDescriptor);
		
	},
	resetActiveElement: (context: any): void => {
		context.commit('setActiveElement', _DEFAULT_STATE_.activeElement);
	},
	performAction: (context: any): void => {
		console.log('FOOBAR')
	}	
};
