import iModalPayload from "@/interfaces/iModalPayload";

/* eslint-disable */
export default {
	getElementTree: (state: any) => {
		return state.treeData;
	},
	getModalPayload: (state: any) => {
		const payload = {
			modalState: state.modalState,
			activeModal: state.activeModal,
			activeElementID: state.activeElementID,
			modalcb: state.modalcb
		} as iModalPayload;

		return payload;
	}
};
