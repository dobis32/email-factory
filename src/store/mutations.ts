/* eslint-disable */
import iTreeElement from '@/interfaces/iTreeElement';

export default {
	updateTreeData: (state: any, updatedTreeData: Array<iTreeElement>): void => {
		state.treeData = updatedTreeData;
	},

	updateModalState: (state: any, updatedState: boolean): void => {
		state.modalState = updatedState;
	},

	resetModalCard: (state: any): void => {
		state.activeModal = '';
	},

	setModalCard: (state: any, modalCard: string): void => {
		state.activeModal = modalCard;
	},

	resetModalCB: (state: any): void => {
		state.modalcb = () => {
			return;
		};
	},

	setModalCB: (state: any, modalcb: Function): void => {
		state.modalcb = modalcb;
	},

	getModalCB: (state: any): void => {
		state.modalcb;
	}
};
