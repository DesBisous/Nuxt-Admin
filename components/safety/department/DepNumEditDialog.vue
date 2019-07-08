<template lang="html">
	<Dialog
		title="编辑部门成员"
		:visible="dialogVisible"
		@update:visible="onClose"
		width="580px"
	>
		<section class="container">
			<div class="tip">
				<i class="el-icon-warning"></i>
				一个组内的同一成员不能被重复添加。
			</div>
			<div class="main">
				<el-row :gutter="12" type="flex">
					<el-col :span="18">
						<div class="search-input">
							<el-input
								placeholder="请输入内容"
								prefix-icon="el-icon-search"
								v-model="valSearch"
								@keyup.enter.native="onSearch"
								size="mini"
							>
							</el-input>
						</div>
						<div class="table-container">
							<el-table
								ref="tableRef"
								size="mini"
								header-cell-class-name="tabel-header-cell"
								row-key="id"
								:data="tableData"
								v-loading="loading"
								@selection-change="handleSelectionChange"
							>
								<el-table-column type="selection" width="55" reserve-selection>
								</el-table-column>
								<el-table-column prop="account" label="成员账号">
								</el-table-column>
								<el-table-column prop="name" label="成员姓名">
								</el-table-column>
								<el-table-column prop="enable" label="启用状态">
									<template slot-scope="scope">
										<span
											:class="scope.row.enable ? 'danger-text' : 'success-text'"
											>{{ scope.row.enable ? '停用' : '启用' }}</span
										>
									</template>
								</el-table-column>
							</el-table>
							<el-pagination
								small
								hide-on-single-page
								class="pagination pagination-center"
								layout="prev, pager, next"
								@current-change="handleCurrentChange"
								:current-page="page.currentPage"
								:page-size="page.pageSize"
								:total="page.total"
							>
							</el-pagination>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="operation">
							<span>已选择（{{ selecteds.length }}）</span>
							<a @click="clearSelection">清除</a>
						</div>
						<div class="selected-list">
							<VueScroll :ops="ops">
								<ul>
									<li v-for="(item, index) in selecteds" :key="item.id">
										{{ item.id }} / {{ item.account }} / {{ item.name }}
										<i
											class="el-icon-close"
											@click="onCloseItem(item, index)"
										></i>
									</li>
								</ul>
							</VueScroll>
						</div>
					</el-col>
				</el-row>
			</div>
		</section>
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

export default {
	props: {
		id: {
			type: [Number, String],
			required: true,
		},
		visible: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		Dialog,
	},
	// 这里要来一个 watch 监听外部的传入的初始化数据
	watch: {
		visible: {
			handler(val, oldVal) {
				if (val) {
					console.log('弹窗打开时 -> 发起初始化数据获取请求');
					this.init();
				}
			},
		},
	},
	computed: {
		dialogVisible() {
			return this.visible;
		},
	},
	data() {
		return {
			loading: false,
			ops: {
				rail: {
					gutterOfSide: '0px',
				},
				bar: {
					background: '#dcdfe6',
				},
			},
			page: {
				currentPage: 1,
				pageSize: 6,
				total: 0,
			},
			valSearch: '',
			tableData: [],
			sourceData: [],
			selecteds: [],
		};
	},
	methods: {
		onClose() {
			this.$emit('update:visible', false);
		},
		onSure() {
			this.$emit('onSure', this.selecteds);
		},
		init() {
			for (let i = 0; i < 50; i += 1) {
				this.sourceData.push({
					id: i,
					account: 'Benson',
					name: '邝晓滨',
					enable: !!(i % 2),
				});
			}
			this.handleCurrentChange(1);
		},
		onSearch() {
			console.log('回车搜索');
			this.handleCurrentChange(1);
		},
		handleSelectionChange(selected) {
			const noSelecte = this.tableData.filter(
				item => !selected.find(subItem => subItem.id === item.id)
			);
			// 将已选列表不存在的已选项进行加入
			selected.forEach(item => {
				if (!this.selecteds.find(subItem => subItem.id === item.id)) {
					this.selecteds.push(item);
				}
			});
			// 将已选列表存在的但未选着上的选项进行移除
			noSelecte.forEach(item => {
				const index = this.selecteds.findIndex(
					subItem => subItem.id === item.id
				);
				index > -1 && this.selecteds.splice(index, 1);
			});
		},
		handleCurrentChange(currentPage) {
			this.loading = true;
			const cur = currentPage - 1;
			const total = this.sourceData.length;
			const start = this.page.pageSize * cur;
			const end =
				start + this.page.pageSize > total ? total : start + this.page.pageSize;
			setTimeout(() => {
				this.tableData = [...this.sourceData.slice(start, end)];
				this.page.currentPage = currentPage;
				this.page.total = total;
				this.loading = false;
			}, 2000);
		},
		clearSelection() {
			this.$refs.tableRef.clearSelection();
			this.selecteds = [];
		},
		onCloseItem(item, index) {
			this.selecteds.splice(index, 1);
			this.$refs.tableRef.toggleRowSelection(item, false);
		},
	},
};
</script>

<style lang="less" scoped>
@import '../../../assets/less/style.less';

.container {
	.tip {
		color: @warning;
		font-size: @font-size12;
		margin-bottom: 16px;
	}
	.main {
		.search-input {
			margin-bottom: 8px;
		}
		.table-container {
			border-radius: 4px;
			border: 1px solid #dcdfe6;
			overflow: hidden;
			.pagination {
				padding: 7.5px 5px;
			}
		}
	}
	.operation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
		height: 28px;
		span {
			font-size: 13px;
		}
		a {
			padding: 0 0 2px 16px;
			font-size: 12px;
			color: @blue;
			cursor: pointer;
		}
	}
	.selected-list {
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		overflow-x: hidden;
		overflow-y: auto;
		height: 296px;
		padding: 0 2px;
		font-size: @font-size12;
		ul {
			padding: 0 6px;
			li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 8px 4px;
				height: 37px;
				border-bottom: 1px solid #ebeef5;
				box-sizing: border-box;
				border-bottom: 1px solid #ebeef5;
				i {
					padding: 2px 0 0 8px;
					opacity: 0;
					cursor: pointer;
					transition: all 0.3s;
				}
				&:last-child {
					border: none;
				}
				&:hover {
					i {
						opacity: 1;
					}
				}
			}
		}
	}
}
</style>
