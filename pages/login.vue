<template>
	<section class="container">
		<div class="login">
			<div class="header">
				<img src="~/assets/images/login-icon.png" alt="登录logo" />
				<p>Skyroam 后台业务管理系统</p>
				<span>Business Manage System</span>
			</div>
			<div class="form-container">
				<el-form :model="user">
					<el-form-item>
						<el-input
							type="text"
							name="account"
							clearable
							size="small"
							placeholder="请输入用户名称"
							:class="{ focus: focus === 'account' }"
							@focus="onFocus"
							v-model="user.account"
							v-on:keyup.enter.native="onLogin"
						>
							<i slot="prefix" class="iconfont icon-Contacts"></i>
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-input
							type="password"
							name="password"
							size="small"
							clearable
							placeholder="请输入登录密码"
							:class="{ focus: focus === 'password' }"
							@focus="onFocus"
							v-model="user.password"
							v-on:keyup.enter.native="onLogin"
						>
							<i slot="prefix" class="iconfont icon-locked"></i>
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="medium" @click="onLogin"
							>登录</el-button
						>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	layout: 'empty',
	data() {
		return {
			focus: '',
			user: {
				account: '',
				password: '',
			},
		};
	},
	methods: {
		onLogin() {
			this.$router.push('/');
		},
		onFocus(e) {
			this.focus = e.target.attributes.name.value;
		},
	},
};
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';
@import '../assets/less/style.less';

@keyframes scale {
	0% {
		transform: scale(1, 1);
	}
	50% {
		transform: scale(1.1, 1.1);
	}
	75% {
		transform: scale(1.1, 1.1);
	}
	100% {
		transform: scale(1, 1);
	}
}
.container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: auto;
	background: #f0f2f5;
	background-image: url('~assets/images/login-bg.png');
	background-repeat: no-repeat;
	background-position: center 0;
	background-size: 100%;
	.login {
		margin-top: 30vh;
		.header {
			.flexCenter;
			flex-direction: column;
			img {
				display: block;
				width: 90px;
				height: auto;
				margin-right: 8px;
			}
			p {
				font-size: @font-size20;
				color: #fff;
				margin: 0;
				text-shadow: @text-shadow-main;
				font-weight: bold;
			}
			span {
				font-size: @font-size14;
				color: #fff;
				margin-bottom: 24px;
				text-shadow: @text-shadow-main;
			}
		}
		.form-container {
			width: 280px;
			margin: 0 auto;
			.el-form-item {
				margin-bottom: 16px;
				& /deep/ .el-form-item__content {
					line-height: 38px;
				}
			}
			.el-input {
				border-radius: 4px;
				border: 1px solid rgba(255, 255, 255, 0.3);
				background: rgba(255, 255, 255, 0.5);
				&.focus {
					animation: scale 0.1s;
				}
				&:hover {
					background: transparent;
					border: 1px solid rgba(255, 255, 255, 0.8);
					& /deep/ input {
						border-color: rgba(255, 255, 255, 0.8);
					}
				}
				& /deep/ input {
					margin-left: 40px;
					width: calc(100% - 40px);
					padding-left: 12px;
					background: transparent;
					border: none;
					border-radius: 0;
					border-left: 1px solid rgba(255, 255, 255, 0.5);
					color: #fff;
					font-weight: bold;
					&::-webkit-input-placeholder {
						/* WebKit, Blink, Edge */
						color: #fff;
						font-weight: bold;
					}
					&:-moz-placeholder {
						/* Mozilla Firefox 4 to 18 */
						color: #fff;
						font-weight: bold;
					}
					&::-moz-placeholder {
						/* Mozilla Firefox 19+ */
						color: #fff;
						font-weight: bold;
					}
					&:-ms-input-placeholder {
						/* Internet Explorer 10-11 */
						color: #fff;
						font-weight: bold;
					}
				}
				& /deep/ .el-input__prefix {
					color: #fff;
					left: 12px;
				}
				& /deep/ .el-input__suffix {
					i {
						color: #fff;
					}
				}
			}
			button {
				margin-top: 8px;
				width: 100%;
				background-color: @background-blue;
			}
		}
	}
}
</style>
