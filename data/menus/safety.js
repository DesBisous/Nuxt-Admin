export default [
	{
		path: '/sys/safety/home',
		name: 'sys-safety-home',
		meta: {
			title: '首页',
			icon: 'ioshome',
			noShow: true,
			keepAlive: true,
		},
		children: [],
	},
	{
		path: '/sys/safety/user',
		name: 'sys-safety-user',
		meta: {
			title: '用户管理',
			icon: 'yonghuguanli',
			keepAlive: true,
		},
		children: [],
	},
	{
		path: '/sys/safety/user/detail',
		name: 'sys-safety-user-detail',
		meta: {
			title: '用户详情',
			icon: '',
			noShow: true,
			parentName: 'sys-safety-user',
			light: '/sys/safety/user',
		},
		children: [],
	},
	{
		path: '/sys/safety/role',
		name: 'sys-safety-role',
		meta: {
			title: '角色管理',
			icon: 'jiaoseguanli',
			keepAlive: true,
		},
		children: [],
	},
	{
		path: '/sys/safety/role/detail',
		name: 'sys-safety-role-detail',
		meta: {
			title: '角色详情',
			icon: '',
			noShow: true,
			parentName: 'sys-safety-role',
			light: '/sys/safety/role',
		},
		children: [],
	},
	{
		path: '/sys/safety/department',
		name: 'sys-safety-department',
		meta: {
			title: '部门管理',
			icon: 'bumenguanli-copy',
			keepAlive: true,
		},
		children: [],
	},
	{
		path: '/sys/safety/department/detail',
		name: 'sys-safety-department-detail',
		meta: {
			title: '部门详情',
			icon: '',
			noShow: true,
			parentName: 'sys-safety-department',
			light: '/sys/safety/department',
		},
		children: [],
	},
	{
		path: '/sys/safety/application',
		name: 'sys-safety-application',
		meta: {
			title: '应用管理',
			icon: 'yingyongguanli',
			keepAlive: true,
		},
		children: [],
	},
	{
		path: '/sys/safety/application/detail',
		name: 'sys-safety-application-detail',
		meta: {
			title: '应用详情',
			icon: '',
			noShow: true,
			parentName: 'sys-safety-application',
			light: '/sys/safety/application',
		},
		children: [],
	},
];
