import SUPPORTED_HTML_ELEMENTS from '@/constants/SupportedHTMLElementTypes';
import VALID_CHILD_INDEX from '@/constants/ValidChildIndex';
import iAppState from '@/interfaces/iAppState';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import SupportedHTMLElement from '@/classes/SupportedHTMLElement';
const defaultTable = new SupportedHTMLElement(
    'foo'
    , 'rootTable'
    , 'table'
    , true
    , [
        {
            name: 'width',
            value: '600'
        }
    ]  
    , [
        'bar'
    ]
     
);

const defaultTR = new SupportedHTMLElement(
    'bar'
    , 'initTR'
    , 'tr'
    , false
    , [ ]  
    , [
        'fizz'
    ]
     
);

const defaultTD = new SupportedHTMLElement(
    'fizz'
    , 'initTD'
    , 'td'
    , false
    , [ {
        name: 'style',
        value: 'color: #f00;'
    } ]  
    , [
        'buzz'
    ]
     
);

const defaultP = new SupportedHTMLElement(
    'buzz'
    , 'initP'
    , 'p'
    , false
    , [ {
        name: 'style',
        value: 'font-size: 20px; color: #f00; text-decoration: bold;'
    },
    {
        name: 'text-content',
        value: 'foobar'
    } ]  
    , [ ]
     
);

const factory = new ElementTreeFactory(SUPPORTED_HTML_ELEMENTS, VALID_CHILD_INDEX);
const treeData = [
    defaultTable, defaultTR, defaultTD, defaultP
  ]  as Array<SupportedHTMLElement>
const builtTree = factory.buildTree(treeData);

export default {
    treeData,
    builtTree,
    modalState: false,
    activeModal: '',
    modalCanSubmit: true,
    modalcb: (): void => { return; },
    modalData: {},
    elementTreeFactory: factory
} as iAppState;