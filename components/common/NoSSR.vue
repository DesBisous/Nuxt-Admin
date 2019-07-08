<template lang="html">
	<section class="container">
		<no-ssr>
			<slot></slot>
			<div class="loading" slot="placeholder">
				拼命加载中...
			</div>
		</no-ssr>
	</section>
</template>

<script>
export default {
	name: 'NoSSR',
};
</script>

<style lang="less" scoped>
@import '../../assets/less/style.less';
.container {
	.loading {
		color: @font-color-second;
		font-size: @font-size14;
		text-align: center;
	}
}
</style>
