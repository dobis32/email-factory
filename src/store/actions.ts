/* eslint-disable */
import iAddElementPayload from '@/interfaces/iAddElementPayload';
import iTreeElement from '@/interfaces/iTreeElement';
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
	setActiveElement: (context: any, el: iTreeElement): void => {
		context.commit('setActiveElement', el ? el : {} as iTreeElement);
		
	},
	resetActiveElement: (context: any): void => {
		context.commit('setActiveElement', _DEFAULT_STATE_.activeElement);
	},
	performAction: (context: any): void => {
		console.log('FOOBAR')
	}	
};
