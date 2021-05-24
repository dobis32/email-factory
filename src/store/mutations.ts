/* eslint-disable */
import iElementDescriptor from '@/interfaces/iElementDescriptor';
import DefaultStateIndex from '@/constants/DefaultState';
import iAppState from '@/interfaces/iAppState';

export default {
	setTreeData: (state: iAppState, updatedTreeData: Array<iElementDescriptor>): void => {
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

	setActiveElement: (state: iAppState, element: iTreeElement): void => {
		state.activeElement = element;
	},
};
