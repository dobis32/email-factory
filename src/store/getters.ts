import iModalPayload from "@/interfaces/iModalPayload";

/* eslint-disable */
export default {
	getTreeData: (state: any) => {
		return state.treeData;
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
