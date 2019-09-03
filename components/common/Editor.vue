<template lang="html">
	<section class="container">
		<div ref="editor"></div>
	</section>
</template>

<script>
/* eslint-disable global-require */

export default {
	name: 'Editor',
	props: {
		html: {
			type: String,
			default: '',
		},
		text: {
			type: String,
			default: '',
		},
		// 如果使用七牛的服务器，那个就去看 https://www.kancloud.cn/wangfupeng/wangeditor3/405041 官网
		url: {
			type: String,
			default: 'https://jsonplaceholder.typicode.com/posts/',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		maxSize: {
			type: Number,
			default: 5,
		},
		maxLength: {
			type: Number,
			default: 5,
		},
		uploadFileName: {
			type: String,
			default: 'file',
		},
	},
	data() {
		return {
			editor: null,
			render: true,
			menus: [
				'head', // 标题
				'bold', // 粗体
				'fontSize', // 字号
				'fontName', // 字体
				'italic', // 斜体
				'underline', // 下划线
				'strikeThrough', // 删除线
				'foreColor', // 文字颜色
				'backColor', // 背景颜色
				'link', // 插入链接
				'list', // 列表
				'justify', // 对齐方式
				'quote', // 引用
				'emoticon', // 表情
				'image', // 插入图片
				'table', // 表格
				'video', // 插入视频
				'code', // 插入代码
				'undo', // 撤销
				'redo', // 重复
			],
			emotions: [
				{
					type: 'emoji',
					content: [
						'😀',
						'😃',
						'😄',
						'😁',
						'😆',
						'😅',
						'😂',
						'😊',
						'😇',
						'🙂',
						'🙃',
						'😉',
						'😓',
						'😪',
						'😴',
						'🙄',
						'🤔',
						'😬',
						'🤐',
					],
				},
			],
		};
	},
	methods: {
		onchange(html) {
			this.$emit('update:html', html);
			this.$emit('update:text', this.editor.txt.text());
		},
	},
	watch: {
		// 如果初始化数据需要异步过来的，在这里进行初始化设置内容
		html(newQuestion, oldQuestion) {
			if (this.render) {
				if (this.html.length) {
					// 清空编辑器内容
					this.editor.txt.clear();
					// 设置内容
					this.editor.txt.html(this.html);
				}
				this.render = false;
			}
		},
	},
	mounted() {
		if (process.client) {
			const E = require('wangeditor');
			this.editor = new E(this.$refs.editor);
			// 滤掉复制文本中自带的样式
			this.editor.customConfig.pasteFilterStyle = true;
			// 忽略粘贴内容中的图片
			this.editor.customConfig.pasteIgnoreImg = false;
			// 设置表情面板
			this.editor.customConfig.emotions = this.emotions;
			// 上传图片到服务器
			this.editor.customConfig.uploadImgServer = this.url;
			// 将图片大小限制为 5M
			this.editor.customConfig.uploadImgMaxSize = this.maxSize * 1024 * 1024;
			// 限制一次最多上传 5 张图片
			this.editor.customConfig.uploadImgMaxLength = this.maxLength;
			// 上传图片时刻自定义设置 header
			this.editor.customConfig.uploadImgHeaders = {};
			// 自定义 Formdata fileName
			this.editor.customConfig.uploadFileName = this.uploadFileName;
			// 自定义上传参数, 参数会被添加到formdata中
			this.editor.customConfig.uploadImgParams = {};
			// 是否需要将 uploadImgParams 参数拼接到 url 中
			this.editor.customConfig.uploadImgParamsWithUrl = false;
			// 自定义提示方法
			this.editor.customConfig.customAlert = info => this.$message.error(info);
			// onchange 监听
			this.editor.customConfig.onchange = this.onchange;
			// 创建
			this.editor.create();
			// 初始化设置内容
			if (this.html.length) {
				this.editor.txt.html(this.html);
			}
		}
	},
};
</script>

<style lang="less" scoped>
.container {
	position: relative;
	z-index: 1;
}
</style>

<!--
使用说明
<NoSSR>
  <Editor :html.sync="htmlData" :text.sync="textData"></Editor>
</NoSSR>
 -->
