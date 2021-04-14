import { createStore } from 'vuex';
import iTreeElement from '../interfaces/iTreeElement';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const elTree: Array<iTreeElement> = [
	{
		type: 'table',
		alias: 'rootTable',
		id: 'foo',
		children: [
			{
				type: 'tr',
				alias: 'rootTR',
				id: 'bar',
				children: [
					{
						type: 'td',
						id: 'fizz',
						alias: 'rootTD',
						children: [
							{
								type: 'p',
								alias: 'rootP',
								id: 'buzz',
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
		elementTree: elTree,
		modalState: false,
		activeModal: ''
	},
	getters,
	mutations,
	actions
});
