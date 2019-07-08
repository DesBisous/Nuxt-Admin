<template lang="html">
	<Dialog
		:title="title"
		:visible="dialogVisible"
		@update:visible="onClose"
		width="560px"
	>
		<el-form
			:model="appForm"
			:rules="appRules"
			ref="appRuleForm"
			label-position="right"
			label-width="100px"
		>
			<el-form-item label="成员账号:" prop="account">
				<el-input
					size="small"
					v-model="appForm.account"
					placeholder="请输入成员账号"
				></el-input>
			</el-form-item>
			<el-form-item label="成员姓名:" prop="name">
				<el-input
					size="small"
					v-model="appForm.name"
					placeholder="请输入成员姓名"
				></el-input>
			</el-form-item>
			<el-form-item label="所属部门:" prop="depart">
				<el-select
					size="small"
					v-model="appForm.depart"
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
			<el-form-item label="角色:" prop="role">
				<el-select
					size="small"
					v-model="appForm.role"
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
			<el-form-item label="联系电话:" prop="phone">
				<el-input
					size="small"
					v-model="appForm.phone"
					placeholder="请输入电话或者手机号"
				></el-input>
			</el-form-item>
			<el-form-item label="邮箱:" prop="email">
				<el-input
					size="small"
					v-model="appForm.email"
					placeholder="请输入邮箱地址"
				></el-input>
			</el-form-item>
			<el-form-item label="登录密码:" prop="password">
				<el-input
					type="password"
					size="small"
					v-model="appForm.password"
					placeholder="请输入登录密码"
				></el-input>
			</el-form-item>
		</el-form>
		<template slot="footer">
			<el-button size="small" @click="onClose">取 消</el-button>
			<el-button type="primary" size="small" @click="onSure">
				确 定
			</el-button>
		</template>
	</Dialog>
</template>

<script>
import Dialog from '~/components/common/Dialog';
import { landlines, mobile, validEmail } from '~/lib/validateUtils';

export default {
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			required: true,
		},
		departs: {
			type: Array,
			default: () => [],
		},
		roles: {
			type: Array,
			default: () => [],
		},
		initData: {
			type: Object,
			default: null,
		},
	},
	components: {
		Dialog,
	},
	// 这里要来一个 watch 监听外部的传入的初始化数据
	watch: {
		initData: {
			handler(val, oldVal) {
				if (val && JSON.stringify(val) !== JSON.stringify(oldVal)) {
					this.appForm = {
						...this.appForm,
						...val,
					};
				}
			},
			deep: true, // 深层监听，某个属性值变了，就要更新组件的 appForm 数据
			immediate: true,
		},
	},
	computed: {
		dialogVisible() {
			this.visible && this.$nextTick(this.afterClose);
			return this.visible;
		},
	},
	data() {
		return {
			appForm: {
				account: '',
				name: '',
				depart: '',
				role: '',
				phone: '',
				email: '',
				password: '',
			},
			appRules: {
				account: [
					{ required: true, message: '请输入成员账号', trigger: 'blur' },
				],
				name: [{ required: true, message: '请输入成员姓名', trigger: 'blur' }],
				depart: [
					{ required: true, message: '请选择所属部门', trigger: 'change' },
				],
				role: [{ required: true, message: '请选择角色', trigger: 'change' }],
				phone: [{ validator: this.validatePhone, trigger: 'blur' }],
				email: [{ validator: this.validateEmail, trigger: 'blur' }],
				password: [
					{ required: true, message: '请输入登录密码', trigger: 'blur' },
				],
			},
		};
	},
	methods: {
		onClose() {
			this.$emit('update:visible', false);
		},
		onSure() {
			this.$refs.appRuleForm.validate(valid => {
				if (valid) {
					this.$emit('onSure', this.appForm);
				}
			});
		},
		afterClose() {
			// 传入 Dialog 默认仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效。
			this.$refs.appRuleForm.clearValidate();
		},
		validatePhone(rule, value, callback) {
			if (value.length > 0 && (!landlines(value) && !mobile(value))) {
				callback('请输入正确的手机号');
			}
			callback();
		},
		validateEmail(rule, value, callback) {
			if (value.length > 0 && !validEmail(value)) {
				callback('请输入正确的邮箱');
			}
			callback();
		},
	},
};
</script>

<style lang="css" scoped></style>
