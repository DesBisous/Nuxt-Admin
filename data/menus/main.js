/**
 * [路由结构说明]
 * {
 * 	path: 地址,
 * 	name: 路由标识,
 * 	meta: {
 * 		title: 路由标题,
 * 		icon: 路由 icon,
 * 		keepAlive: 是否需要启动页面缓存,
 * 		noShow: 该项是否显示在菜单上,
 * 		parentName: 指向父路由的name，作用在面包屑(Breadcrumb)组件,
 * 		light: 手动指定菜单 active 标识，noShow 为 true 不显示的时候才使用该配置，为了显示父级，并且需要和父级在路由配置上为同级，而不能在 children 中，因为父级这时候为 <el-submenu> 不高亮的
 * 	},
 * 	children: [],
 */
export default [
	{
		path: '/sys/safety/home',
		name: 'safety',
		meta: {
			title: '安全中心',
			icon: 'hudun',
		},
		children: [],
	},
	{
		path: '/sys/web?target=web-data',
		name: 'web-data',
		meta: {
			title: '数据中心',
			icon: 'shuju',
			iframeSrc: 'http://localhost:8083/vsim-srms',
		},
		children: [],
	},
	{
		path: '/app',
		name: 'app',
		meta: {
			title: '待处理',
			icon: 'yingyongguanli',
		},
		children: [
			{
				path: '/sim',
				name: 'sim',
				meta: {
					title: '卡资源',
					icon: 'iosbarcode',
				},
				children: [],
			},
			{
				path: '/bsp',
				name: 'bsp',
				meta: {
					title: 'BSP 业务',
					icon: 'iospaper',
				},
				children: [],
			},
			{
				path: '/payment',
				name: 'payment',
				meta: {
					title: '支付中心',
					icon: 'socialyen',
				},
				children: [],
			},
			{
				path: '/logistics',
				name: 'logistics',
				meta: {
					title: '订单物流',
					icon: 'clipboard',
				},
				children: [],
			},
			{
				path: '/goods',
				name: 'goods',
				meta: {
					title: '商品管理',
					icon: 'cube',
				},
				children: [],
			},
			{
				path: '/cs',
				name: 'cs',
				meta: {
					title: '客服系统',
					icon: 'kefu',
				},
				children: [],
			},
		],
	},
	{
		path: '/example/demo/editor',
		name: 'demo',
		meta: {
			title: 'DEMO 中心',
			icon: 'demo',
		},
		children: [],
	},
];
