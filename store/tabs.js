/* eslint-disable no-shadow */

const state = () => ({
	system: 'safety',
	activeKey: 'sys-safety-home',
	tabs: [
		{
			key: 'sys-safety-home',
			path: '/sys/safety/home',
			title: '首页',
		},
	],
});

// 计算属性
const getters = {
	system: state => state.system,
	activeKey: state => state.activeKey,
	tabs: state => state.tabs,
};

// actions
const actions = {
	setSystem({ commit }, system) {
		commit('setSystem', system);
	},
	setActiveKey({ commit }, activeKey) {
		commit('setActiveKey', activeKey);
	},
	setTabs({ commit }, tabs) {
		commit('setTabs', tabs);
	},
};

// 更改状态
const mutations = {
	setSystem(state, system) {
		state.system = system;
	},
	setActiveKey(state, activeKey) {
		state.activeKey = activeKey;
	},
	setTabs(state, tabs) {
		state.tabs = [...tabs];
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
