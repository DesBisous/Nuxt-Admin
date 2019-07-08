/* eslint-disable no-shadow */

const state = () => ({
	collapse: false,
	safetyCollapse: false,
	demoCollapse: true,
});

// 计算属性
const getters = {
	state: state => state,
	collapse: state => key => state[key],
};

// actions
const actions = {
	modifyCollapse({ commit }, key) {
		commit('modifyCollapse', key);
	},
	modifyCollapseByParams({ commit }, params) {
		commit('modifyCollapseByParams', params);
	},
};

// 更改状态
const mutations = {
	modifyCollapse(state, key) {
		if (state[key] !== undefined) {
			state[key] = !state[key];
		}
	},
	modifyCollapseByParams(state, params) {
		if (state[params.key] !== undefined) {
			state[params.key] = params.value;
		}
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
