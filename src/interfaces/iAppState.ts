import ElementTreeFactory from '@/classes/ElementTreeFactory';
import iTreeElement from '@/interfaces/iTreeElement';
export default interface iAppState {
    treeData: Array<iTreeElement>,
    modalState: boolean,
    activeModal: string,
    modalcb: Function,
    modalData: any,
    elementTreeFactory: ElementTreeFactory
}