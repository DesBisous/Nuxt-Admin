<template>
	<section class="container">
		<HContainer title="基础信息">
			<template v-slot:event>
				<el-button class="btn-edit" type="text" @click="onEdit"
					>编辑基础信息</el-button
				>
			</template>
			<el-row :gutter="20">
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info label-width="92px" label="部门名称" content="采购部"></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="16" :lg="16" :xl="16">
					<Info
						label-width="92px"
						label="创建时间"
						content="2019-10-10  10:10:10"
					></Info>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<Info
						label-width="92px"
						label="部门描述"
						content="部门负责人，管理部门各个成员账号。"
					></Info>
				</el-col>
			</el-row>
		</HContainer>
		<HContainer title="部门成员">
			<template v-slot:event>
				<el-button class="btn-edit" type="text" @click="onAddDepNum"
					>编辑部门成员</el-button
				>
			</template>
			<!-- 表格 -->
			<el-table
				header-cell-class-name="tabel-header-cell"
				size="medium"
				:data="tableData"
			>
				<el-table-column prop="name" label="成员姓名">
					<template slot-scope="scope">
						<el-button type="text" @click="goUserDetail(scope.row.id)">{{
							scope.row.name
						}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="创建人"> </el-table-column>
				<el-table-column prop="createTime" label="创建时间">
					<template slot-scope="scope">
						{{
							new Date(scope.row.createTime * 1000) | formatDate('yyyy-MM-dd')
						}}
					</template>
				</el-table-column>
				<el-table-column prop="enable" label="启用状态">
					<template slot-scope="scope">
						<span :class="scope.row.enable ? 'danger-text' : 'success-text'">{{
							scope.row.enable ? '停用' : '启用'
						}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button
							type="text"
							class="danger-text"
							@click="handleDelete(scope.row)"
							>移除部门</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</HContainer>
		<DepAddOrEditDialog
			title="编辑部门"
			:visible.sync="editDepVisible"
			:initData="baseInfo"
			:roles="roles"
			@onSure="editDepart"
		></DepAddOrEditDialog>
		<DepNumEditDialog
			:id="id"
			:visible.sync="editDepNumVisible"
			@onSure="editDepartNum"
		></DepNumEditDialog>
	</section>
</template>

<script>
import Info from '~/components/common/Info';
import HContainer from '~/components/common/HContainer';
import DepAddOrEditDialog from '~/components/safety/department/DepAddOrEditDialog';
import DepNumEditDialog from '~/components/safety/department/DepNumEditDialog';
import { formatDate } from '~/lib/timeUtils';

export default {
	name: 'department-detail',
	filters: {
		formatDate,
	},
	components: {
		Info,
		HContainer,
		DepAddOrEditDialog,
		DepNumEditDialog,
	},
	data() {
		return {
			id: this.$route.query.id || '',
			editDepVisible: false,
			editDepNumVisible: false,
			baseInfo: {
				departName: '采购部',
				name: 'Benson',
				role: ['采购专员'],
				departDesc: '部门负责人，管理部门各个成员账号。',
			},
			roles: [
				{
					label: '采购专员',
					value: '采购专员',
				},
				{
					label: '钢铁侠',
					value: '钢铁侠',
				},
				{
					label: '奇异博士',
					value: '奇异博士',
				},
			],
			tableData: [
				{
					id: 1,
					name: '李凯',
					createName: 'admin',
					createTime: 1558945117,
					enable: true,
				},
				{
					id: 2,
					name: '李凯',
					createName: 'admin',
					createTime: 1558945117,
					enable: false,
				},
				{
					id: 3,
					name: '李凯',
					createName: 'admin',
					createTime: 1558945117,
					enable: true,
				},
				{
					id: 4,
					name: '李凯',
					createName: 'admin',
					createTime: 1558945117,
					enable: false,
				},
			],
		};
	},
	methods: {
		onEdit() {
			this.editDepVisible = true;
		},
		onAddDepNum() {
			this.editDepNumVisible = true;
		},
		goUserDetail(id) {
			this.$router.push({
				path: '/sys/safety/user/detail',
				query: {
					id,
				},
			});
		},
		handleDelete(row) {
			this.$confirm(`当前选定成员为【${row.name}】，是否确认移除 ?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$message({
						type: 'success',
						message: '移除成功!',
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消',
					});
				});
		},
		editDepart(params) {
			console.log(params);
		},
		editDepartNum(params) {
			console.log(params);
			console.log('编辑部门成员');
		},
	},
};
</script>

<style lang="less" scoped>
.container {
	.btn-edit {
		padding: 0 0 1px 0;
		margin-left: 16px;
	}
}
</style>
