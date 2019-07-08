<template>
	<section class="container">
		<HContainer pureheader>
			<el-form :model="formData" label-position="right" label-width="80px">
				<el-row :gutter="24">
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
						<el-form-item label="部门名称:" prop="departName">
							<el-input
								size="small"
								v-model="formData.departName"
								placeholder="请输入部门名称关键字"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row type="flex" justify="space-between">
					<el-col :span="12">
						<el-button type="primary" size="small">查 询</el-button>
						<el-button size="small">重 置</el-button>
					</el-col>
					<el-col :span="12" class="text-right">
						<el-button
							size="small"
							class="success"
							icon="el-icon-edit"
							@click="onAddDepDialog"
						>
							新增成员
						</el-button>
					</el-col>
				</el-row>
			</el-form>
		</HContainer>
		<HContainer pureheader>
			<!-- 表格 -->
			<el-table
				header-cell-class-name="tabel-header-cell"
				v-loading="loading"
				:data="tableData"
			>
				<el-table-column prop="departName" label="部门名称" width="110">
					<template slot-scope="scope">
						<el-button type="text" @click="goDetail(scope.row.id)">{{
							scope.row.departName
						}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="部门负责人" width="110">
				</el-table-column>
				<el-table-column prop="role" label="拥有角色">
					<template slot-scope="scope">
						<el-button
							class="role-btn"
							type="text"
							v-for="(role, index) in scope.row.roles"
							:key="role"
							@click="goRoleDetail(role)"
							>{{ role
							}}{{
								index !== scope.row.roles.length - 1 ? '、' : ''
							}}</el-button
						>
					</template>
				</el-table-column>
				<el-table-column prop="number" label="成员" width="80">
					<template slot-scope="scope">
						<el-button type="text" @click="goUserDetail(scope.row.id)">{{
							scope.row.number
						}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="departDesc" label="部门描述"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" width="100">
					<template slot-scope="scope">
						{{
							new Date(scope.row.createTime * 1000) | formatDate('yyyy-MM-dd')
						}}
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" @click="onAddDepNumDialog(scope.row.id)"
							>添加部门成员</el-button
						>
						<el-button
							type="text"
							class="danger-text"
							@click="handleDelete(scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				class="pagination pagination-list"
				layout="total, sizes, prev, pager, next, jumper"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:page-sizes="page.pageSizes"
				:current-page="page.currentPage"
				:page-size="page.pageSize"
				:total="page.total"
			>
			</el-pagination>
		</HContainer>
		<DepAddOrEditDialog
			title="新增部门"
			:visible.sync="addDepVisible"
			:roles="roles"
			@onSure="addDepart"
		></DepAddOrEditDialog>
		<DepNumEditDialog
			:id="id"
			:visible.sync="editDepNumVisible"
			@onSure="editDepartNum"
		></DepNumEditDialog>
	</section>
</template>

<script>
import HContainer from '~/components/common/HContainer';
import DepAddOrEditDialog from '~/components/safety/department/DepAddOrEditDialog';
import DepNumEditDialog from '~/components/safety/department/DepNumEditDialog';
import { formatDate } from '~/lib/timeUtils';

export default {
	name: 'department',
	filters: {
		formatDate,
	},
	components: {
		HContainer,
		DepAddOrEditDialog,
		DepNumEditDialog,
	},
	data() {
		return {
			id: '',
			loading: false,
			addDepVisible: false,
			editDepNumVisible: false,
			page: {
				currentPage: 1,
				pageSize: 10,
				pageSizes: [10, 20, 50, 100],
				total: 100,
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
			formData: {
				departName: '',
			},
			tableData: [
				{
					id: 1,
					departName: '采购部',
					name: 'Benson',
					roles: ['商人', '有钱人'],
					number: 9,
					departDesc: '部门负责人，管理部门各个成员账号',
					createTime: 1558945117,
				},
				{
					id: 2,
					departName: '采购部',
					name: 'Benson',
					roles: ['商人', '有钱人'],
					number: 0,
					departDesc: '部门负责人，管理部门各个成员账号',
					createTime: 1558945117,
				},
			],
		};
	},
	methods: {
		goDetail(id) {
			this.$router.push({
				path: '/sys/safety/department/detail',
				query: {
					id,
				},
			});
		},
		goUserDetail(id) {
			this.$router.push({
				path: '/sys/safety/user',
				query: {
					id,
				},
			});
		},
		goRoleDetail(id) {
			this.$router.push({
				path: '/sys/safety/role/detail',
				query: {
					form: 'detail',
					id,
				},
			});
		},
		onAddDepDialog() {
			this.addDepVisible = true;
		},
		onAddDepNumDialog(id) {
			this.id = id;
			this.editDepNumVisible = true;
		},
		handleDelete(row) {
			if (row.number > 0) {
				this.$confirm(
					`当前选定部门为【${row.departName}】删除后将不可使用，是否确认删除 ?`,
					'提示',
					{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					}
				)
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
			} else {
				this.$confirm('部门成员不为 0，不可删除该部门', '提示', {
					confirmButtonText: '确定',
					showCancelButton: false,
					type: 'warning',
				}).then(() => {});
			}
		},
		handleCurrentChange(currentPage) {
			this.page.currentPage = currentPage;
		},
		handleSizeChange(pageSize) {
			this.page.pageSize = pageSize;
		},
		addDepart(params) {
			this.$message.success('新增成功!');
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
.role-btn {
	margin-left: 0;
}
</style>
