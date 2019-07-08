import Vue from 'vue';
import Empty from '~/components/common/Empty';
import NoSSR from '~/components/common/NoSSR';

export default () => {
	// eventBus
	Vue.prototype.$bus = new Vue();

	// 全局组件
	Vue.component('Empty', Empty);
	Vue.component('NoSSR', NoSSR);
};
