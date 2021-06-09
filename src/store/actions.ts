/* eslint-disable */
import _DEFAULT_STATE_ from '@/constants/DefaultState';
import IS_ROOT_ELEMENT from '@/constants/IsRootElement';
import iTreeElement from '@/interfaces/iTreeElement';

export default {
	closeModal: (context: any) => {
		context.commit('setModalState', false);
		context.commit('setModalCard', _DEFAULT_STATE_.activeModal);
	},
	openModal: (context: any, modalCard: string) => {
		context.commit('setModalState', true);
		context.commit('setModalCard', modalCard);
	},
	setModalCB: (context: any, modalcb: Function): void => {
		context.commit('setModalCB', modalcb);
	},
	resetModalCB: (context: any): void => {
		context.commit('setModalCB', _DEFAULT_STATE_.modalcb);
	},
	setActiveElement: (context: any, el: iTreeElement): void => {
		context.commit('setActiveElement', el);
	},
	resetActiveElement: (context: any): void => {
		context.commit('setActiveElement', _DEFAULT_STATE_.activeElement);
	},
	setValidChildren: (context: any, validChildren: Array<string>): void => {
		context.commit('setValidChildren', validChildren);
	},
	addBranch: (context: any, payload: {branch: Array<iTreeElement>, parentID: string}): void => {
		const { branch, parentID } = payload;
		const treeData = context.state.treeData;
		const parent = treeData.find((el: iTreeElement) => el.id == parentID);
		if (parentID != IS_ROOT_ELEMENT) {
			if (parent === undefined) throw new Error(`[ Store Actions ] Parent element with ID ${parentID} not found`)
			parent.children.push(branch[0].id); // This assumes the head node is at index 0
		} 
		const newData = [ ...treeData, ...branch ];
		context.commit('setTreeData', newData);
	},
	addChild: (context: any, payload: {newElement: iTreeElement, parentID: string}): void => {
		const { newElement, parentID } = payload;
		const treeData = context.state.treeData;
		const parent = treeData.find((el: iTreeElement) => el.id == parentID);
		if (parentID != IS_ROOT_ELEMENT) {
			if (parent === undefined) throw new Error(`[ Store Actions ] Parent element with ID ${parentID} not found`)
			parent.children.push(newElement.id);
		}
		const newData = [ ...treeData, newElement ];
		context.commit('setTreeData', newData);
	}
};
