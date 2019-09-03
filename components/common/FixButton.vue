<template lang="html">
	<div
		class="fixButton"
		ref="fixButton"
		:class="{ fixDown }"
		:style="{ width: containerWidth }"
	>
		<el-button v-if="cancel" size="small" @click="handleCancel">{{
			cancelText
		}}</el-button>
		<el-button v-if="ok" type="primary" size="small" @click="handleOk">{{
			okText
		}}</el-button>
		<div class="fixNone" ref="fixNone"></div>
	</div>
</template>

<script>
export default {
	name: 'FixButton',
	props: {
		idResize: {
			type: String,
			required: true,
		},
		ok: {
			type: Boolean,
			default: true,
		},
		okText: {
			type: String,
			default: '确认',
		},
		cancel: {
			type: Boolean,
			default: true,
		},
		cancelText: {
			type: String,
			default: '取消',
		},
		direction: {
			type: String,
			default: 'down',
		},
		scrollDomStr: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			winHeight: 0, // 初始获取窗口高度
			initTop: 0, // 获取按钮容器初始高度
			fixDown: false, // 按钮是否固定在底部
			timeoutId: null,
			containerWidth: 'auto', // 按钮容器宽度
			scrollDom: null, // 存储滚动对象
			setTimeout: null,
		};
	},
	mounted() {
		// 事件监听滚动条
		if (this.scrollDomStr) {
			let dom = document.getElementsByClassName(this.scrollDomStr)[0];
			if (dom) {
				this.scrollDom = dom;
			} else {
				dom = document.getElementById(this.scrollDomStr);
				if (dom) {
					this.scrollDom = dom;
				}
			}
		} else {
			this.scrollDom = window;
		}
		this.scrollDom.addEventListener('scroll', this.watchScroll);
		window.addEventListener('resize', this.handleTimeout, false);
		this.$nextTick(() => {
			// 初始获取窗口高度
			this.winHeight = this.$refs.fixNone.offsetTop - 60;
			// 获取按钮容器初始高度
			this.initTop = this.$refs.fixButton.offsetTop;
			this.watchScroll();
			this.calculatWidth();
			this.setTimeout = setTimeout(() => {
				this.calculatWidth();
			}, 400);
		});
	},
	methods: {
		handleOk() {
			this.$emit('okEvent');
		},
		handleCancel() {
			this.$emit('cancelEvent');
		},
		watchScroll() {
			const scrollTop =
				this.scrollDom === window
					? window.pageYOffset ||
					  document.documentElement.scrollTop ||
					  document.body.scrollTop
					: this.scrollDom.scrollTop;
			if (this.direction === 'down') {
				if (scrollTop > this.initTop - this.winHeight) {
					this.fixDown = false;
				} else {
					this.fixDown = true;
				}
			}
		},
		handleTimeout() {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
			}
			this.timeoutId = setTimeout(this.calculatWidth, 50);
		},
		calculatWidth() {
			if (this.fixDown) {
				const dom = document.getElementById(this.idResize);
				if (dom) {
					this.containerWidth = `${dom.clientWidth}px`;
				}
			}
		},
	},
	beforeDestroy() {
		// 注销事件
		window.removeEventListener('scroll', this.watchScroll);
		window.removeEventListener('resize', this.handleTimeout);
		this.setTimeout && clearTimeout(this.setTimeout);
	},
};
</script>

<style lang="less" scoped>
.fixButton {
	position: relative;
	text-align: center;
	background: #fff;
	padding: 8px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	border-radius: 2px;
	z-index: 1;
	box-sizing: border-box;
	transition: all 0.15s;
	&.fixDown {
		position: fixed;
		bottom: 0;
	}
	.fixNone {
		position: fixed;
		bottom: 0;
		width: 0;
		height: 0;
	}
}
</style>
