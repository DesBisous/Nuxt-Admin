<template>
	<el-container class="warp">
		<SideBar
			_key="safety"
			title="安全中心"
			size="small"
			collapseKey="safetyCollapse"
			:isCtrlCollapse="true"
		/>
		<VueScroll>
			<el-container direction="vertical" class="safety-container">
				<Breadcrumb />
				<Tabs />
				<el-main>
					<nuxt-child keep-alive :keep-alive-props="keepAliveProps" />
				</el-main>
				<Footer />
			</el-container>
			<el-backtop target=".__vuescroll .__panel"></el-backtop>
		</VueScroll>
	</el-container>
</template>

<script>
import SideBar from '~/components/layouts/SideBar.vue';
import Breadcrumb from '~/components/layouts/Breadcrumb.vue';
import Footer from '~/components/layouts/Footer.vue';
import Tabs from '~/components/layouts/Tabs.vue';
import menusJson from '~/data/menus';
import { mapGetters } from 'vuex';

export default {
	name: 'safety',
	transition: 'fade',
	components: {
		SideBar,
		Breadcrumb,
		Footer,
		Tabs,
	},
	computed: {
		...mapGetters({
			system: 'tabs/system',
			activeKey: 'tabs/activeKey',
		}),
		keepAliveProps() {
			const ctab = menusJson[this.system]
				.filter(tab => tab.meta.keepAlive)
				.map(tab => tab.name.replace(/^sys-[safety]-/, ''));
			return { include: ctab };
		},
	},
};
</script>

<style lang="less" scoped>
.safety-container {
	position: relative;
}
.el-main {
	overflow-x: hidden;
}
</style>
