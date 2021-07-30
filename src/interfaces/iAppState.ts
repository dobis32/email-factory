import CodeModule from '@/classes/CodeModule';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import iNode from '@/interfaces/iNode';

export default interface iAppState {
    codeModules: Array<CodeModule>,
    activeModule: CodeModule,
    builtTree: Array<iNode>,
    modalState: boolean,
    activeModal: string,
    modalCanSubmit: boolean,
    modalcb: Function,
    modalData: any,
    elementTreeFactory: ElementTreeFactory,
}