/* eslint-disable */
import iAddSiblingPayload from '@/interfaces/iAddSiblingPayload';
import iTreeElement from '@/interfaces/iTreeElement';

export default {
	addElementSibling: (context: any, payload: iAddSiblingPayload) => {
		context.commit('addTreeElement', payload);
	},
	closeModal: (context: any) => {
		context.commit('updateModalState', false);
		context.commit('resetModalCard');
	},

	openModal: (context: any, modalCard: string) => {
		console.log('opening modal with card:', modalCard);
		context.commit('updateModalState', true);
		context.commit('setModalCard', modalCard);
	},
	resetModalCB: (context: any): void => {
		context.commit('resetModalCB');
	},
	setModalCB: (context: any, modalcb: Function): void => {
		context.commit('setModalCB', modalcb);
	}
};
