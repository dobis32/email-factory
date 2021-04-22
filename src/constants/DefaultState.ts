import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
import supported from '../constants/SupportedHTMLElementTypes';
import { HTML_TABLE, HTML_TR, HTML_TD, HTML_P } from '@/constants/SupportedHTMLElementTypes';
export default {
    treeData: [
        {
            id: 'foo',
            root: true,
            element: HTML_TABLE,
            alias: 'rootTable',
            children: [
                {
                    id: 'bar',
                    root: false,
                    element: HTML_TR,
                    alias: 'rootTR',
                    children: [
                        {
                            id: 'fizz',
                            root: false,
                            element: HTML_TD,
                            alias: 'rootTD',
                            children: [
                                {
                                    id: 'buzz',
                                    root: false,
                                    element: HTML_P,
                                    alias: 'rootP',
                                    children: []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    modalState: false,
    activeModal: '',
    modalcb: () => { return; }
}