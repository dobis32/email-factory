import SUPPORTED_HTML_ELEMENTS from '@/constants/SupportedHTMLElementTypes';
import VALID_CHILD_INDEX from '@/constants/ValidChildIndex';
import iAppState from '@/interfaces/iAppState';
import ElementTreeFactory from '@/classes/ElementTreeFactory';
import { CODE_MODULE_A, CODE_MODULE_B, DUMMY_PLACEHOLDER_MODULE } from '@/constants/DefaultCodeModules';
const factory = new ElementTreeFactory(SUPPORTED_HTML_ELEMENTS, VALID_CHILD_INDEX);
const activeModule = DUMMY_PLACEHOLDER_MODULE;
const codeModules = [ CODE_MODULE_A, CODE_MODULE_B ];
const builtTree = factory.buildTree(DUMMY_PLACEHOLDER_MODULE.getModuleTreeData());

export default {
    codeModules,
    activeModule,
    builtTree,
    modalState: false,
    activeModal: '',
    modalCanSubmit: true,
    modalcb: (): void => { return; },
    modalData: {},
    elementTreeFactory: factory,
    showPreferences: false
} as iAppState;