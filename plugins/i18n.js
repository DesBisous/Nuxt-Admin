/* eslint-disable prefer-destructuring */
/* eslint-disable global-require */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-dynamic-require */

import Vue from 'vue';
import VueI18n from 'vue-i18n';

// 加载element-ui语言包
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import ElementLocale from 'element-ui/lib/locale';

Vue.use(VueI18n);

export default ({ app, store }) => {
	let elLocale = {
		zhLocale,
		enLocale,
	};
	const messages = {};
	const locales = store.state.i18n.locales;
	for (let i = 0; i < locales.length; i += 1) {
		messages[locales[i]] = Object.assign(
			elLocale[`${locales[i]}Locale`],
			require(`~/data/lang/${locales[i]}.json`)
		);
	}
	elLocale = null;
	app.i18n = new VueI18n({
		locale: store.state.i18n.locale,
		messages,
	});

	ElementLocale.i18n((key, value) => app.i18n.t(key, value));
};
/**
 * 使用方法：
 * this.$store.commit('i18n/setLocale', 'en'); // 修改 vuex 保存的状态
 * this.$i18n.locale = 'en'; // 切换 i18n 的语言包
 *
 * 页面上使用：
 * {{ $t('welcome') }}
 * 更多的用法，百度吧 ~
 */
