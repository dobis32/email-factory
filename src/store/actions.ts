/* eslint-disable */
import iAddSiblingPayload from '@/interfaces/iAddSiblingPayload';

export default {
	addElementSibling: (context: any, payload: iAddSiblingPayload) => {
		context.commit('addTreeElement', payload);
	},
	closeModal: (context: any) => {
		context.commit('updateModalState', false);
		context.commit('resetModalCard');
	},

	openModal: (context: any, modalCard: string) => {
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
