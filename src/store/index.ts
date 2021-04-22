/* eslint-disable */
import { createStore } from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import _DEFAULT_STATE_ from '@/constants/DefaultState';
export default createStore({
	state: _DEFAULT_STATE_,
	getters,
	mutations,
	actions
});
