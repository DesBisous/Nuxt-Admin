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
					<Info label-width="92px" label="成员账号" content="Girl"></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info label-width="92px" label="成员姓名" content="宙斯"></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info label-width="92px" label="所属部门" content="采购部"></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info
						label-width="92px"
						label="联系电话"
						content="18605241265"
					></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info
						label-width="92px"
						label="邮箱"
						content="65775@skyroam.com"
					></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info label-width="92px" label="启用状态" content="已启用"></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info label-width="92px" label="创建人" content="admin"></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info
						label-width="92px"
						label="创建时间"
						content="2019-10-10  10:10:10"
					></Info>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<Info
						label-width="92px"
						label="最近登录时间"
						content="2019-10-10  10:10:10"
					></Info>
				</el-col>
			</el-row>
		</HContainer>
		<HContainer title="角色信息">
			<!-- 表格 -->
			<el-table
				header-cell-class-name="tabel-header-cell"
				size="medium"
				:data="tableData"
			>
				<el-table-column prop="role" label="角色">
					<template slot-scope="scope">
						<el-button type="text" @click="goRoleDetail(scope.row.id)">{{
							scope.row.role
						}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="desc" label="角色描述"> </el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button
							type="text"
							class="danger-text"
							@click="handleDelete(scope.row)"
							>移除角色</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</HContainer>
		<HContainer title="关联集团">
			<el-row :gutter="20">
				<el-col :span="24">
					<Info label-width="78px" label="所属BU" content="US"></Info>
				</el-col>
				<el-col :span="24">
					<Info
						label-width="78px"
						label="授权GID"
						content="20154|SkyroamLocalTest，20154|SkyroamLocalTest，20154|SkyroamLocalTest，20154|SkyroamLocalTest，20154|SkyroamLocalTest"
					></Info>
				</el-col>
			</el-row>
		</HContainer>
		<HContainer title="企业微信">
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
				<Info label="卡资源预警" content="">
					<el-switch size="small" v-model="form.simCode"></el-switch>
				</Info>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
				<Info label="老大哥" content="">
					<el-switch size="small" v-model="form.brother"></el-switch>
				</Info>
			</el-col>
			<el-col :span="24">
				<Info
					label-width="78px"
					label="企业微信："
					content="udsa-fus-fhh-sjdfhi-wfisj"
				>
				</Info>
			</el-col>
		</HContainer>
		<UserAddOrEditDialog
			title="编辑成员"
			:visible.sync="dialogEditUserVisible"
			:initData="baseInfo"
			:departs="departs"
			:roles="roles"
			@onSure="editUser"
		></UserAddOrEditDialog>
	</section>
</template>

<script>
import Info from '~/components/common/Info';
import HContainer from '~/components/common/HContainer';
import UserAddOrEditDialog from '~/components/safety/user/UserAddOrEditDialog';

export default {
	name: 'user-detail',
	components: {
		Info,
		HContainer,
		UserAddOrEditDialog,
	},
	data() {
		return {
			dialogEditUserVisible: false,
			baseInfo: {
				account: '13651478554',
				name: 'Benson',
				depart: ['权力者游戏'],
				role: ['奇异博士'],
				phone: '13651478554',
				email: '919624732@qq.com',
				password: '123456',
			},
			tableData: [
				{
					id: 1,
					role: '蝙蝠侠',
					desc: '管理卡资源系统，对卡进行运营管理。',
				},
				{
					id: 2,
					role: '运营管理员',
					desc: '管理卡资源系统，对卡进行运营管理。',
				},
				{
					id: 3,
					role: '采购审批负责人',
					desc: '管理卡资源系统，对卡进行运营管理。',
				},
				{
					id: 4,
					role: '卡资源运营管理员',
					desc: '管理卡资源系统，对卡进行运营管理。',
				},
			],
			form: {
				simCode: true,
				brother: false,
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
		};
	},
	methods: {
		onEdit() {
			this.dialogEditUserVisible = true;
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
		handleDelete(row) {
			this.$confirm(`当前选定角色为【${row.role}】，是否确认移除 ?`, '提示', {
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
		editUser(params) {
			console.log(params);
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
