import menus from '~/data/menus';

export default function({ route, store }) {
	const routePath = route.path;
	const routeFullPath = route.fullPath;
	const routeName = route.name;
	if (routeName && typeof routeName === 'string') {
		const routeNameArr = routeName.split('-');
		let routerSystem = 'main';
		if (routeNameArr.length > 1) {
			routerSystem = routeNameArr[1];
		}
		const crrMenu = menus[routerSystem].find(m => m.path === routePath);
		if (crrMenu) {
			const system = store.getters['tabs/system'];
			const key = routeName;
			const path = routeFullPath;
			const title = crrMenu.meta.title;
			const tab = {
				key,
				path,
				title,
			};
			if (routerSystem !== system) {
				store.dispatch('tabs/setSystem', routerSystem);
				store.dispatch('tabs/setTabs', [tab]);
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
