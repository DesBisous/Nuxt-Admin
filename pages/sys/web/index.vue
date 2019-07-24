<template lang="html">
	<section class="container">
		<iframe
			id="web-iframe"
			class="web-iframe"
			name="web-iframe"
			scrolling="no"
			frameborder="0"
			:src="iframeSrc"
		></iframe>
	</section>
</template>

<script>
import { mapGetters } from 'vuex';
import { getItemByRecursion } from '~/lib/common';
import menus from '~/data/menus';

export default {
	name: 'web',
	transition: 'fade',
	computed: {
		...mapGetters({
			system: 'tabs/system',
		}),
		iframeSrc() {
			const target = this.$route.query.target;
			const menu = menus[this.system];
			const router = getItemByRecursion(menu, 'children', 'name', target);
			if (router && router.meta && router.meta.iframeSrc) {
				return router.meta.iframeSrc;
			}
			return '404.html';
		},
	},
	methods: {
		initIframe() {
			/**
			 * iframe-宽高自适应显示
			 */
			const oIframe = document.getElementById('web-iframe');
			const deviceWidth = document.documentElement.clientWidth;
			const deviceHeight = document.documentElement.clientHeight;
			// oIframe.style.width = `${Number(deviceWidth)}px`; //数字是页面布局宽度差值
			oIframe.style.height = `${Number(deviceHeight - 60)}px`; //数字是页面布局高度差
		},
	},
	mounted() {
		this.initIframe();
	},
};
</script>

<style lang="less" scoped>
.container {
	width: 100%;
	height: auto;
	overflow: hidden;
	font-size: 0; //  去除   iframe 多出来的 4px 间隔
	.web-iframe {
		width: 100%;
		height: 100%;
	}
}
</style>
