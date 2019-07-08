<script>
import menusJson from '~/data/menus';
import { mapActions } from 'vuex';

export default {
	name: 'sideBar',
	props: {
		_key: {
			type: String,
			default: 'main',
		},
		title: {
			type: String,
			default: '',
		},
		size: {
			type: String,
			default: 'default',
		},
		mode: {
			type: String,
			default: 'vertical',
		},
		isCtrlCollapse: {
			type: Boolean,
			default: false,
		},
		collapseKey: {
			type: String,
			default: 'collapse',
		},
		menuStyle: {
			type: Object,
			default: () => {},
		},
		asideStyle: {
			type: Object,
			default: () => {},
		},
		isResizeEvent: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		collapse() {
			return this.$store.getters['sideBar/collapse'](this.collapseKey);
		},
	},
	data() {
		return {
			region: 'large', // width > 980 -> large、 580 < width <= 980 -> small、 width <= 580 -> mini
			miniOpen: 'close',
		};
	},
	methods: {
		...mapActions({
			modifyCollapse: 'sideBar/modifyCollapse',
			modifyCollapseByParams: 'sideBar/modifyCollapseByParams',
		}),
		onSelect(index, path) {
			this.$emit('callback', index);
		},
		handleMiniOpen() {
			if (this.miniOpen === 'open') {
				this.miniOpen = 'close';
			} else {
				this.miniOpen = 'open';
			}
		},
		handleResizeEvent() {
			const bodyWidth = document.body.clientWidth;
			if (bodyWidth > 980) {
				if (this.region !== 'large') {
					this.modifyCollapseByParams({
						key: this.collapseKey,
						value: false,
					});
					this.region = 'large';
				}
			}
			if (bodyWidth > 580 && bodyWidth <= 980) {
				if (this.region !== 'small') {
					this.modifyCollapseByParams({
						key: this.collapseKey,
						value: true,
					});
					this.region = 'small';
				}
			}
			if (bodyWidth <= 580) {
				if (this.region !== 'mini') {
					// 这个时候需要改变左侧导航布局
					this.modifyCollapseByParams({
						key: this.collapseKey,
						value: false,
					});
					this.region = 'mini';
					this.miniOpen = 'close';
				}
			}
		},
		resizeEvent() {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
			}
			this.timeoutId = setTimeout(() => this.handleResizeEvent(), 300);
		},
		addResizeEvent() {
			if (process.client) {
				window.addEventListener('resize', this.resizeEvent, false);
			}
		},
		handleMenu() {
			if (this.isResizeEvent && this.mode === 'vertical') {
				this.addResizeEvent();
			}
		},
		onHeaderEvent(event) {
			event.stopPropagation();
			this.region !== 'mini' &&
				this.isCtrlCollapse &&
				this.modifyCollapse(this.collapseKey);
		},
		recursion(menus, index) {
			const mainMenus = menus.map((menu, subIndex) => {
				const icon = `iconfont icon-${menu.meta.icon} icon-style`;
				let dom;
				if (!menu.children || !menu.children.length) {
					dom = !menu.meta.noShow ? (
						<el-menu-item index={menu.path}>
							{menu.meta.icon ? <i class={icon} /> : ''}
							<span slot="title">{menu.meta.title}</span>
						</el-menu-item>
					) : null;
				} else {
					const level = `${index}-${subIndex}`;
					const submenus = this.recursion(menu.children, level);
					dom = (
						<el-submenu index={level}>
							<template slot="title">
								{menu.meta.icon ? <i class={icon} /> : null}
								<span>{menu.meta.title}</span>
							</template>
							{submenus}
						</el-submenu>
					);
				}
				return dom;
			});
			return mainMenus;
		},
		renderHeader() {
			return this.mode === 'vertical' && this.title ? (
				<div
					class={`menu-header ${this.isCtrlCollapse ? 'cursor' : ''}`}
					onClick={this.onHeaderEvent}
				>
					<i />
					<p>{this.title}</p>
				</div>
			) : null;
		},
	},
	render() {
		const menu = menusJson[this._key];
		const dom = this.recursion(menu, '0');
		return (
			<aside class={this.mode} style={this.asideStyle}>
				<el-menu
					mode={this.mode}
					collapse={this.collapse}
					background-color="#001529"
					text-color="hsla(0,0%,100%,.65)"
					default-active={this.$route.meta.light || this.$route.path}
					class={`el-menu-vertical ${this.size} ${this.region} ${
						this.miniOpen
					}`}
					router
					style={this.menuStyle}
					onSelect={this.onSelect}
				>
					{this.renderHeader()}
					{dom}
				</el-menu>
				<span
					class={`mini-arrow ${this.size}
					${this.region === 'mini' ? 'visible' : ''}
					${this.miniOpen}`}
					onClick={this.handleMiniOpen}
				>
					<i
						class={
							this.miniOpen === 'open'
								? 'el-icon-caret-left'
								: 'el-icon-caret-right'
						}
					/>
				</span>
			</aside>
		);
	},
	mounted() {
		this.handleMenu();
		this.handleResizeEvent();
	},
	beforeDestroy() {
		if (this.isResizeEvent && this.mode === 'vertical') {
			if (process.client) {
				console.log('移除监听');
				window.removeEventListener('resize', this.resizeEvent, false);
			}
		}
	},
};
</script>

