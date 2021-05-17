/* eslint-disable */
import iTreeElement from '@/interfaces/iTreeElement';
import DefaultStateIndex from '@/constants/DefaultState';
import iAppState from '@/interfaces/iAppState';

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

	setValidChildren: (state: iAppState, validChildren: Array<string>): void => { // TODO unit test
		state.validChildren = validChildren;
	},

	setModalCB: (state: iAppState, modalcb: Function): void => {
		state.modalcb = modalcb;
	},

	setActiveElementID: (state: iAppState, elementID: string): void => {
		state.activeElementID = elementID;
	},
};
