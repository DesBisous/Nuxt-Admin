<template lang="html">
	<div class="light-line-wrapper">
		<div class="light-line"></div>
	</div>
</template>

<script>
export default {
	name: 'LightLine',
};
</script>

<style lang="less" scoped>
.light-line-wrapper {
	opacity: 1;
	transform: translate(0px, 0px);
	height: 2px;
	width: 100%;
	overflow: hidden;
	.light-line {
		margin-left: -64px;
		height: 100%;
		width: 64px;
		background: -webkit-gradient(
			linear,
			left top,
			right top,
			from(rgba(24, 144, 255, 0)),
			to(#1890ff)
		);
		background: linear-gradient(90deg, rgba(24, 144, 255, 0) 0, #1890ff);
		-webkit-animation: bannerLine 3s ease-in-out 0s infinite;
		animation: bannerLine 3s ease-in-out 0s infinite;
	}
}
@keyframes bannerLine {
	from {
		margin-left: -64px;
	}
	to {
		margin-left: 100%;
	}
}

@-moz-keyframes bannerLine /* Firefox */ {
	from {
		margin-left: -64px;
	}
	to {
		margin-left: 100%;
	}
}

@-webkit-keyframes bannerLine /* Safari 和 Chrome */ {
	from {
		margin-left: -64px;
	}
	to {
		margin-left: 100%;
	}
}

@-o-keyframes bannerLine /* Opera */ {
	from {
		margin-left: -64px;
	}
	to {
		margin-left: 100%;
	}
}
</style>
