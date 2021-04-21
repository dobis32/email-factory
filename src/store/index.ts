/* eslint-disable */
import { createStore } from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import _SUPPORTED_HTML_ELEMENTS_ from '../constants/SupportedHTMLElementTypes';
import DefaultStateIndex from '@/constants/DefaultStateIndex';
export default createStore({
	state: DefaultStateIndex,
	getters,
	mutations,
	actions
});
