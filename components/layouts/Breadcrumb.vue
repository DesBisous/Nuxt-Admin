<template>
	<div class="breadcrumb">
		<el-breadcrumb separator="/">
			<transition-group name="breadcrumb">
				<el-breadcrumb-item key="-1">Skyroam 后台管理系统</el-breadcrumb-item>
				<el-breadcrumb-item :key="menu" v-for="menu in menus">
					{{ menu }}
				</el-breadcrumb-item>
			</transition-group>
		</el-breadcrumb>
	</div>
</template>

<script>
import menusJson from '~/data/menus';
import { mapGetters } from 'vuex';
import { getItemByRecursion } from '~/lib/common';

export default {
	name: 'Breadcrumb',
	computed: {
		...mapGetters({
			system: 'tabs/system',
			tabs: 'tabs/tabs',
			activeKey: 'tabs/activeKey',
		}),
		menus() {
			return this.recursion(this.activeKey).reverse();
		},
	},
	methods: {
		recursion(name) {
			const ctab = getItemByRecursion(
				menusJson[this.system],
				'children',
				'name',
				name
			);
			if (ctab) {
				if (ctab.meta.parentName) {
					const parentTab = menusJson[this.system].find(
						tab => tab.name === ctab.meta.parentName
					);
					return [ctab.meta.title, ...this.recursion(parentTab.name)];
				}
				return [ctab.meta.title];
			}
			return [];
		},
	},
};
</script>

<style scoped lang="less">
@import '../../assets/less/style.less';

.breadcrumb {
	padding: 16px 32px;
	background: #fff;
	z-index: 1;
	.is-link {
		color: @font-color-base!important;
		font-weight: 500 !important;
		&:hover {
			color: @tender-green!important;
		}
	}
	.el-breadcrumb__item {
		&:last-child {
			.is-link {
				color: @font-color-base!important;
			}
		}
	}
}
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
	transition: all 0.8s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
	opacity: 0;
	transform: translateX(20px);
}

.breadcrumb-move {
	transition: all 0.8s;
}

.breadcrumb-leave-active {
	position: absolute;
}
</style>
