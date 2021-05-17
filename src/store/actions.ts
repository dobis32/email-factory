/* eslint-disable */
import iAddElementPayload from '@/interfaces/iAddElementPayload';
import iTreeElement from '@/interfaces/iTreeElement';
import _DEFAULT_STATE_ from '@/constants/DefaultState';
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
	setActiveElementID: (context: any, id: string): void => {
		context.commit('setActiveElementID', id)
	},
	resetActiveElementID: (context: any, id: string): void => {
		context.commit('setActiveElementID', _DEFAULT_STATE_.activeElementID);
	},
	performAction: (context: any): void => {
		console.log('FOOBAR')
	}	
};
