<template>
	<el-header>
		<div class="container">
			<div class="left-block" ref="leftBlock">
				<div v-if="title" class="header-title">
					<LazyImage
						:src="require('~/assets/images/logo.png')"
						:image-style="{ width: '28px', height: '28px' }"
						placeholder=""
					/>
					<p>{{ title }}</p>
				</div>
				<i
					v-if="isShowCollapse"
					class="icon-switch iconfont"
					:class="collapse ? 'icon-ribbona' : 'icon-ribbonb'"
					@click="modifyCollapse(dynamicCollapseKey)"
				></i>
			</div>
			<div class="right-block" ref="rightBlock">
				<div v-if="menu && horizontalMenu" class="menu">
					<SideBar :_key="menu" mode="horizontal" :isResizeEvent="false" />
				</div>
				<div class="parts">
					<div class="message">
						<el-tooltip effect="dark" content="消息" placement="bottom">
							<i class="iconfont icon-androidnotifications">
								<span>12</span>
							</i>
						</el-tooltip>
					</div>
					<div class="user">
						<el-dropdown @command="handleCommand" trigger="click">
							<div class="el-dropdown-link">
								<LazyImage
									class="img-container"
									:src="require('~/assets/images/user.png')"
									placeholder=""
								/>
								<strong>钢铁侠</strong>
							</div>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="personal">
									<i class="iconfont icon-ioshome"></i>
									首页
								</el-dropdown-item>
								<el-dropdown-item command="message">
									<i class="iconfont icon-androidnotifications"></i>
									消息
								</el-dropdown-item>
								<el-dropdown-item divided command="logout">
									<i class="iconfont icon-power"></i>
									退出登录
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
					<div
						v-if="menu && verticalMenu"
						class="iconMenu"
						@click="verticalMenuOpenChuange"
					>
						<i
							class="iconfont"
							:class="
								verticalMenuOpen ? 'icon-closeround' : 'icon-naviconround'
							"
						>
						</i>
					</div>
				</div>
			</div>
		</div>
		<div class="light-beam">
			<LightLine />
		</div>
		<div
			v-if="menu"
			class="verticalMenu"
			:class="verticalMenuOpen ? 'open' : ''"
		>
			<SideBar
				:_key="menu"
				mode="vertical"
				:isResizeEvent="false"
				:menu-style="{ width: '100%' }"
				@callback="verticalMenuOpenChuange"
			/>
		</div>
	</el-header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SideBar from '~/components/layouts/SideBar.vue';
import LightLine from '~/components/ui/LightLine';
import LazyImage from '~/components/ui/LazyImage';

