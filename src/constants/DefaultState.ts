import { HTML_TABLE, HTML_TR, HTML_TD, HTML_P } from '@/constants/SupportedHTMLElementTypes';
import SUPPORTED_HTML_ELEMENTS from '@/constants/SupportedHTMLElementTypes';
import iHTMLAttribute from '@/interfaces/iHTMLAttribute';
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
            attributes:  [
                {
                    name: 'width',
                    value: '600'
                }
            ] as Array<iHTMLAttribute>,
            children: [
                'bar'
            ] as Array<string>
        },
        {
            id: 'bar',
            root: false,
            element: HTML_TR,
            alias: 'initTR',
            attributes: new Array<iHTMLAttribute>(),
            children: [
                'fizz'   
            ] as Array<string>
        },
        {
            id: 'fizz',
            root: false,
            element: HTML_TD,
            alias: 'initTD',
            attributes: [
                {
                    name: 'style',
                    value: 'color: #f00;'
                }
            ],
            children: [
                'buzz'
            ] as Array<string>
        },
        {
            id: 'buzz',
            root: false,
            element: HTML_P,
            alias: 'initP',
            attributes: [{
                name: 'style',
                value: 'font-size: 20px; color: #f00; text-decoration: bold;'
            },
            {
                name: 'text',
                value: 'foobar'
            }] as Array<iHTMLAttribute>,
            children: [] as Array<string>
        }
    ]  as Array<iTreeElement>,
    modalState: false,
    activeModal: '',
    modalCanSubmit: true,
    modalcb: (): void => { return; },
    modalData: {},
    elementTreeFactory: new ElementTreeFactory(SUPPORTED_HTML_ELEMENTS)
} as iAppState;