<style scoped lang="less">
@import '../../assets/less/base';
@import '../../assets/less/style';

aside {
	position: relative;
	min-height: 100vh;
	background: @background-deep-blue;
	box-shadow: @shadow-min;
	& > ul {
		padding: 0;
		height: 100%;
		border: none;
	}
	&.horizontal {
		min-height: auto;
		transition: all 0.3s;
	}
}
.el-menu-vertical:not(.el-menu--collapse) {
	width: 256px;
	&.small {
		width: 180px;
	}
}
.el-menu--horizontal:not(.el-menu--collapse) {
	width: auto;
}
.el-submenu {
	/deep/ .el-submenu__title {
		height: 40px;
		line-height: 40px;
		padding: 0 12px;
		i.iconfont {
			margin: 0;
			vertical-align: middle;
			width: 24px;
			text-align: center;
			display: inline-block;
		}
		span {
			margin-left: 8px;
		}
		&:hover {
			color: #ffffff !important;
		}
	}
	&.is-active /deep/ .el-submenu__title {
		color: #ffffff !important;
	}
	/deep/ .el-menu {
		background-color: @background-black-blue!important;
	}
	.el-menu-item {
		background-color: @background-black-blue!important;
		height: 40px;
		line-height: 40px;
		min-width: auto;
		width: 100%;
	}
}
.el-menu-item {
	height: 40px;
	line-height: 40px;
	margin: 4px 0;
	&:hover {
		color: #ffffff !important;
		i {
			color: #ffffff !important;
		}
	}
	&.is-active {
		background-color: @background-blue!important;
		color: #fff !important;
	}
	/deep/ .el-tooltip i,
	/deep/ i {
		margin: 0;
		vertical-align: middle;
		width: 24px;
		text-align: center;
		display: inline-block;
	}
	span {
		margin-left: 8px;
		vertical-align: inherit;
	}
}
.el-menu-vertical {
	.menu-header {
		color: #fff;
		height: 60px;
		line-height: 60px;
		font-size: @font-size20;
		background-color: @background-dark-blue;
		font-weight: 600;
		padding-left: 18px;
		&.cursor {
			cursor: pointer;
		}
		i {
			.iconImg('~assets/images/logo.png');
			width: 28px;
			height: 28px;
			display: inline-block;
			vertical-align: text-top;
		}
		p {
			font-size: @font-size18;
			margin: 0 0 0 8px;
			opacity: 1;
			transition: all 0.3s;
			height: 60px;
			width: 195px;
			display: inline-block;
			vertical-align: top;
			white-space: nowrap;
		}
	}
	&.el-menu--collapse {
		.menu-header {
			p {
				width: 0;
				height: 0;
				opacity: 0;
				overflow: hidden;
				position: absolute;
			}
		}
	}
	&.small {
		.menu-header {
			height: 45px;
			line-height: 45px;
			i {
				width: 24px;
				height: 24px;
				vertical-align: sub;
			}
			p {
				width: auto;
				font-size: @font-size16;
			}
		}
	}
	&.mini {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 4;
		transition: all 0.4s;
		&.open {
			transform: translateX(0);
		}
		&.close {
			transform: translateX(-100%);
		}
	}
}
.el-menu--horizontal {
	border: none !important;
	.el-menu-item {
		border: none !important;
		height: 60px;
		line-height: 60px;
		margin: 0;
		padding: 0 12px;
	}
	/deep/ .el-submenu__title {
		height: 60px;
		line-height: 60px;
		padding: 0 12px;
	}
	/deep/ .el-submenu__icon-arrow {
		vertical-align: text-bottom !important;
		margin-top: 0 !important;
	}
}
.mini-arrow {
	position: fixed;
	top: 50%;
	left: 0;
	width: 45px;
	height: 45px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	border-radius: 20%;
	background: #001529;
	color: #001529;
	transform: translate(-100%, -50%);
	padding: 0 1px 1px;
	box-sizing: border-box;
	cursor: pointer;
	opacity: 1;
	z-index: -1;
	&.visible {
		transition: all 0.4s;
		transform: translate(-65%, -50%);
		opacity: 1;
		z-index: 1;
		color: #fff;
		&.open {
			&.default {
				left: 256px;
			}
			&.small {
				left: 180px;
			}
		}
		&.close {
			left: 0;
		}
	}
}
</style>
