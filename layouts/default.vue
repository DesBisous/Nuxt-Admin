<template>
	<VueScroll>
		<el-container direction="vertical" class="container">
			<TopBar
				menu="main"
				title="Skyroam 业务管理系统"
				:isShowCollapse="false"
				collapseKey="collapse"
			>
			</TopBar>
			<el-main>
				<nuxt />
			</el-main>
		</el-container>
		<el-backtop target=".__vuescroll .__panel"></el-backtop>
	</VueScroll>
</template>

<script>
import SideBar from '~/components/layouts/SideBar.vue';
import TopBar from '~/components/layouts/TopBar.vue';

export default {
	components: {
		TopBar,
	},
};
</script>

<style lang="less" scoped>
@import '../assets/less/style.less';

.el-container {
	color: @font-color-main!important;
	.el-main {
		min-width: 500px;
		padding: 0;
	}
}
</style>