export default {
	name: 'topBar',
	components: {
		LightLine,
		LazyImage,
		SideBar,
	},
	props: {
		title: {
			type: String,
			default: '',
		},
		isShowCollapse: {
			type: Boolean,
			default: false,
		},
		collapseKey: {
			type: String,
		},
		menu: {
			type: String,
		},
	},
	computed: {
		collapse() {
			return this.$store.getters['sideBar/collapse'](this.dynamicCollapseKey);
		},
		...mapGetters({
			system: 'tabs/system',
			sideBar: 'sideBar/state',
		}),
	},
	watch: {
		system(newData, oldData) {
			if (newData !== oldData) {
				this.handleCollapseKey();
			}
		},
	},
	data() {
		return {
			dynamicCollapseKey: this.collapseKey,
			timeoutId: null,
			isResizeEvent: false,
			horizontalMenu: true,
			verticalMenu: false,
			verticalMenuOpen: false,
			rightBlockWidth: 0,
			leftBlockWidth: 0,
		};
	},
	methods: {
		...mapActions({
			modifyCollapse: 'sideBar/modifyCollapse',
		}),
		verticalMenuOpenChuange() {
			this.verticalMenuOpen = !this.verticalMenuOpen;
		},
		handleCommand(command) {
			switch (command) {
				case 'logout':
					this.$router.push('/login');
					console.log('退出成功！');
					break;
				default:
					break;
			}
		},
		handleCollapseKey() {
			// 需要显示的时候才去有必要给 collapseKey 赋值
			if (this.isShowCollapse) {
				// 需要显示的情况下未能主动赋值，按照当前所在系统来控制
				if (!this.collapseKey) {
					let collapseKey = `${this.system}Collapse`;
					// 如果左侧导航控制 collapseKey 不在本系统，那自动为控制顶层 指定为：collapse
					if (
						!Object.prototype.hasOwnProperty.call(this.sideBar, collapseKey)
					) {
						collapseKey = 'collapse';
					}
					this.dynamicCollapseKey = collapseKey;
				}
			}
		},
		handleResizeEvent() {
			const bodyWidth = document.body.clientWidth;
			if (this.leftBlockWidth + this.initRightBlockWidth >= bodyWidth) {
				this.horizontalMenu = false;
				this.verticalMenu = true;
			} else if (this.leftBlockWidth + this.initRightBlockWidth < bodyWidth) {
				this.horizontalMenu = true;
				this.verticalMenu = false;
				this.verticalMenuOpen = false;
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
				this.isResizeEvent = true; // 保存已增加了 resize 事件
			}
		},
		handleMenu() {
			if (this.menu) {
				const bodyWidth = document.body.clientWidth;
				this.leftBlockWidth = this.$refs.leftBlock.clientWidth;
				this.initRightBlockWidth = this.$refs.rightBlock.clientWidth;
				// 初始化的时候，能够满足横向导航才进行监听，否者直接抛弃横向导航
				if (this.leftBlockWidth + this.initRightBlockWidth < bodyWidth) {
					this.addResizeEvent();
				} else {
					this.horizontalMenu = false;
					this.verticalMenu = true;
				}
			}
		},
	},
	mounted() {
		this.handleCollapseKey();
		this.handleMenu();
	},
	beforeDestroy() {
		if (process.client && this.isResizeEvent) {
			console.log('移除监听');
			window.removeEventListener('resize', this.resizeEvent, false);
		}
	},
};
</script>

<style lang="less" scoped>
@import '../../assets/less/style.less';

.el-header {
	line-height: 60px;
	padding: 0;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	z-index: 10;
	position: relative;
	.container {
		position: relative;
		background-color: @background-deep-blue;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		z-index: 1;
	}
}
.icon-switch {
	font-size: @font-size26;
	color: @danger;
	padding: 0 20px;
	cursor: pointer;
}
.top-item() {
	float: left;
	padding: 0 16px;
	cursor: pointer;
	i {
		color: @font-color-second;
	}
	&:hover {
		i,
		strong {
			color: #fff;
		}
	}
}
.left-block {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: @background-deep-blue;
	.header-title {
		color: #fff;
		font-size: @font-size18;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 16px;
		p {
			margin-left: 8px;
			overflow: visible;
			white-space: nowrap;
		}
	}
}
.right-block {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 20px 0 0;
	.menu {
		height: 100%;
		overflow: hidden;
	}
	.parts {
		height: 100%;
		flex-shrink: 0;
	}
	.user {
		padding: 0 0 0 16px;
		height: 100%;
		float: left;
		.top-item;
		.el-dropdown-link {
			align-items: center;
			display: flex;
		}
		.img-container {
			width: 35px;
			height: 35px;
			border-radius: 50%;
			overflow: hidden;
		}
		strong {
			font-size: @font-size14;
			margin: 0 8px 0 16px;
			color: @font-color-second;
		}
	}
	.message {
		float: left;
		.top-item;
		padding-top: 1px;
		i {
			font-size: @font-size20;
			position: relative;
			span {
				position: absolute;
				top: -9px;
				left: 5px;
				display: inline-block;
				color: #fff;
				font-size: @font-size12;
				font-weight: 600;
				border-radius: 25px;
				padding: 0 5px;
				height: 18px;
				line-height: 18px;
				transform: scale(0.9, 0.9);
				background-color: @danger;
			}
		}
	}
	.iconMenu {
		float: left;
		.top-item;
		padding: 0 8px 0 0;
		width: 32px;
		text-align: center;
		i {
			font-size: @font-size18;
			&.icon-naviconround {
				font-size: @font-size22;
			}
		}
	}
}
.light-beam {
	position: absolute;
	bottom: -1px;
	left: 0;
	width: 100%;
}
.verticalMenu {
	position: absolute;
	left: 0;
	top: 100%;
	width: 100%;
	overflow: hidden;
	transition: all 0.5s ease-in-out;
	transform: translateY(-100%);
	&.open {
		transform: translateY(0);
	}
}
</style>
