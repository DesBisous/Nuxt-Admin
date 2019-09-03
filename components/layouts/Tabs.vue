<template lang="html">
	<div class="tabs">
		<el-tabs
			:value="activeKey"
			type="card"
			@tab-remove="removeTab"
			@tab-click="handleClick"
		>
			<el-tab-pane
				:key="item.key"
				v-for="item in tabs"
				:label="item.title"
				:name="item.key"
				:closable="tabs.length !== 1"
			>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Tabs',
	computed: {
		...mapGetters({
			tabs: 'tabs/tabs',
			system: 'tabs/system',
			activeKey: 'tabs/activeKey',
		}),
	},
	methods: {
		...mapActions({
			setActiveKey: 'tabs/setActiveKey',
			setTabs: 'tabs/setTabs',
		}),
		handleClick(tab, event) {
			const key = event.target.getAttribute('id').replace(/^tab-/, '');
			const ctab = this.tabs.find(_tab => _tab.key === key);
			if (ctab) {
				this.$router.push(ctab.path);
			}
		},
		removeTab(targetKey) {
			const tabs = this.tabs;
			let activeKey = this.activeKey;
			if (activeKey === targetKey) {
				tabs.forEach((tab, index) => {
					if (tab.key === targetKey) {
						const nextTab = tabs[index + 1] || tabs[index - 1];
						if (nextTab) {
							activeKey = nextTab.key;
						}
					}
				});
			}
			this.setActiveKey(activeKey);
			this.setTabs(tabs.filter(tab => tab.key !== targetKey));
		},
	},
};
</script>

<style lang="less" scoped>
@import '../../assets/less/style.less';
.tabs {
	padding: 0 12px;
	background: #fff;
	box-shadow: @shadow-last;
	min-height: 40px;
	.el-tabs {
		& /deep/ .el-tabs__header {
			margin-bottom: 0;
		}
		& /deep/ .el-tabs__header {
			border: none;
		}
		& /deep/ .el-tabs__nav {
			border: none;
		}
		& /deep/ .el-tabs__item {
			border: none;
			font-size: @font-size14;
			&::after {
				content: '';
				position: absolute;
				left: calc(50% - 8px);
				bottom: 0;
				transform: translateX(-50%);
				display: inline-block;
				width: 0;
				height: 4px;
				background: @blue;
				border-radius: 4px;
				transition: all 0.3s;
			}
			&:hover {
				&::after {
					width: calc(100% - 40px);
				}
			}
			&.is-active {
				font-weight: bold;
				&::after {
					width: calc(100% - 40px);
				}
				&:not(.is-closable)::after {
					left: 50%;
				}
			}
			.el-icon-close {
				&::before {
					display: inline-block;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-46%, -50%);
				}
			}
		}
	}
}
</style>
