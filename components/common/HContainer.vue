<template lang="html">
	<div class="hContainer" :style="styleContainer">
		<div class="header" :class="{ pure: pureheader }" v-if="title">
			<p>{{ title }}</p>
			<span class="subTitle" v-if="subTitle">{{ subTitle }}</span>
			<slot name="event"></slot>
		</div>
		<div class="container">
			<slot></slot>
		</div>
		<slot name="popover"></slot>
	</div>
</template>

<script>
export default {
	name: 'hContainer',
	props: {
		title: {
			type: String,
		},
		subTitle: {
			type: String,
		},
		pureheader: {
			type: Boolean,
			default: false,
		},
		styleContainer: {
			type: Object,
			default: () => ({}),
		},
	},
};
</script>

<style lang="less" scoped>
@import '../../assets/less/style.less';

.hContainer {
	position: relative;
	box-shadow: @shadow-last;
	background: #fff;
	border-radius: 2px;
	padding: 16px 24px;
	margin-bottom: 16px;
	overflow: hidden;
	.header {
		padding-bottom: 16px;
		margin-bottom: 16px;
		font-size: @font-size16;
		font-weight: bold;
		letter-spacing: 0.45px;
		border-bottom: 1px solid @dark-green;
		display: flex;
		align-items: flex-end;
		p {
			position: relative;
			padding-left: 16px;
			&::after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 3px;
				height: 100%;
				border-radius: 4px;
				background: @dark-green;
			}
		}
		span.subTitle {
			font-size: @font-size12;
			color: @font-color-second;
			margin-left: 8px;
		}
		&.pure {
			border: none;
			padding-bottom: 0;
			p {
				padding-left: 0;
				&::after {
					display: none;
				}
			}
		}
	}
	.container {
	}
}
</style>
