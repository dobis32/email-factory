import ElementTreeFactory from "@/classes/ElementTreeFactory";
import iModalPayload from "@/interfaces/iModalPayload";

/* eslint-disable */
export default {
	getTreeData: (state: any) => {
		return state.treeData;
	},
	getBuiltTree: (state: any) => {
		console.log('getting built tree', state.treeData);
		return state.elementTreeFactory.buildTree(state.treeData);
	},
	getModalPayload: (state: any) => {
		const payload = {
			modalState: state.modalState,
			activeModal: state.activeModal,
			modalcb: state.modalcb,
			modalData: {
				activeElement: state.activeElement
			}
		} as iModalPayload;

		return payload;
	}
};
