import { HTML_TABLE, HTML_TR, HTML_TD, HTML_P } from '@/constants/SupportedHTMLElementTypes';
import SUPPORTED_HTML_ELEMENTS from '@/constants/SupportedHTMLElementTypes';
import HTMLAttribute from '@/classes/HTMLAttribute';
import iTreeElement from '@/interfaces/iTreeElement';
import iAppState from '@/interfaces/iAppState';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
export default {
    treeData: [
        {
            id: 'foo',
            root: true,
            element: HTML_TABLE,
            alias: 'rootTable',
            attributes: new Array<HTMLAttribute>(),
            children: [
                'bar'
            ] as Array<string>
        },
        {
            id: 'bar',
            root: false,
            element: HTML_TR,
            alias: 'initTR',
            attributes: new Array<HTMLAttribute>(),
            children: [
                'fizz'   
            ] as Array<string>
        },
        {
            id: 'fizz',
            root: false,
            element: HTML_TD,
            alias: 'initTD',
            attributes: new Array<HTMLAttribute>(),
            children: [
                'buzz'
            ] as Array<string>
        },
        {
            id: 'buzz',
            root: false,
            element: HTML_P,
            alias: 'initP',
            attributes: new Array<HTMLAttribute>(),
            children: [] as Array<string>
        }
    ]  as Array<iTreeElement>,
    modalState: false,
    activeModal: '',
    modalcb: (): void => { return; },
    activeElement: {} as iTreeElement,
    validChildren: new Array<string>(),
    elementTreeFactory: new ElementTreeFactory(SUPPORTED_HTML_ELEMENTS)
} as iAppState;