import iAppState from "@/interfaces/iAppState";
import iModalPayload from "@/interfaces/iModalPayload";

/* eslint-disable */
export default {
	getTreeData: (state: iAppState) => {
		return state.activeModule.getModuleTreeData();
	},
	getBuiltTree: (state: iAppState) => {
		return state.builtTree;
	},
	getModalPayload: (state: iAppState) => {
		return {
			modalState: state.modalState,
			activeModal: state.activeModal,
			modalcb: state.modalcb,
			modalData: state.modalData
		} as iModalPayload;
	},
	getCodeModules: (state: iAppState) => { // TODO unit test
		return state.codeModules;
	},
	getActiveCodeModule: (state: iAppState) => { // TODO unit test
		return state.activeModule;
	}
};
