<template lang="html">
	<el-image
		:src="src"
		:alt="alt"
		:fit="fit"
		:lazy="lazy"
		:scroll-container="scrollContainer"
		:style="imageStyle"
	>
		<div slot="placeholder" class="image-slot" v-html="placeholder"></div>
		<div slot="error" class="image-slot">
			<i class="el-icon-picture-outline"></i>
		</div>
	</el-image>
</template>

<script>
export default {
	name: 'LazyImage',
	props: {
		src: {
			default: '',
		},
		alt: {
			type: String,
			default: '',
		},
		fit: {
			type: String,
		},
		lazy: {
			type: Boolean,
			default: false,
		},
		scrollContainer: {
			type: [String, Object],
			default: () => {},
		},
		imageStyle: {
			type: Object,
			default: () => {},
		},
		placeholder: {
			type: [String, Function],
			default: '拼命加载中...',
		},
	},
};
</script>

<style lang="less" scoped>
@import '../../assets/less/style.less';
.el-image {
	width: 100%;
	height: 100%;
	.image-slot {
		color: @font-color-second;
		font-size: @font-size14;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 100%;
		height: 100%;
		i {
			font-size: @font-size16;
		}
	}
}
</style>
