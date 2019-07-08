<template>
	<VueScroll>
		<el-container>
			<SideBar _key="main" title="Skyroam 后台管理系统" />
			<el-container direction="vertical" class="container">
				<TopBar :isShowCollapse="true" collapseKey="collapse"> </TopBar>
				<!-- <Breadcrumb /> -->
				<el-main>
					<nuxt />
				</el-main>
			</el-container>
		</el-container>
		<el-backtop target=".__vuescroll .__panel"></el-backtop>
	</VueScroll>
</template>

<script>
import SideBar from '~/components/layouts/SideBar.vue';
import TopBar from '~/components/layouts/TopBar.vue';
// import Breadcrumb from '~/components/layouts/Breadcrumb.vue';

export default {
	components: {
		SideBar,
		TopBar,
		// Breadcrumb,
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
