import Vue from 'vue';
import VueScroll from 'vuescroll/dist/vuescroll-native';

export default () => {
	// 全局组件
	Vue.use(VueScroll, {
		// 在这里设置全局默认配置
		ops: {
			vuescroll: {
				mode: 'native',
				sizeStrategy: 'percent',
				detectResize: true,
			},
			scrollPanel: {
				// mounted之后自动滚动的距离
				initialScrollY: false,
				initialScrollX: false,
				// 是否启用 x 或者 y 方向上的滚动
				scrollingX: false,
				scrollingY: true,
				// 多长时间内完成一次滚动。 数值越小滚动的速度越快
				speed: 300,
				easing: undefined,
				verticalNativeBarPos: 'right',
			},
			rail: {
				// 轨道的背景色
				background: '#01a99a',
				// 轨道的透明度
				opacity: 0,
				// 轨道的尺寸
				size: '6px',
				// 指定轨道的 borderRadius
				specifyBorderRadius: false,
				// 轨道距 x 和 y 轴两端的距离
				gutterOfEnds: null,
				// 距离容器的距离
				gutterOfSide: '2px',
				keepShow: false,
			},
			bar: {
				showDelay: 500,
				onlyShowBarOnScroll: true,
				keepShow: false,
				// background: '#27c2c1',
				opacity: 1,
				hoverStyle: false,
				specifyBorderRadius: false,
				minSize: false,
				size: '6px',
				disable: false,
			},
		},
		// 在这里自定义组件名字，默认是vueScroll
		name: 'VueScroll',
	});
};
