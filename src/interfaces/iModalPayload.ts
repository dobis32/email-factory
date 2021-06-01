import iTreeElement from "./iTreeElement";

export default interface iModalPayload {
    modalState: boolean,
    activeModal: string,
    activeElement: iTreeElement,
    modalcb: Function,
    validChildren: Array<string>
}