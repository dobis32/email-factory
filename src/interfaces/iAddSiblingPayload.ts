import iTreeElement from "./iTreeElement";

export default interface iAddSiblingPayload {
    elementToAdd: iTreeElement,
    parentid: string,
    pre: boolean
}