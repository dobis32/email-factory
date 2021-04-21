/* eslint-disable */
import { createStore } from 'vuex';
import iTreeElement from '../interfaces/iTreeElement';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import ElementTreeFactory from '../classes/ElementTreeFactory';
import _SUPPORTED_HTML_ELEMENTS_ from '../constants/SupportedHTMLElementTypes';

const treeFactory = new ElementTreeFactory(_SUPPORTED_HTML_ELEMENTS_);

const treeData: Array<iTreeElement> = [
	{
		id: 'foo',
		root: true,
		type: 'table',
		alias: 'rootTable',
		children: [
			{
				id: 'bar',
				root: false,
				type: 'tr',
				alias: 'rootTR',
				children: [
					{
						id: 'fizz',
						root: false,
						type: 'td',
						alias: 'rootTD',
						children: [
							{
								id: 'buzz',
								root: false,
								type: 'p',
								alias: 'rootP',
								children: []
							}
						]
					}
				]
			}
		]
	}
];

export default createStore({
	state: {
		treeData,
		modalState: false,
		activeModal: '',
		modalcb: () => {
			return;
		}
	},
	getters,
	mutations,
	actions
});
