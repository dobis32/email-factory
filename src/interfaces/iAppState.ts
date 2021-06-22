import ElementTreeFactory from '@/classes/ElementTreeFactory';
import iTreeElement from '@/interfaces/iTreeElement';
export default interface iAppState {
    treeData: Array<iTreeElement>,
    modalState: boolean,
    activeModal: string,
    modalCanSubmit: boolean,
    modalcb: Function,
    modalData: any,
    elementTreeFactory: ElementTreeFactory
}