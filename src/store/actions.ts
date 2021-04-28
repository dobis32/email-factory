/* eslint-disable */
import iAddSiblingPayload from '@/interfaces/iAddSiblingPayload';
import iTreeElement from '@/interfaces/iTreeElement';
export default {
	addElementSibling: (context: any, payload: iAddSiblingPayload) => {
		const { elementToAdd, parentid, pre, factory } = payload;
		const treeAsArray = factory.getTreeAsArray(context.state.treeData);
		const parentEl = factory.findElementByID(treeAsArray, parentid) as iTreeElement;
		const updatedTree = factory.addElementSibling(parentEl, elementToAdd, pre);
		context.commit('updateTreeData', context.state.treeData);
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
