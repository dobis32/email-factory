import iTreeElement from '@/interfaces/iTreeElement';

export default {
	updateElementTree: (state: any, updatedTree: Array<iTreeElement>) => {
		state.elementTree = updatedTree;
	},

	updateModalState: (state: any, updatedState: boolean) => {
		state.modalState = updatedState;
	},

	resetModalCard: (state: any) => {
		state.activeModal = '';
	},

	setModalCard: (state: any, modalCard: string) => {
		state.activeModal = modalCard;
	}
};
