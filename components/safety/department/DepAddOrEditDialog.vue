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
			<el-form-item label="部门名称:" prop="departName">
				<el-input
					size="small"
					v-model="appForm.departName"
					placeholder="请输入部门名称"
				></el-input>
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
			<el-form-item label="部门负责人:" prop="name">
				<el-input
					size="small"
					v-model="appForm.name"
					placeholder="请输入部门负责人"
				></el-input>
			</el-form-item>
			<el-form-item label="部门描述:" prop="departDesc">
				<el-input
					type="textarea"
					size="small"
					:rows="4"
					v-model="appForm.departDesc"
					placeholder="请输入部门描述"
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
				departName: '',
				role: '',
				name: '',
				departDesc: '',
			},
			appRules: {
				departName: [
					{ required: true, message: '请输入部门名称', trigger: 'blur' },
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
	},
};
</script>

<style lang="css" scoped></style>
