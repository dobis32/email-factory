/* eslint-disable */
import iTreeElement from '@/interfaces/iTreeElement';

export default {
	getElementTree: (state: any) => {
		return state.treeData;
	},
	getModalState: (state: any) => {
		return state.modalState;
	},
	getActiveModal: (state: any) => {
		return state.activeModal;
	},
	getModalCB: (state: any) => {
		return state.modalcb;
	},
	getElementID: (state: any) => {
		return state.treeFactory.getNewElementID();
	},
};
