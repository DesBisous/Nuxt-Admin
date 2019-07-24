<template>
	<VueScroll>
		<div class="empty">
			<nuxt />
			<Footer absolute />
		</div>
		<el-backtop target=".__vuescroll .__panel"></el-backtop>
	</VueScroll>
</template>

<script>
import Footer from '~/components/layouts/Footer';

export default {
	components: {
		Footer,
	},
};
</script>

<style lang="less" scoped></style>
