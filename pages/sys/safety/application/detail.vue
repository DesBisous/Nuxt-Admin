<template lang="html">
	<section class="container">
		<HContainer title="基础信息">
			<el-row :gutter="20">
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info
						label-width="78px"
						label="应用中文名"
						content="卡资源系统"
					></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info
						label-width="78px"
						label="应用英文名"
						content="BSP-Portal"
					></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info label-width="78px" label="配置状态" content="已配置"></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info
						label-width="78px"
						label="应用ID"
						content="1541545455155451"
					></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info
						label-width="78px"
						label="密钥"
						content="645ba616-370a-43a8-a8e0-993e7a590cf0"
					></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info
						label-width="78px"
						label="创建时间"
						content="2019-02-28  10:10:10"
					></Info>
				</el-col>
			</el-row>
		</HContainer>
		<HContainer title="节点列表" subTitle="(拖拽可调整菜单排序优先级)">
			<el-row>
				<el-col>
					<el-button
						type="primary"
						size="small"
						icon="el-icon-edit"
						@click="onNode"
					>
						新增节点
					</el-button>
					<el-button
						class="success"
						size="small"
						:icon="openAllNode ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"
						@click="onOpenAllNode"
					>
						{{ openAllNode ? '收起全部节点' : '展开全部节点' }}
					</el-button>
				</el-col>
			</el-row>
			<el-row>
				<el-col>
					<NoSSR>
						<DragTreeTable
							:data="treeData"
							:isdraggable="true"
							:isContainChildren="true"
							:onDrag="onTreeDataChange"
							:onCheckChange="onCheckChange"
						></DragTreeTable>
					</NoSSR>
				</el-col>
			</el-row>
		</HContainer>
		<Dialog
			:title="dialogTitle"
			:visible.sync="dialogVisible"
			@close="onClose"
			width="560px"
		>
			<el-form
				:model="detailForm"
				:rules="detailRules"
				ref="detailRuleForm"
				label-position="right"
				label-width="100px"
			>
				<el-form-item
					label="上级节点:"
					prop="parentName"
					v-if="dialogType !== 'addParentNode' && detailForm.parentId !== null"
				>
					{{ detailForm.parentName }}
				</el-form-item>
				<el-form-item label="节点中文名:" prop="zhNodeName">
					<el-input
						size="small"
						v-model="detailForm.zhNodeName"
						placeholder="请输入中文名"
					></el-input>
				</el-form-item>
				<el-form-item label="节点英文名:" prop="enNodeName">
					<el-input
						size="small"
						v-model="detailForm.enNodeName"
						placeholder="Please enter your English name"
					></el-input>
				</el-form-item>
				<el-form-item label="节点类型:" prop="typeNode">
					<el-select
						size="small"
						v-model="detailForm.typeNode"
						placeholder="请选择节点类型"
					>
						<el-option key="菜单" label="菜单" value="菜单"></el-option>
						<el-option key="按钮" label="按钮" value="按钮"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="授权语句:"
					prop="authorization"
					v-if="detailForm.typeNode === '按钮'"
				>
					<el-input
						size="small"
						v-model="detailForm.authorization"
						placeholder="请输入授权语句"
					></el-input>
				</el-form-item>
				<el-form-item label="URL路径:" prop="url" v-else>
					<el-input
						size="small"
						v-model="detailForm.url"
						placeholder="请输入URL路径"
					></el-input>
				</el-form-item>
			</el-form>
			<template slot="footer">
				<el-button size="small" @click="onClose">取 消</el-button>
				<el-button type="primary" size="small" @click="onSure">确 定</el-button>
			</template>
		</Dialog>
	</section>
</template>

<script>
import HContainer from '~/components/common/HContainer';
import Info from '~/components/common/Info';
import Dialog from '~/components/common/Dialog';
import DragTreeTable from '~/components/drag-tree-table';
import { getItemByRecursion, setItemValByRecursion } from '~/lib/common';

