<template>
	<section class="container">
		<HContainer pureheader>
			<el-form :model="formData" label-position="right" label-width="80px">
				<el-row :gutter="24">
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
						<el-form-item label="输入搜索:" prop="name">
							<el-input
								size="small"
								v-model="formData.name"
								placeholder="成员账号/成员姓名/联系电话/邮箱"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
						<el-form-item label="启用状态:" prop="role">
							<el-select
								size="small"
								v-model="formData.status"
								clearable
								filterable
								placeholder="请选择状态类型"
							>
								<el-option
									key="已启用"
									label="已启用"
									value="已启用"
								></el-option>
								<el-option
									key="已停用"
									label="已停用"
									value="已停用"
								></el-option>
							</el-select>
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
					<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
						<el-form-item label="角色:" prop="role">
							<el-select
								size="small"
								v-model="formData.role"
								multiple
								clearable
								filterable
								placeholder="请选择角色"
							>
								<el-option
									v-for="role in roles"
									:key="role.value"
									:label="role.label"
									:value="role.value"
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
							@click="onAddUserDialog"
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
				<el-table-column prop="account" label="成员账号">
					<template slot-scope="scope">
						<el-button type="text" @click="goDetail(scope.row.id)">{{
							scope.row.account
						}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="成员姓名"> </el-table-column>
				<el-table-column prop="departs" label="所属部门">
					<template slot-scope="scope">
						<span v-for="(depart, index) in scope.row.departs" :key="depart.id">
							{{ depart
							}}{{ index !== scope.row.departs.length - 1 ? '、' : '' }}
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="role" label="角色" width="110">
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
				<el-table-column prop="phone" label="联系电话" width="120">
				</el-table-column>
				<el-table-column prop="email" label="邮箱" width="160">
				</el-table-column>
				<el-table-column prop="creator" label="创建人"> </el-table-column>
				<el-table-column prop="createTime" label="创建时间" width="100">
					<template slot-scope="scope">
						{{
							new Date(scope.row.createTime * 1000) | formatDate('yyyy-MM-dd')
						}}
					</template>
				</el-table-column>
				<el-table-column prop="enable" label="启用状态">
					<template slot-scope="scope">
						<span :class="scope.row.enable ? 'success-text' : 'danger-text'">{{
							scope.row.enable ? '已启用' : '已停用'
						}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button
							type="text"
							:class="scope.row.enable ? 'danger-text' : 'success-text'"
							@click="handleEnable(scope.row.id, scope.row.enable)"
							>{{ scope.row.enable ? '停用' : '启用' }}</el-button
						>
						<el-button
							type="text"
							class="danger-text"
							@click="handleDelete(scope.row.id)"
							>删除</el-button
						>
						<el-button type="text" @click="handleGroup(scope.row.id)"
							>关联集团</el-button
						>
						<el-button type="text" @click="handleWx(scope.row.id)"
							>企业微信</el-button
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
		<Dialog title="企业微信配置" :visible.sync="dialogWxVisible" width="500px">
			<el-form
				:model="wxForm"
				:rules="wxRules"
				ref="wxRuleForm"
				label-position="right"
				label-width="100px"
			>
				<el-row>
					<el-col :span="12">
						<el-form-item label="卡资源预警:" prop="simCode">
							<el-switch size="small" v-model="wxForm.simCode"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="老大哥:" prop="brother">
							<el-switch size="small" v-model="wxForm.brother"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="企业微信ID:" prop="id">
							<el-input
								size="small"
								v-model="wxForm.id"
								placeholder="输入企业微信ID"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template slot="footer">
				<el-button size="small" @click="dialogWxVisible = false"
					>取 消</el-button
				>
				<el-button type="primary" size="small" @click="dialogWxVisible = false"
					>确 定</el-button
				>
			</template>
		</Dialog>
		<Dialog title="关联集团" :visible.sync="dialogGroupVisible" width="650px">
			<el-form
				:model="groupForm"
				:rules="groupRules"
				ref="groupRuleForm"
				label-position="right"
				label-width="80px"
			>
				<el-row>
					<el-col :span="24">
						<el-form-item label="所属BU:" prop="bUnits">
							<el-select
								size="small"
								v-model="groupForm.bUnits"
								multiple
								clearable
								filterable
								placeholder="所属BU"
							>
								<el-option
									v-for="bUnit in bUnits"
									:key="bUnit.value"
									:label="bUnit.label"
									:value="bUnit.value"
								>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="授权GID:">
							<el-transfer
								filterable
								:data="gidData"
								:titles="['GID|集团名称']"
								:props="transferProps"
								:format="{
									noChecked: '${total}',
									hasChecked: '${checked}/${total}',
								}"
								:left-default-checked="groupForm.gids"
								:render-content="renderFunc"
								:filter-method="filterMethod"
								@left-check-change="leftCheckChange"
							>
							</el-transfer>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template slot="footer">
				<el-button size="small" @click="dialogGroupVisible = false"
					>取 消</el-button
				>
				<el-button
					type="primary"
					size="small"
					@click="dialogGroupVisible = false"
					>确 定</el-button
				>
			</template>
		</Dialog>
		<UserAddOrEditDialog
			title="新增成员"
			:visible.sync="dialogAddUserVisible"
			:departs="departs"
			:roles="roles"
			@onSure="addUser"
		></UserAddOrEditDialog>
	</section>
</template>

<script>
import HContainer from '~/components/common/HContainer';
import Dialog from '~/components/common/Dialog';
import { formatDate } from '~/lib/timeUtils';
import UserAddOrEditDialog from '~/components/safety/user/UserAddOrEditDialog';

export default {
	name: 'user',
	filters: {
		formatDate,
	},
	components: {
		HContainer,
		Dialog,
		UserAddOrEditDialog,
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
				role: '',
				depart: '',
				status: '',
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
					account: '蝙蝠侠',
					name: '蝙蝠侠',
					departs: ['DC'],
					roles: ['有钱人'],
					phone: '13651478557',
					email: '上帝@skyroam.com',
					creator: '上帝',
					createTime: 1558945117,
					enable: true,
				},
				{
					id: '超人',
					account: '超人',
					name: '超人',
					departs: ['漫威宇宙', 'DC'],
					roles: ['记者'],
					phone: '13651478557',
					email: '上帝@skyroam.com',
					creator: '上帝',
					createTime: 1558945117,
					enable: false,
				},
				{
					id: '钢铁侠',
					account: '钢铁侠',
					name: '钢铁侠',
					departs: ['漫威宇宙', '权力者游戏'],
					roles: ['商人', '有钱人'],
					phone: '13651478557',
					email: '上帝@skyroam.com',
					creator: '上帝',
					createTime: 1558945117,
					enable: true,
				},
			],
			dialogWxVisible: false,
			wxForm: {
				id: '',
				simCode: true,
				brother: true,
			},
			wxRules: {
				id: [{ required: true, message: '输入企业微信ID', trigger: 'blur' }],
				simCode: [{ required: true, message: '', trigger: 'change' }],
				brother: [{ required: true, message: '', trigger: 'change' }],
			},
			// 穿梭框字段配置
			transferProps: {
				key: 'gid',
				label: 'group',
			},
			dialogGroupVisible: false,
			groupForm: {
				bUnits: '',
				gids: [20195, 20173],
			},
			groupRules: {
				bUnits: [
					{ required: true, message: '请选择所属BU', trigger: 'change' },
				],
			},
			bUnits: [
				{
					label: 'CN',
					value: 'CN',
				},
				{
					label: 'CN_HMT',
					value: 'CN_HMT',
				},
				{
					label: 'US',
					value: 'US',
				},
				{
					label: 'DE',
					value: 'DE',
				},
				{
					label: 'INDO',
					value: 'INDO',
				},
				{
					label: 'SIMO',
					value: 'SIMO',
				},
			],
			gidData: [
				{
					gid: 20195,
					group: 'Renter to Owner USD',
				},
				{
					gid: 20173,
					group: 'Fendi Italia Srl (EMEI Region)',
				},
				{
					gid: 20175,
					group: 'SAER Elettropompe SpA',
				},
				{
					gid: 20176,
					group: 'Fendi Italia Srl (EMEI Region)',
				},
			],
			dialogAddUserVisible: false,
		};
	},
	methods: {
		goDetail(id) {
			this.$router.push({
				path: '/sys/safety/user/detail',
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
		handleEnable(id, enable) {
			const desc = enable
				? '停用后该成员将无法登录系统，是否确认停用 ?'
				: '启用后该成员将允许登录系统，是否确认启用';
			const message = enable ? '停用成功!' : '启用成功!';
			this.$confirm(desc, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$message({
						type: 'success',
						message,
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消',
					});
				});
		},
		handleDelete(id) {
			this.$confirm('删除该成员将无法登录系统，是否确认删除 ?', '提示', {
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
		handleWx(id) {
			this.dialogWxVisible = true;
		},
		handleGroup() {
			this.dialogGroupVisible = true;
		},
		renderFunc(h, option) {
			return (
				<span>
					{option.gid} | {option.group}
				</span>
			);
		},
		filterMethod(query, item) {
			return `${item.gid} | ${item.group}`.indexOf(query) > -1;
		},
		leftCheckChange(selectKey, changeStateKey) {
			this.groupForm.gids = selectKey;
		},
		onAddUserDialog() {
			this.dialogAddUserVisible = true;
		},
		addUser(params) {
			this.$message.success('新增成功!');
			console.log(params);
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

<style lang="less" scoped>
@import '../../../../assets/less/style.less';

.el-select {
	width: 100%;
}
.role-btn {
	margin-left: 0;
}
.el-transfer {
	& /deep/ .el-transfer__buttons {
		display: none;
	}
	& /deep/ .el-transfer-panel {
		width: 100%;
		.el-checkbox__label {
			font-size: @font-size14;
		}
		.el-transfer-panel__filter {
			display: block;
			width: auto;
		}
		&:last-child {
			display: none;
		}
	}
}
</style>
