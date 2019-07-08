export default [
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
		children: [
			{
				path: '/example/demo/editor',
				name: 'demo',
				meta: {
					title: 'DEMO 中心',
					icon: 'demo',
				},
				children: [],
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
		],
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
		path: '/example/demo/editor',
		name: 'demo',
		meta: {
			title: 'DEMO 中心',
			icon: 'demo',
		},
		children: [],
	},
];
