<template lang="html">
	<section class="container">
		<HContainer title="富文本">
			<NoSSR>
				<Editor :html.sync="htmlData" :text.sync="textData"></Editor>
			</NoSSR>
			<br />
			<div class="qww"></div>
			<el-button type="primary" @click="onClick">显示内容</el-button>
		</HContainer>
		<HContainer title="内容展示">
			<div v-html="htmlData"></div>
		</HContainer>
	</section>
</template>

<script>
import HContainer from '~/components/common/HContainer';
import Editor from '~/components/common/Editor';

export default {
	name: 'editor',
	components: {
		Editor,
		HContainer,
	},
	data() {
		return {
			htmlData: '',
			textData: '',
		};
	},
	methods: {
		onClick() {
			console.log('html:', this.htmlData);
			console.log('text:', this.textData);
		},
	},
};
</script>

<style lang="less" scoped>
.qww {
	height: 800px;
}
</style>
