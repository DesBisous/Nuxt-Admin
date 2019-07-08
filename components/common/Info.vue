<template lang="html">
	<div class="info" :style="infoStyle">
		<span class="label" v-if="label" :style="labelStyle">{{ label }}:</span>
		<span class="content" v-if="content !== ''">{{ content }}</span>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'info',
	props: {
		justifyContent: {
			type: String,
			default: 'flex-start',
		},
		alignItems: {
			type: String,
			default: 'flex-start',
		},
		labelWidth: {
			type: String,
			default: 'auto',
		},
		labelTextAlign: {
			type: String,
			default: 'left',
		},
		label: {
			type: [Number, String],
		},
		content: {
			type: [Number, String, Boolean],
			required: true,
		},
	},
	data() {
		return {
			infoStyle: {
				justifyContent: this.justifyContent,
				alignItems: this.alignItems,
			},
			labelStyle: {
				width: this.labelWidth,
				textAlign: this.labelTextAlign,
			},
		};
	},
};
</script>

<style lang="less" scoped>
@import '../../assets/less/base.less';
@import '../../assets/less/style.less';

.info {
	.flexCenter;
	font-size: @font-size14;
	margin-bottom: 16px;
	.label {
		padding-right: 8px;
		flex-shrink: 0;
	}
	.content {
		flex-grow: 1;
		line-height: 20px;
	}
}
</style>
