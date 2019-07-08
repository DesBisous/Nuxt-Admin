<template lang="html">
	<section class="container">
		<HContainer :styleContainer="styleContainer">
			<div id="map" ref="map"></div>
		</HContainer>
	</section>
</template>

<script>
import HContainer from '~/components/common/HContainer';
import countryNameEnZh from '~/data/map/countryNameEnZh.json';

export default {
	name: 'worldMap',
	components: {
		HContainer,
	},
	data() {
		return {
			myChart: null,
			styleContainer: {
				background: '#f3f3f3',
			},
			data: [
				{ name: '中国', value: 2000 },
				{ name: '日本', value: 1800 },
				{ name: '美国', value: 1500 },
				{ name: '加拿大', value: 1300 },
				{ name: '韩国', value: 1200 },
				{ name: '哈萨克斯坦', value: 1000 },
				{ name: '秘鲁', value: 900 },
				{ name: '埃及', value: 800 },
				{ name: '阿富汗', value: 500 },
				{ name: '西班牙', value: 600 },
				{ name: '瑞典', value: 700 },
				{ name: '乌克兰', value: 1000 },
				{ name: '南非', value: 1400 },
				{ name: '印度', value: 628.8 },
				{ name: '阿根廷', value: 878 },
				{ name: '哈萨克斯坦', value: 271.7 },
				{ name: '苏丹', value: 950.6 },
				{ name: '阿尔及利亚', value: 238.2 },
				{ name: '刚果民主共和国', value: 2334.5 },
				{ name: '格陵兰', value: 1216.6 },
				{ name: '沙特阿拉伯', value: 2115 },
				{ name: '墨西哥', value: 1195.8 },
				{ name: '印度尼西亚', value: 290.5 },
				{ name: '利比亚', value: 896 },
				{ name: '澳大利亚', value: 1574.1 },
			],
		};
	},
	methods: {},
	mounted() {
		// 基于准备好的dom，初始化echarts实例
		this.myChart = this.$echarts.init(this.$refs.map);
		// 绘制图表
		this.myChart.setOption({
			title: {
				text: '全球地图',
				subtext: '全球地图 Demo',
				left: 'center',
			},
			tooltip: {
				trigger: 'item',
				formatter(params) {
					return `${params.seriesName} <br /> ${params.name}: ${
						params.value ? params.value : ''
					}`;
				},
			},
			toolbox: {
				show: true,
				feature: {
					dataView: { readOnly: false },
					restore: {},
					saveAsImage: {},
				},
			},
			visualMap: {
				min: 0,
				max: 2500,
				left: 'left',
				top: 'bottom',
				text: ['高', '低'], // 文本，默认为数值文本
				calculable: true,
				realtime: true,
				outOfRange: {
					color: ['#c2e9fb'],
				},
			},
			series: [
				{
					name: '全球国家',
					type: 'map',
					mapType: 'world', // 自定义扩展图表类型
					roam: true,
					zoom: 1,
					label: {
						normal: {
							areaColor: '#c2e9fb',
							formatter: params =>
								this.data.find(item => item.name === params.name)
									? params.name
									: '',
							show: true,
						},
						emphasis: { show: true },
					},
					itemStyle: {
						normal: {
							areaColor: '#c2e9fb',
						},
					},
					data: this.data,
					nameMap: countryNameEnZh,
				},
			],
		});
	},
};
</script>

<style lang="less" scoped>
.container {
	#map {
		width: 100%;
		height: 650px;
	}
}
</style>
