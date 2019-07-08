<template>
	<section class="container">
		<HContainer pureheader>
			<el-form :model="formData" label-position="right" label-width="80px">
				<el-row :gutter="24">
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
						<el-form-item label="角色名称:" prop="name">
							<el-input
								size="small"
								v-model="formData.name"
								placeholder="请输入角色名称关键词"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
						<el-form-item label="所属部门:" prop="role">
							<el-select
								size="small"
								v-model="formData.depart"
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
							@click="goDetail('add')"
						>
							新增角色
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
				<el-table-column prop="name" label="角色名称">
					<template slot-scope="scope">
						<el-button type="text" @click="goDetail('detail', scope.row.id)">{{
							scope.row.name
						}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="departs" label="所属部门">
					<template slot-scope="scope">
						<span v-for="(depart, index) in scope.row.departs" :key="depart.id">
							{{ depart
							}}{{ index !== scope.row.departs.length - 1 ? '、' : '' }}
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="number" label="成员" width="80">
					<template slot-scope="scope">
						<el-button type="text" @click="goUser(scope.row.id)">{{
							scope.row.number
						}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="creator" label="创建人"> </el-table-column>
				<el-table-column
					prop="roleDesc"
					label="角色描述"
					width="250"
				></el-table-column>
				<el-table-column prop="createTime" label="创建时间" width="100">
					<template slot-scope="scope">
						{{
							new Date(scope.row.createTime * 1000) | formatDate('yyyy-MM-dd')
						}}
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" @click="handleEdit(scope.row)">
							编辑
						</el-button>
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
	</section>
</template>

<script>
import HContainer from '~/components/common/HContainer';
import { formatDate } from '~/lib/timeUtils';

export default {
	name: 'role',
	filters: {
		formatDate,
	},
	components: {
		HContainer,
	},
	data() {
		return {
			loading: false,
			page: {
				currentPage: 1,
				pageSize: 10,
				pageSizes: [10, 20, 50, 100],
				total: 100,
			},
			formData: {
				name: '',
				depart: [],
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
			tableData: [
				{
					id: '蝙蝠侠',
					name: '蝙蝠侠',
					departs: ['漫威宇宙', '权力者游戏'],
					number: 10,
					creator: '上帝',
					roleDesc: '管理卡资源系统，对卡进行运营管',
					createTime: 1558945117,
				},
				{
					id: '蝙蝠侠',
					name: '蝙蝠侠',
					departs: ['漫威宇宙', '权力者游戏'],
					number: 0,
					creator: '上帝',
					roleDesc: '管理卡资源系统，对卡进行运营管',
					createTime: 1558945117,
				},
			],
		};
	},
	methods: {
		goUser(id) {
			this.$router.push({
				path: '/sys/safety/user',
				query: {
					id, // 这里传角色的 id 让 role 页面根据角色 id，去查找这个角色下的所有用户
				},
			});
		},
		goDetail(form, id) {
			this.$router.push({
				path: '/sys/safety/role/detail',
				query: {
					form,
					...(id && { id }),
				},
			});
		},
		handleEdit(row) {
			this.goDetail('edit', row.id);
		},
		handleDelete(row) {
			if (row.number > 0) {
				this.$confirm(
					`当前选定角色为【${row.name}】删除后将不可使用，是否确认删除 ?`,
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
				this.$confirm('角色成员不为 0，不可删除该角色', '提示', {
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
	},
};
</script>

<style lang="less" scoped></style>
