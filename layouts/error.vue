<template>
	<section class="empty">
		<div class="img"></div>
		<p class="desc">哎哟！您访问的页面上太空了~~</p>
		<p class="desc_en">The page you were looking for doesn’t exist.~~</p>
	</section>
</template>

<script>
export default {
	layout: 'empty',
};
</script>

<style lang="less" scoped>
.empty {
	margin: 100px auto 0;
	padding-bottom: 50px;
	max-width: 1280px;
}
.img {
	margin: 0 auto;
	width: 491px;
	height: 260px;
	background-image: url(../assets/images/404.png);
	background-size: 100%;
	background-repeat: no-repeat;
	@media only screen and (-webkit-min-device-pixel-ratio: 2) {
		background-image: url(../assets/images/404@2x.png);
	}
}
.desc {
	margin-top: 50px;
	font-size: 24px;
	color: #4a90e2;
	text-align: center;
	&_en {
		margin-top: 20px;
		text-align: center;
		font-size: 14px;
		color: #4a4a4a;
	}
}
</style>
