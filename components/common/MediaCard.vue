<!-- 图文卡片组件 -->
<template lang="html">
	<div class="mediaCard" @click="$emit('click')">
		<HContainer pureheader>
			<div class="block">
				<div class="img">
					<LazyImage
						:src="imgUrl"
						:lazy="true"
						scrollContainer=".__vuescroll .__panel"
					/>
				</div>
				<div class="block-content">
					<p class="title" v-if="title">{{ title }}</p>
					<p class="subTitle" v-if="subTitle">{{ subTitle }}</p>
					<p class="desc" v-if="desc">{{ desc }}</p>
				</div>
			</div>
			<template v-slot:popover>
				<slot></slot>
			</template>
		</HContainer>
	</div>
</template>

<script>
import HContainer from '~/components/common/HContainer';
import LazyImage from '~/components/ui/LazyImage';

export default {
	name: 'mediaCard',
	components: {
		LazyImage,
		HContainer,
	},
	props: {
		imgUrl: {
			type: [String, Object],
		},
		title: {
			type: String,
			default: '',
		},
		subTitle: {
			type: String,
			default: '',
		},
		desc: {
			type: String,
			default: '',
		},
	},
};
</script>

<style lang="less" scoped>
@import '../../assets/less/base.less';
@import '../../assets/less/style.less';

.block {
	display: flex;
	align-items: flex-start;
	padding-bottom: 24px;
	.img {
		width: 50px;
		min-width: 50px;
		height: 50px;
		margin-right: 16px;
	}
	.block-content {
		.title {
			font-size: @font-size16;
			font-weight: bold;
			margin-bottom: 4px;
		}
		.subTitle {
			font-size: 13px;
			color: @font-color-base;
			margin-bottom: 4px;
		}
		.desc {
			margin-top: 8px;
			font-size: @font-size12;
			color: @font-color-base;
			.ellipsisLine(3);
		}
	}
}
</style>
