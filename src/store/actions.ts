/* eslint-disable */
import _DEFAULT_STATE_ from '@/constants/DefaultState';
import iTreeElement from '@/interfaces/iTreeElement';
import iHTMLAttribute from '@/interfaces/iHTMLAttribute';

export default {
	closeModal: (context: any) => {
		context.commit('setModalState', false);
		context.commit('setModalCard', _DEFAULT_STATE_.activeModal);
	},
	openModal: (context: any) => {
		context.commit('setModalState', true);
	},
	setModal: (context: any, payload: { card: string, data: any }): void => {
		const { card, data } = payload;
		context.commit('setModalCard', card);
		context.commit('setModalData', data);
	},
	resetModalCallback: (context: any): void => {
		context.commit('setModalCallback', _DEFAULT_STATE_.modalcb);
	},
	setModalCallback: (context: any, cb: Function) : void => {
		context.commit('setModalCallback', cb);
	},
	addBranch: (context: any, payload: {branch: Array<iTreeElement>, parentID: string | undefined}): void => {
		const { branch, parentID } = payload;
		const treeData = context.state.treeData;
		if (parentID) {
			const parent = treeData.find((el: iTreeElement) => el.id == parentID);
			if (parent === undefined) throw new Error(`[ Store Actions ] Failed to add branch. Parent element with ID ${parentID} not found`);
			parent.children.push(branch[0].id); // This assumes the head node is at index 0
		}
		const newData = [ ...treeData, ...branch ];
		context.commit('setTreeData', newData);
	},
	addChild: (context: any, payload: {newElement: iTreeElement, parentID: string}): void => {
		const { newElement, parentID } = payload;
		const treeData = context.state.treeData;
		const parent = treeData.find((el: iTreeElement) => el.id == parentID);
		if (parent === undefined) throw new Error(`[ Store Actions ] Failed to add child. Parent element with ID ${parentID} not found`);
		parent.children.push(newElement.id);
		const newData = [ ...treeData, newElement ];
		context.commit('setTreeData', newData);
	},
	deleteBranch: (context: any, payload: { idToRemove: string, parentid?: string }) : void => {
		const { idToRemove, parentid } = payload;
		const treeData = context.state.treeData;
		const updatedTreeData = context.state.elementTreeFactory.deleteBranch(treeData, idToRemove, parentid);
		context.commit('setTreeData', updatedTreeData);
	},
	updateElement: (context: any, payload: { eid: string, alias: string, attributes: Array<iHTMLAttribute>}): void => {
		const { eid, alias, attributes } = payload;
		const treeData = context.state.treeData;
		const target = treeData.find((el: iTreeElement) => el.id === eid);
		target.alias = alias;
		target.attributes = attributes;
		const updatedTreeData = [ ...treeData ];
		context.commit('setTreeData', updatedTreeData);
	},
	modalCanSubmit: (context: any, submit: boolean): void => {
		context.commit('modalCanSubmit', submit);
	},

};
