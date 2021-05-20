import iTreeElement from "./iTreeElement";

export default interface iAppState {
    treeData: Array<iTreeElement>,
    modalState: boolean,
    activeModal: string,
    validChildren: Array<string>,
    modalcb: Function,
    activeElement: iTreeElement
}