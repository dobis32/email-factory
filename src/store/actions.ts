/* eslint-disable */
import iAddElementPayload from '@/interfaces/iAddElementPayload';
import iTreeElement from '@/interfaces/iTreeElement';
export default {
	addTreeElement: (context: any, payload: iAddElementPayload) => { // TODO unit test
		const { elementToAdd, parentid, pre } = payload; 
		const treeData = context.state.treeData
		// const parentEl = factory.findElementByID(treeData, parentid) as iTreeElement;
		// parentEl.children = factory.addChildElement(parentEl, elementToAdd, pre);
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
	setValidChildren: (context: any, validChildren: Array<string>) => { // TODO unit test
		context.commit('setValidChildren', validChildren);
	},
	setModalCB: (context: any, modalcb: Function): void => {
		context.commit('setModalCB', modalcb);
	}
};