export default {
	name: 'application-detail',
	components: {
		Info,
		Dialog,
		HContainer,
		DragTreeTable,
	},
	data() {
		return {
			openAllNode: true,
			dialogType: '',
			dialogTitle: '',
			dialogVisible: false,
			detailForm: {
				id: null,
				parentId: null,
				parentName: '',
				zhNodeName: '',
				enNodeName: '',
				typeNode: '',
				authorization: '',
				url: '',
			},
			detailRules: {
				parentName: [
					{ required: true, message: '请选择上级节点', trigger: 'blur' },
				],
				zhNodeName: [
					{ required: true, message: '请输入节点中文名', trigger: 'blur' },
				],
				enNodeName: [
					{ required: true, message: '请输入节点英文名', trigger: 'blur' },
				],
				typeNode: [
					{ required: true, message: '请输入节点类型', trigger: 'change' },
				],
				authorization: [
					{
						required: true,
						message: '请输入对应按钮授权语句',
						trigger: 'blur',
					},
				],
				url: [
					{
						required: true,
						message: '请输入对应菜单 URL 路径',
						trigger: 'blur',
					},
				],
			},
			treeData: {
				lists: [
					{
						id: 0,
						parentId: -1,
						order: 0,
						name: '一级菜单',
						typeNode: '菜单',
						uri: '/',
						authorization: '',
						open: true,
						lists: [
							{
								id: 1,
								parentId: 0,
								order: 0,
								name: '二级菜单',
								typeNode: '菜单',
								uri: '/organization',
								authorization: '',
								open: true,
								lists: [
									{
										id: 2,
										parentId: 1,
										order: 0,
										name: '新增应用',
										typeNode: '按钮',
										uri: '',
										authorization: 'organization:create',
										open: true,
										lists: [],
									},
									{
										id: 3,
										parentId: 1,
										order: 1,
										name: '应用详情',
										typeNode: '按钮',
										uri: '',
										authorization: 'organization:view',
										open: true,
										lists: [],
									},
									{
										id: 4,
										parentId: 1,
										order: 2,
										name: '编辑',
										typeNode: '按钮',
										uri: '',
										authorization: 'organization:edit',
										open: true,
										lists: [],
									},
									{
										id: 5,
										parentId: 1,
										order: 2,
										name: '删除',
										typeNode: '按钮',
										uri: '',
										authorization: 'organization:delete',
										open: true,
										lists: [],
									},
								],
							},
						],
					},
					{
						id: 6,
						parentId: -1,
						order: 0,
						name: '一级菜单',
						typeNode: '菜单',
						uri: '/',
						authorization: '',
						open: true,
						isShowCheckbox: false,
						lists: [
							{
								id: 7,
								parentId: 6,
								order: 0,
								name: '二级菜单',
								typeNode: '菜单',
								uri: '/organization',
								authorization: '',
								open: true,
								isShowCheckbox: false,
								lists: [
									{
										id: 8,
										parentId: 7,
										order: 0,
										name: '新增应用',
										typeNode: '按钮',
										uri: '',
										authorization: 'organization:create',
										open: true,
										lists: [],
									},
									{
										id: 9,
										parentId: 7,
										order: 1,
										name: '应用详情',
										typeNode: '按钮',
										uri: '',
										authorization: 'organization:view',
										open: true,
										lists: [],
									},
									{
										id: 10,
										parentId: 7,
										order: 2,
										name: '编辑',
										typeNode: '按钮',
										uri: '',
										authorization: 'organization:edit',
										open: true,
										lists: [],
									},
									{
										id: 11,
										parentId: 7,
										order: 2,
										name: '删除',
										typeNode: '按钮',
										uri: '',
										authorization: 'organization:delete',
										open: true,
										lists: [],
									},
								],
							},
						],
					},
				],
				columns: [
					{
						type: 'checkbox',
						width: 55,
						align: 'center',
					},
					{
						type: 'selection',
						title: '节点中文名',
						field: 'name',
						align: 'center',
						flex: 1,
					},
					{
						title: '节点类型',
						field: 'typeNode',
						align: 'center',
						flex: 1,
					},
					{
						title: 'URL 路径',
						field: 'url',
						align: 'center',
						flex: 1,
					},
					{
						title: '授权语句',
						field: 'authorization',
						align: 'center',
						flex: 1,
					},
					{
						title: '操作',
						type: 'action',
						align: 'center',
						flex: 1,
						actions: [
							{
								text: '添加子节点',
								icon: 'el-icon-circle-plus-outline',
								condition: item => item.typeNode === '菜单',
								onclick: this.onAddChildNode,
							},
							{
								text: '编辑',
								icon: 'el-icon-edit',
								onclick: this.onEdit,
							},
							{
								text: '删除',
								icon: 'el-icon-delete',
								onclick: this.onDelete,
								formatter: item => '<i>删除</i>',
							},
						],
					},
				],
				custom_field: {
					id: 'id',
					order: 'order',
					lists: 'lists',
					parent_id: 'parentId',
				},
			},
		};
	},
	methods: {
		onOpenAllNode() {
			this.openAllNode = !this.openAllNode;
			const childKey = this.treeData.custom_field.lists || 'lists';
			const openKey = this.treeData.custom_field.open || 'open';
			// 递归设置 树形数据的 展开属性
			setItemValByRecursion(
				this.treeData.lists,
				childKey,
				openKey,
				this.openAllNode
			);
		},
		/**
		 * [onTreeDataChange description]
		 * @param  {[type]} list  [更新后的数据源]
		 * @param  {[type]} from  [当前被拖拽的行]
		 * @param  {[type]} to    [目标拖拽行]
		 * @param  {[type]} where [拖拽的类型，top（上面）、center（里面）、bottom（下面）]
		 */
		onTreeDataChange(list, from, to, where) {
			console.log(list);
			this.treeData.lists = list;
		},
		onCheckChange(rows) {
			console.log(rows);
		},
		onNode() {
			this.dialogType = 'addParentNode';
			this.dialogTitle = '新增节点';
			this.dialogVisible = true;
		},
		onAddChildNode(item) {
			console.log('添加子节点', item);
			this.detailForm.parentId = item.id; // 父级节点 id
			this.detailForm.parentName = item.name; // 父级节点 name
			this.dialogType = 'addChildNode';
			this.dialogTitle = '新增子节点';
			this.dialogVisible = true;
		},
		onEdit(item) {
			console.log('编辑', item);
			this.detailForm.id = item.id; // 存储当前 id

			const list = this.treeData.lists;
			const childKey = this.treeData.custom_field.lists || 'lists';
			const signkey = this.treeData.custom_field.id || 'id';
			const val = item.parentId;
			const parent = getItemByRecursion(list, childKey, signkey, val);
			if (parent) {
				this.detailForm.parentId = parent.id; // 父级节点 id
				this.detailForm.parentName = parent.name; // 父级节点 name
			}

			this.dialogType = 'editNode';
			this.dialogTitle = '编辑节点';
			this.dialogVisible = true;
		},
		onDelete(item) {
			this.$confirm(`当前选定节点为【${item.name}】，是否确认删除 ?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!',
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消',
					});
				});
		},
		resetDetailForm() {
			this.detailForm = {
				id: null,
				parentId: null,
				parentName: '',
				zhNodeName: '',
				enNodeName: '',
				typeNode: '',
				authorization: '',
				url: '',
			};
		},
		onClose() {
			this.dialogType = '';
			this.dialogTitle = '';
			this.dialogVisible = false;
			this.resetDetailForm();
		},
		onSure() {
			this.onClose();
		},
	},
};
</script>

<style lang="less" scoped></style>
