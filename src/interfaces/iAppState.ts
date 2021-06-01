import iTreeElement from '@/interfaces/iTreeElement';
export default interface iAppState {
    treeData: Array<iTreeElement>,
    modalState: boolean,
    activeModal: string,
    modalcb: Function,
    activeElement: iTreeElement,
    validChildren: Array<string>
}