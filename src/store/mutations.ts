/* eslint-disable */
import iAppState from '@/interfaces/iAppState';
import iTreeElement from '@/interfaces/iTreeElement';

export default {
	setTreeData: (state: iAppState, updatedTreeData: Array<iTreeElement>): void => {
		console.log('updating tree data', state.treeData != updatedTreeData)
		state.treeData = updatedTreeData;
	},

	setModalState: (state: iAppState, updatedState: boolean): void => {
		state.modalState = updatedState;
	},

	setModalCard: (state: iAppState, modalCard: string): void => {
		state.activeModal = modalCard;
	},

	setModalCB: (state: iAppState, modalcb: Function): void => {
		state.modalcb = modalcb;
	},

	setActiveElement: (state: iAppState, element: iTreeElement): void => {
		state.activeElement = element;
	},

	setValidChildren: (state: iAppState, validChildren: Array<string>): void => {
		state.validChildren = validChildren;
	},
};
