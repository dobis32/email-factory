import ElementTreeFactory from '@/classes/ElementTreeFactory';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';

export default interface iAppState {
    treeData: Array<SupportedHTMLElement>,
    modalState: boolean,
    activeModal: string,
    modalCanSubmit: boolean,
    modalcb: Function,
    modalData: any,
    elementTreeFactory: ElementTreeFactory
}