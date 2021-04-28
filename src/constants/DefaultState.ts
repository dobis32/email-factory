import { HTML_TABLE, HTML_TR, HTML_TD, HTML_P } from '@/constants/SupportedHTMLElementTypes';
import HTMLAttribute from '@/classes/HTMLAttribute';
import iTreeElement from '@/interfaces/iTreeElement';
export default {
    treeData: [
        {
            id: 'foo',
            root: true,
            element: HTML_TABLE,
            alias: 'rootTable',
            attributes: new Array<HTMLAttribute>(),
            children: [
                {
                    id: 'bar',
                    root: false,
                    element: HTML_TR,
                    alias: 'rootTR',
                    attributes: new Array<HTMLAttribute>(),
                    children: [
                        {
                            id: 'fizz',
                            root: false,
                            element: HTML_TD,
                            alias: 'rootTD',
                            attributes: new Array<HTMLAttribute>(),
                            children: [
                                {
                                    id: 'buzz',
                                    root: false,
                                    element: HTML_P,
                                    alias: 'rootP',
                                    attributes: new Array<HTMLAttribute>(),
                                    children: [] as Array<iTreeElement>
                                }
                            ] as Array<iTreeElement>
                        }
                    ] as Array<iTreeElement>
                }
            ] as Array<iTreeElement>
        }
    ] as Array<iTreeElement>,
    modalState: false,
    activeModal: '',
    modalcb: (): void => { return; }
}