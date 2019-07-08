<template>
	<section class="container">
		<HContainer title="系统应用管理" pureheader>
			<div class="application-header">
				<div class="desc">
					<p>
						新建应用后在配置中心进行相关配置，将系统集成进入安全中心统一管理；
					</p>
					<p>通过应用管理管理所有企业内部系统应用。</p>
				</div>
				<el-button
					type="primary"
					size="small"
					icon="el-icon-edit"
					@click="onAdd"
				>
					新增应用
				</el-button>
			</div>
		</HContainer>
		<div class="application-container">
			<el-row :gutter="20">
				<el-col
					:xs="24"
					:sm="12"
					:md="8"
					:lg="6"
					:xl="6"
					:key="index"
					v-for="(app, index) in apps"
				>
					<MediaCard
						:imgUrl="app.img"
						:title="app.zhName"
						:subTitle="app.enName"
						:desc="app.desc"
						@click="goDetail"
					>
						<div class="operation">
							<a class="edit" @click.stop="onEdit">编辑</a>
							<div class="vertical"></div>
							<a class="del" @click.stop="onDelete">删除</a>
						</div>
					</MediaCard>
				</el-col>
			</el-row>
		</div>
		<Dialog :title="dialogTitle" :visible.sync="dialogVisible" width="560px">
			<el-form
				:model="appForm"
				:rules="appRules"
				ref="appRuleForm"
				label-position="right"
				label-width="100px"
			>
				<el-form-item label="应用图片:" prop="img">
					<Upload
						avatarSize="small"
						:imageUrl="appForm.img"
						@uploadCallBack="uploadCallBack"
					></Upload>
				</el-form-item>
				<el-form-item label="应用中文名:" prop="zhName">
					<el-input
						size="small"
						v-model="appForm.zhName"
						placeholder="请输入中文名"
					></el-input>
				</el-form-item>
				<el-form-item label="应用英文名:" prop="enName">
					<el-input
						size="small"
						v-model="appForm.enName"
						placeholder="Please enter your English name"
					></el-input>
				</el-form-item>
				<el-form-item label="应用描述:" prop="desc">
					<el-input
						type="textarea"
						size="small"
						:rows="4"
						v-model="appForm.desc"
						placeholder="请输入描述"
					></el-input>
				</el-form-item>
			</el-form>
			<template slot="footer">
				<el-button size="small" @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" size="small" @click="dialogVisible = false"
					>确 定</el-button
				>
			</template>
		</Dialog>
	</section>
</template>

<script>
import HContainer from '~/components/common/HContainer';
import Upload from '~/components/common/Upload';
import MediaCard from '~/components/common/MediaCard';
import Dialog from '~/components/common/Dialog';
import { createObjectURL } from '~/lib/common';

const dog = require('~/assets/images/dog.png');

export default {
	name: 'application',
	components: {
		Dialog,
		Upload,
		HContainer,
		MediaCard,
	},
	created() {
		for (let i = 0; i < 7; i += 1) {
			this.apps.push({
				img: dog,
				zhName: '安全中心',
				enName: 'Safety Center',
				desc:
					'人生就像一盒各式各样的巧克力，你永远不会知道下一块将会是哪种.人生就两个选择“要么忙着活要么忙着死.',
			});
		}
	},
	data() {
		return {
			apps: [],
			dialogTitle: '',
			dialogVisible: false,
			appForm: {
				img: '',
				zhName: '',
				enName: '',
				desc: '',
			},
			appRules: {
				img: [{ required: true, message: '请上传图片', trigger: 'change' }],
				zhName: [
					{ required: true, message: '请输入应用中文名', trigger: 'blur' },
				],
				enName: [
					{ required: true, message: '请输入应用英文名', trigger: 'blur' },
				],
			},
		};
	},
	methods: {
		onAdd() {
			this.dialogTitle = '新增应用';
			this.dialogVisible = true;
		},
		onEdit() {
			this.dialogTitle = '编辑应用';
			this.dialogVisible = true;
		},
		onDelete() {
			this.$confirm('删除系统将同时删除应用节点数据，是否确认删除 ?', '提示', {
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
						message: '已取消删除',
					});
				});
		},
		goDetail() {
			this.$router.push('/sys/safety/application/detail');
		},
		uploadCallBack(file, data) {
			console.log(file);
			console.log(data);
			this.appForm.img = createObjectURL(file);
		},
	},
};
</script>

<style lang="less" scoped>
@import '../../../../assets/less/style.less';
@import '../../../../assets/less/base.less';

.application-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding-bottom: 16px;
	.desc {
		font-size: @font-size14;
	}
}
.application-container {
	.operation {
		position: absolute;
		left: 0;
		bottom: -36px;
		width: 100%;
		height: 36px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: all 0.4s ease;
		opacity: 0;
		background-color: @background-gray;
		font-size: @font-size12;
		color: @font-color-second;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		.edit,
		.del {
			width: 49%;
			text-align: center;
			cursor: pointer;
			height: 100%;
			line-height: 36px;
		}
		.edit {
			&:hover {
				color: @blue;
			}
		}
		.del {
			&:hover {
				color: @danger;
			}
		}
		.vertical {
			width: 1px;
			height: 16px;
			background-color: @font-color-last;
		}
	}
	.hContainer {
		&:hover {
			.operation {
				bottom: 0;
				opacity: 1;
			}
		}
	}
}
</style>
