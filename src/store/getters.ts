import ElementTreeFactory from "@/classes/ElementTreeFactory";
import iModalPayload from "@/interfaces/iModalPayload";

/* eslint-disable */
export default {
	getTreeData: (state: any) => {
		return state.treeData;
	},
	getBuiltTree: (state: any) => {
		console.log('get the built tree');
		return ElementTreeFactory.buildTree(state.treeData);
	},
	getModalPayload: (state: any) => {
		const payload = {
			modalState: state.modalState,
			activeModal: state.activeModal,
			activeElement: state.activeElement,
			modalcb: state.modalcb,
			validChildren: state.validChildren
		} as iModalPayload;

		return payload;
	}
};
