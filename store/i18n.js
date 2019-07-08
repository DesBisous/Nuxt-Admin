/* eslint-disable no-shadow */

const state = () => ({
	locales: ['zh', 'en'],
	locale: 'zh',
});

// 计算属性
const getters = {};

// actions
const actions = {
	setLocale({ commit }, locale) {
		commit('setLocale', locale);
	},
};

// 更改状态
const mutations = {
	setLocale(state, locale) {
		if (state.locales.indexOf(locale) !== -1) {
			state.locale = locale;
		}
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
