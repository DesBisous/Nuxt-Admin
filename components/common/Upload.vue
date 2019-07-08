<template>
	<el-upload
		v-loading="loading"
		class="avatar-uploader"
		:class="avatarSize"
		:drag="drag"
		:auto-upload="autoUpload"
		:disabled="disabled"
		:action="uploadUrl"
		:headers="headers"
		:show-file-list="false"
		:on-preview="handleAvatarPreview"
		:on-success="handleAvatarSuccess"
		:on-error="handleAvatarError"
		:before-upload="beforeAvatarUpload"
	>
		<img v-if="imageUrl" :src="imageUrl" class="avatar" />
		<i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>
</template>
<script>
const requestHeaders = {
	Accept: 'application/json',
};
export default {
	name: 'upload',
	props: {
		// 如果使用七牛的服务器，那个就去看 https://github.com/PanJiaChen/vue-element-admin 项目
		uploadUrl: {
			type: String,
			default: 'https://jsonplaceholder.typicode.com/posts/',
		},
		fileType: {
			type: String,
			default: 'image',
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
		handleAvatarPreview(file) {
			this.$emit('uploadCallBack', file);
		},
		handleAvatarSuccess(res, file) {
			this.loading = false;
			if (res.code === 0) {
				this.$emit('uploadCallBack', file, res.data);
				return;
			}
			this.$message(res);
		},
		handleAvatarError(error) {
			this.loading = false;
			this.$message.error(`文件上传失败[${error.status}]`);
		},
		beforeAvatarUpload(file) {
			const isRightType = file.type.indexOf(this.fileType) !== -1;
			const isLt10M = file.size / 1024 / 1024 < 10;
			if (!isRightType) {
				this.$message('文件格式不正确');
			}
			if (!isLt10M) {
				this.$message('文件大小不得超过10M');
			}
			this.loading = true;
			// 接口可以传了，就把这里的方法调用去掉
			this.$emit('uploadCallBack', file);
			setTimeout(() => {
				this.loading = false;
			}, 1000);
			return isRightType && isLt10M && false;
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
</style>
