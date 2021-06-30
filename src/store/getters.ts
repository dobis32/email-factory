import ElementTreeFactory from "@/classes/ElementTreeFactory";
import iModalPayload from "@/interfaces/iModalPayload";

/* eslint-disable */
export default {
	getTreeData: (state: any) => {
		return state.treeData;
	},
	getBuiltTree: (state: any) => {
		return state.elementTreeFactory.buildTree(state.treeData);
	},
	getModalPayload: (state: any) => {
		return {
			modalState: state.modalState,
			activeModal: state.activeModal,
			modalcb: state.modalcb,
			modalData: state.modalData
		} as iModalPayload;
	}
};
