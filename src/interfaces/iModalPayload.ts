import iTreeElement from "./iElementDescriptor";

export default interface iModalPayload {
    modalState: boolean,
    activeModal: string,
    activeElement: iTreeElement,
    modalcb: Function
}