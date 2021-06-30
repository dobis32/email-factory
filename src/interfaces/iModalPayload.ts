import iTreeElement from "./iTreeElement";

export default interface iModalPayload {
    modalState: boolean,
    activeModal: string,
    modalcb: Function,
    modalData: any,
}