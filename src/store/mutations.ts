/* eslint-disable */
import iAppState from '@/interfaces/iAppState';
import iTreeElement from '@/interfaces/iTreeElement';

export default {
	setTreeData: (state: iAppState, updatedTreeData: Array<iTreeElement>): void => {
		state.treeData = updatedTreeData;
	},

	setModalState: (state: iAppState, updatedState: boolean): void => {
		state.modalState = updatedState;
	},

	setModalCard: (state: iAppState, modalCard: string): void => {
		state.activeModal = modalCard;
	},

	setModalData: (state: iAppState, modalData: any): void => {
		state.modalData = modalData;
	},

	setModalCallback: (state: iAppState, modalcb: Function): void => {
		state.modalcb = modalcb;
	},
};
