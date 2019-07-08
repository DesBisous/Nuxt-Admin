<template lang="html">
	<el-dialog
		class="dialog"
		:title="title"
		:visible="visible"
		:width="width"
		:before-close="beforeClose"
		@close="close"
	>
		<slot></slot>
		<div slot="footer" class="dialog-footer">
			<slot name="footer"></slot>
		</div>
	</el-dialog>
</template>

<script>
export default {
	name: 'Dialog',
	props: {
		title: {
			type: String,
			default: '',
		},
		width: {
			type: String,
			default: '50%',
		},
		visible: {
			type: Boolean,
			default: false,
		},
		beforeClose: {
			type: Function,
			default: null,
		},
	},
	methods: {
		close() {
			this.$emit('update:visible', false);
			this.$emit('close');
		},
	},
};
</script>

<style lang="less" scoped>
@import '../../assets/less/style.less';

.dialog {
	& /deep/ .el-dialog__header {
		padding: 12px;
		background: @background-gray;
		border-bottom: 1px solid #eee;
		.el-dialog__title {
			font-size: @font-size16;
			font-weight: bold;
		}
	}
	padding: 30px 20px;
	& /deep/ .el-dialog__footer {
		padding: 14px;
		border-top: 1px solid @background-gray;
	}
	& /deep/ .el-dialog__body {
		*zoom: 1;
		&::after {
			display: block;
			content: '.';
			height: 0;
			visibility: hidden;
			clear: both;
			font-size: 0;
			line-height: 0;
		}
	}
}
</style>
