/* eslint-disable */
import _DEFAULT_STATE_ from '@/constants/DefaultState';
import iHTMLAttribute from '@/interfaces/iHTMLAttribute';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import iAppState from '@/interfaces/iAppState';
import CodeModule from '@/classes/CodeModule';
import { DUMMY_PLACEHOLDER_MODULE } from '@/constants/DefaultCodeModules';
export default {
	closeModal: (context: { state: iAppState, dispatch: Function, commit: Function }) => {
		context.commit('setModalState', false);
		context.commit('setModalCard', _DEFAULT_STATE_.activeModal);
	},
	openModal: (context: { state: iAppState, dispatch: Function, commit: Function }) => {
		context.commit('setModalState', true);
	},
	setModal: (context: { state: iAppState, dispatch: Function, commit: Function }, payload: { card: string, data: any }): void => {
		const { card, data } = payload;
		context.commit('setModalCard', card);
		context.commit('setModalData', data);
	},
	resetModalCallback: (context: { state: iAppState, dispatch: Function, commit: Function }): void => {
		context.commit('setModalCallback', _DEFAULT_STATE_.modalcb);
	},
	setModalCallback: (context: { state: iAppState, dispatch: Function, commit: Function }, cb: Function) : void => {
		context.commit('setModalCallback', cb);
	},
	addBranch: (context: { state: iAppState, dispatch: Function, commit: Function }, payload: {branch: Array<SupportedHTMLElement>, parentID: string | undefined}): void => {
		const { branch, parentID } = payload;
		const treeData: Array<SupportedHTMLElement> = context.state.activeModule.getModuleTreeData();
		if (parentID) {
			const parent: SupportedHTMLElement | undefined = treeData.find((el: SupportedHTMLElement) => el.getElementID() == parentID);
			if (parent === undefined) throw new Error(`[ Store Actions ] Failed to add branch. Parent element with ID ${parentID} not found`);
			parent.getElementChildren().push(branch[0].getElementID()); // This assumes the head node is at index 0
		}
		const newData = [ ...treeData, ...branch ];
		context.dispatch('updateTree', newData);
	},
	addChild: (context: { state: iAppState, dispatch: Function, commit: Function }, payload: {newElement: SupportedHTMLElement, parentID: string}): void => {
		const { newElement, parentID } = payload;
		const treeData = context.state.activeModule.getModuleTreeData();
		const parent: SupportedHTMLElement | undefined = treeData.find((el: SupportedHTMLElement) => el.getElementID() == parentID);
		if (parent === undefined) throw new Error(`[ Store Actions ] Failed to add child. Parent element with ID ${parentID} not found`);
		parent.getElementChildren().push(newElement.getElementID());
		const newData = [ ...treeData, newElement ];
		context.dispatch('updateTree', newData);
	},
	deleteBranch: (context: { state: iAppState, dispatch: Function, commit: Function }, payload: { idToRemove: string, parentid?: string }) : void => {
		const { idToRemove, parentid } = payload;
		const state: iAppState =  context.state;
		const treeData: Array<SupportedHTMLElement> = state.activeModule.getModuleTreeData();
		const updatedTreeData = context.state.elementTreeFactory.deleteBranch(treeData, idToRemove, parentid);
		context.dispatch('updateTree', updatedTreeData);
	},
	updateElement: (context: { state: iAppState, dispatch: Function, commit: Function }, payload: { eid: string, alias: string, attributes: Array<iHTMLAttribute>}): void => {
		const { eid, alias, attributes } = payload;
		const treeData: Array<SupportedHTMLElement> = context.state.activeModule.getModuleTreeData();
		const target = treeData.find((el: SupportedHTMLElement) => el.getElementID() === eid);
		if (!target) throw new Error(`[ Store Actions ] Failed to update element with ID ${eid}`)
		target.setElementAlias(alias);
		target.setElementAttributes(attributes);
		const updatedTreeData = [ ...treeData ];
		context.dispatch('updateTree', updatedTreeData);
	},
	modalCanSubmit: (context: { state: iAppState, dispatch: Function, commit: Function }, submit: boolean): void => {
		context.commit('modalCanSubmit', submit);
	},
	updateTree: (context: { state: iAppState, dispatch: Function, commit: Function }, treeData: Array<SupportedHTMLElement>): void => {
		const f: ElementTreeFactory = context.state.elementTreeFactory;
		const builtTree = f.buildTree(treeData);
		context.commit('setTreeData', treeData);
		context.commit('setBuiltTree', builtTree);

	},
	clearActiveModule: (context: { state: iAppState, dispatch: Function, commit: Function }): void => {
		// const dummyModule: CodeModule = new CodeModule('', '', []);
		context.commit('setActiveCodeModule', DUMMY_PLACEHOLDER_MODULE);
		context.dispatch('updateTree', DUMMY_PLACEHOLDER_MODULE.getModuleTreeData());
	},
	activateModule: (context: { state: iAppState, dispatch: Function, commit: Function }, m: CodeModule): void => {
		const treeData: Array<SupportedHTMLElement> = m.getModuleTreeData();
		context.commit('setActiveCodeModule', m);
		context.dispatch('updateTree', treeData);
	},
};
