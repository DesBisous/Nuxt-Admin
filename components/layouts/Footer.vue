<template lang="html">
	<div class="footer" :class="{ absolute: absolute }">
		Copyright <i class="iconfont icon-copyright"></i> <b>www.skyroam.com</b>,
		All Rights Reserved.
	</div>
</template>

<script>
export default {
	name: 'bfooter',
	props: {
		absolute: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="less" scoped>
@import '../../assets/less/style.less';

.footer {
	padding: 40px 0;
	font-size: @font-size12;
	color: @font-color-second;
	position: relative;
	left: 0;
	bottom: 0;
	text-align: center;
	i {
		font-size: @font-size12;
	}
	&.absolute {
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
	}
}
</style>
