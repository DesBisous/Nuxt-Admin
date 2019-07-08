<template>
	<section class="container" id="role-detail">
		<HContainer v-show="form !== 'detail'" title="基础信息">
			<el-form
				:model="appForm"
				:rules="appRules"
				ref="appRuleForm"
				label-position="right"
				label-width="92px"
			>
				<el-form-item label="角色名称:" prop="name">
					<el-input
						size="small"
						v-model="appForm.name"
						placeholder="请输入角色名称，如：超级管理员"
					></el-input>
				</el-form-item>
				<el-form-item label="所属部门:" prop="depart">
					<el-select
						size="small"
						v-model="appForm.depart"
						multiple
						clearable
						filterable
						placeholder="请选择部门"
					>
						<el-option
							v-for="depart in departs"
							:key="depart.value"
							:label="depart.label"
							:value="depart.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="角色描述:" prop="desc">
					<el-input
						type="textarea"
						size="small"
						:rows="2"
						v-model="appForm.desc"
						placeholder="请输入描述"
					></el-input>
				</el-form-item>
			</el-form>
		</HContainer>
		<HContainer v-show="form === 'detail'" title="基础信息">
			<el-row :gutter="20">
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info label-width="72px" label="角色名称" content="超级管理员"></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info label-width="72px" label="创建人" content="李凯"></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info
						label-width="72px"
						label="创建时间"
						content="2019-03-06 10:10:10"
					></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info
						label-width="72px"
						label="角色描述"
						content="部门负责人，管理部门各个成员账号"
					></Info>
				</el-col>
			</el-row>
		</HContainer>
		<HContainer title="添加权限">
			<div class="jurisdiction">
				<div class="left">
					所属权限:
				</div>
				<div class="right">
					<el-tabs :value="activeKey" @tab-click="handleClick">
						<el-tab-pane
							v-for="item in tabs"
							:key="item.name"
							:label="item.label"
							:name="item.name"
						/>
					</el-tabs>
				</div>
			</div>
			<NoSSR>
				<div class="tree">
					<el-checkbox v-if="form !== 'detail'" @change="handleAll" name="all"
						>全选</el-checkbox
					>
					<el-tree
						ref="tree"
						node-key="id"
						default-expand-all
						:show-checkbox="form !== 'detail'"
						:data="treeData"
						:props="treeProps"
						:default-checked-keys="checkedKeys"
					></el-tree>
				</div>
			</NoSSR>
		</HContainer>
		<FixButton
			idResize="role-detail"
			@okEvent="handleOk"
			@cancelEvent="handleCancel"
		></FixButton>
	</section>
</template>

<script>
import Info from '~/components/common/Info';
import HContainer from '~/components/common/HContainer';
import FixButton from '~/components/common/FixButton';
import { getKeysByRecursion } from '~/lib/common';

export default {
	name: 'role-detail',
	components: {
		Info,
		HContainer,
		FixButton,
	},
	data() {
		return {
			activeKey: '二',
			form: this.$route.query.form,
			id: this.$route.query.id,
			appForm: {
				name: '',
				depart: [],
				desc: '',
			},
			appRules: {
				name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
			},
			departs: [
				{
					label: '复仇者联盟',
					value: '复仇者联盟',
				},
				{
					label: '神盾局',
					value: '神盾局',
				},
				{
					label: '权力者游戏',
					value: '权力者游戏',
				},
			],
			tabs: [
				{
					label: '应用一',
					name: '一',
				},
				{
					label: '应用二',
					name: '二',
				},
				{
					label: '应用三',
					name: '三',
				},
				{
					label: '应用四',
					name: '四',
				},
				{
					label: '应用五',
					name: '五',
				},
			],
			treeProps: {
				id: 'id',
				label: 'label',
				children: 'children',
			},
			treeData: [
				{
					id: '1',
					label: '一级 1',
					children: [
						{
							id: '1-1',
							label: '二级 1-1',
							children: [
								{
									id: '1-1-1',
									label: '三级 1-1-1',
								},
								{
									id: '1-1-2',
									label: '三级 1-1-2',
								},
							],
						},
						{
							id: '1-2',
							label: '二级 1-2',
							children: [
								{
									id: '1-2-1',
									label: '三级 1-2-1',
								},
								{
									id: '1-2-2',
									label: '三级 1-2-2',
								},
							],
						},
					],
				},
				{
					id: '2',
					label: '一级 2',
					children: [
						{
							id: '2-1',
							label: '二级 2-1',
							children: [
								{
									id: '2-1-1',
									label: '三级 2-1-1',
								},
							],
						},
						{
							id: '2-2',
							label: '二级 2-2',
							children: [
								{
									id: '2-2-1',
									label: '三级 2-2-1',
								},
							],
						},
					],
				},
				{
					id: '3',
					label: '一级 3',
					children: [
						{
							id: '3-1',
							label: '二级 3-1',
							children: [
								{
									id: '3-1-1',
									label: '三级 3-1-1',
								},
							],
						},
						{
							id: '3-2',
							label: '二级 3-2',
							children: [
								{
									id: '3-2-1',
									label: '三级 3-2-1',
								},
							],
						},
					],
				},
			],
			checkedKeys: [],
		};
	},
	methods: {
		handleClick(tab, event) {
			const key = event.target.getAttribute('id').replace(/^tab-/, '');
			this.activeKey = key;
			console.log(this.$refs.tree.getCheckedNodes());
			console.log(this.$refs.tree.getCheckedKeys());
		},
		handleAll(val) {
			if (val) {
				this.$refs.tree.setCheckedKeys(
					getKeysByRecursion(
						this.treeData,
						this.treeProps.children,
						this.treeProps.id
					)
				);
			} else {
				this.$refs.tree.setCheckedKeys([]);
			}
		},
		handleOk() {
			console.log('点击了确定');
		},
		handleCancel() {
			console.log('点了取消');
			this.$router.back();
		},
	},
};
</script>

<style lang="less" scoped>
@import '../../../../assets/less/style.less';

.container {
	.el-select {
		width: 100%;
	}
	.jurisdiction {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 0 15px;
		margin-bottom: 16px;
		&::after {
			content: '';
			height: 1px;
			background-color: @background-gray;
			position: absolute;
			left: 0;
			bottom: 0;
			width: calc(100% - 30px);
			z-index: 1;
			margin-left: 15px;
		}
		.left {
			padding: 0 24px 0 1px;
			height: 40px;
			box-sizing: border-box;
			line-height: 40px;
			display: inline-block;
			list-style: none;
			font-size: @font-size14;
			font-weight: 500;
			color: @font-color-main;
			position: relative;
		}
		.right {
			flex-grow: 1;
			& /deep/ .el-tabs__header {
				margin: 0;
				.el-tabs__nav-wrap::after {
					height: 0;
				}
			}
		}
	}
	.tree {
		padding: 0 57px;
		& /deep/ .el-tree-node:has(div.el-tree-node__children) {
			display: inline-block;
		}
	}
}
</style>
