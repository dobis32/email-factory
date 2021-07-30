/* eslint-disable */
import CodeModule from '@/classes/CodeModule';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import iAppState from '@/interfaces/iAppState';
import iNode from '@/interfaces/iNode';

export default {
	setTreeData: (state: iAppState, updatedTreeData: Array<SupportedHTMLElement>): void => {
		const activeModule = state.activeModule as CodeModule;
		activeModule.setModuleTreeData(updatedTreeData);
		state.activeModule = activeModule;
		
	},

	setBuiltTree: (state: iAppState, newBuiltTree: Array<iNode>): void => {
		state.builtTree = newBuiltTree;
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
	
	modalCanSubmit: (state: iAppState, canSubmit: boolean): void => {
		state.modalCanSubmit = canSubmit;
	},

	setActiveCodeModule: (state: iAppState, activeModule: CodeModule): void => {
		state.activeModule = activeModule;
	}
};
