/* eslint-disable */
import iTreeElement from '@/interfaces/iTreeElement';
import DefaultStateIndex from '@/constants/DefaultState';

export default {
	updateTreeData: (state: any, updatedTreeData: Array<iTreeElement>): void => {
		state.treeData = updatedTreeData;
	},

	updateModalState: (state: any, updatedState: boolean): void => {
		state.modalState = updatedState;
	},

	resetModalCard: (state: any): void => {
		state.activeModal = DefaultStateIndex.activeModal;
	},

	setModalCard: (state: any, modalCard: string): void => {
		state.activeModal = modalCard;
	},

	resetModalCB: (state: any): void => {
		state.modalcb = DefaultStateIndex.modalcb
	},

	setModalCB: (state: any, modalcb: Function): void => {
		state.modalcb = modalcb;
	}
};
