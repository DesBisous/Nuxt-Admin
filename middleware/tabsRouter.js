import menus from '~/data/menus';
import { getItemByRecursion } from '~/lib/common';

export default function({ route, store }) {
	const routePath = route.path; // 例子：/sys/safety/user
	const routeFullPath = route.fullPath; // 例子：/sys/safety/user
	const routeName = route.name; // 例子：sys-safety-user
	if (routeName && typeof routeName === 'string') {
		const routeNameArr = routeName.split('-');
		let routerSystem = 'main';
		if (routeNameArr.length > 1) {
			routerSystem = routeNameArr[1]; // 例子：safety
		}
		// 如果主路由返回的系统不存在二级菜单，则采用主菜单 main 去使用
		if (!menus[routerSystem]) {
			routerSystem = 'main';
		}
		// 判断是否为 iframe 路由
		const signkey = route.query.target ? routeFullPath : routePath;
		// 递归查找当前菜单项配置
		const crrMenu = getItemByRecursion(
			menus[routerSystem],
			'children',
			'path',
			signkey
		);
		if (crrMenu) {
			const system = store.getters['tabs/system'];
			const key = routeName; // 例子：sys-safety-user
			const path = routeFullPath; // 例子：/sys/safety/user
			const title = crrMenu.meta.title; // 例子：用户管理
			const tab = {
				key,
				path,
				title,
			};
			if (routerSystem !== system) {
				store.dispatch('tabs/setSystem', routerSystem);
				store.dispatch('tabs/setTabs', [tab]); // 例子：设置 页卡 Tabs 数据
			} else {
				const tabs = store.getters['tabs/tabs'];
				const isTab = tabs.find(_tab => _tab.key === key);
				if (!isTab) {
					tabs.push(tab);
					store.dispatch('tabs/setTabs', tabs);
				}
			}
			store.dispatch('tabs/setActiveKey', key);
		}
	}
}
