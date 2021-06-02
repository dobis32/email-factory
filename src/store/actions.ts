/* eslint-disable */
import _DEFAULT_STATE_ from '@/constants/DefaultState'
import iTreeElement from '@/interfaces/iTreeElement'
export default {
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
		context.commit('setActiveElement', el);
	},
	resetActiveElement: (context: any): void => {
		context.commit('setActiveElement', _DEFAULT_STATE_.activeElement);
	},
	setValidChildren: (context: any, validChildren: Array<string>): void => {
		context.commit('setValidChildren', validChildren);
	},
	addBranch: (context: any, branch: Array<iTreeElement>): void => {
		const treeData = context.state.treeData;
		const newData = [ ...treeData, ...branch ];
		console.log('adding branch...');
		context.commit('setTreeData', newData);
	}
};
