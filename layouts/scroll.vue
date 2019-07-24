<template>
	<el-container direction="vertical" class="container warp">
		<TopBar
			menu="main"
			title="Skyroam 业务管理系统"
			:isShowCollapse="false"
			collapseKey="collapse"
		>
		</TopBar>
		<el-main>
			<VueScroll>
				<nuxt />
				<el-backtop target=".__vuescroll .__panel"></el-backtop>
			</VueScroll>
		</el-main>
	</el-container>
</template>

<script>
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
