import iElementDescriptor from "./iElementDescriptor";
import iTreeElement from '@/interfaces/iTreeElement';
export default interface iAppState {
    treeData: Array<iTreeElement>,
    modalState: boolean,
    activeModal: string,
    modalcb: Function,
    activeElement: iElementDescriptor
}