<template>
	<div class="empty">
		<div class="img empty"></div>
		<p>{{ title }}</p>
	</div>
</template>

<script>
export default {
	name: 'empty',
	props: {
		title: {
			type: String,
			default: '暂时没有数据哦~',
		},
	},
};
</script>

<style lang="less" scoped>
.empty {
	padding: 50px 0;
	background-color: #fff;
	.img {
		margin: 0 auto;
		width: 148px;
		height: 140px;
		background-image: url(../../assets/images/empty.png);
		background-size: 100%;
		background-repeat: no-repeat;
		@media only screen and (-webkit-min-device-pixel-ratio: 2) {
			background-image: url(../../assets/images/empty@2x.png);
		}
	}
	p {
		margin-top: 30px;
		font-size: 16px;
		text-align: center;
		color: #666;
	}
}
</style>
