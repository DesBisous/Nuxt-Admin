import Vue from 'vue';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';

// 地图有关 API
import 'echarts/map/js/world';

// 引入地图模块
import 'echarts/lib/chart/map';

// 引入组件·
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/toolbox';

export default () => {
	Vue.prototype.$echarts = echarts; // 引入组件（将echarts注册为全局）
};
