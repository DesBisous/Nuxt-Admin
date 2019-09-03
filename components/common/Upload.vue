<template>
	<el-upload
		v-loading="loading"
		:class="[
			avatarSize,
			uploadType === 'img' ? 'avatar-uploader' : 'button-uploader',
		]"
		:drag="drag"
		:disabled="disabled"
		:action="uploadUrl"
		:headers="headers"
		:show-file-list="true"
		:on-success="handleAvatarSuccess"
		:on-error="handleAvatarError"
		:before-upload="beforeAvatarUpload"
	>
		<template v-if="uploadType === 'img'">
			<img v-if="imageUrl" :src="imageUrl" class="avatar" />
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</template>
		<template v-else>
			<el-button type="primary" size="small" icon="ios-cloud-upload-outline">{{
				autoUpload ? '上传文件' : '选取文件'
			}}</el-button>
		</template>
	</el-upload>
</template>
<script>
const requestHeaders = {
	Accept: 'application/json',
};
export default {
	name: 'Upload',
	props: {
		// 如果使用七牛的服务器，那个就去看 https://github.com/PanJiaChen/vue-element-admin 项目
		uploadUrl: {
			type: String,
			default: 'https://jsonplaceholder.typicode.com/posts/',
		},
		uploadType: {
			type: String,
			default: 'img',
		},
		fileType: {
			type: String,
			default: '*',
		},
		imageUrl: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		autoUpload: {
			type: Boolean,
			default: true,
		},
		avatarSize: {
			// default / medium / small
			type: String,
			default: 'default',
		},
		drag: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			loading: false,
			headers: {
				...requestHeaders,
			},
		};
	},
	methods: {
		handleFileComplete(file) {
			this.$emit('uploadCallBack', file);
		},
		handleAvatarSuccess(res, file) {
			this.loading = false;
			if (res.code === 0) {
				this.$emit('uploadCallBack', file, res.data);
				return;
			}
			if (res.errMsg) {
				this.$message.error(res.errMsg);
			}
		},
		handleAvatarError(error) {
			this.loading = false;
			this.$message.error(`文件上传失败[${error.status}]`);
		},
		beforeAvatarUpload(file) {
			// 文件格式判断
			const nameSplit = file.name.split('.');
			const type = nameSplit[nameSplit.length - 1];
			const fileType = this.fileType.split(',');
			const isType = fileType.includes(type);
			if (this.fileType !== '*' && !isType) {
				this.$message.error(`请选择 [${this.fileType}] 格式文件`);
				return false;
			}
			// 文件大小判断
			const isLt10M = file.size / 1024 / 1024 < 10;
			if (!isLt10M) {
				this.$message.error('文件大小不得超过10M');
				return false;
			}
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
			}, 1000);
			// 不自动 ajax 上传文件时返还已选择的文件信息
			!this.autoUpload && this.handleFileComplete(file);
			return this.autoUpload;
		},
	},
};
</script>
<style lang="less" scoped>
@import '../../assets/less/style.less';

.avatar-uploader {
	width: 148px;
	height: 148px;
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	&:hover {
		border-color: @blue;
		.avatar-uploader-icon {
			color: @blue;
		}
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 148px;
		height: 148px;
		line-height: 148px;
		text-align: center;
	}
	.avatar {
		width: 148px;
		height: 148px;
		display: block;
	}
	& /deep/ .el-upload-dragger {
		width: 148px;
		height: 148px;
		line-height: 148px;
		border: none;
	}
	&.medium {
		width: 128px;
		height: 128px;
		.avatar-uploader-icon {
			width: 128px;
			height: 128px;
			line-height: 128px;
		}
		.avatar {
			width: 128px;
			height: 128px;
		}
		& /deep/ .el-upload-dragger {
			width: 128px;
			height: 128px;
			line-height: 128px;
		}
	}
	&.small {
		width: 108px;
		height: 108px;
		.avatar-uploader-icon {
			width: 108px;
			height: 108px;
			line-height: 108px;
		}
		.avatar {
			width: 108px;
			height: 108px;
		}
		& /deep/ .el-upload-dragger {
			width: 108px;
			height: 108px;
			line-height: 108px;
		}
	}
}
.button-uploader {
	display: inline-block;
}
</style>
