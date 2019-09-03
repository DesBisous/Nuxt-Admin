<template lang="html">
	<section class="container">
		<HContainer title="Excel 导入导出">
			<el-row>
				<el-col :span="24">
					<ReadXLS @readXlsCallBack="readXlsCallBack" />
					<WriteXLS :xlsData="xlsData" />
				</el-col>
			</el-row>
			<el-row v-if="xlsData">
				<el-col :span="24">
					<el-tabs v-model="activeName">
						<el-tab-pane
							v-for="(item, name) in xlsData"
							:key="name"
							:label="name"
							:name="name"
						>
							<el-table
								header-cell-class-name="tabel-header-cell"
								:data="item.tbody"
							>
								<el-table-column
									v-for="label in item.thead"
									:key="label"
									:prop="label"
									:label="label"
								>
								</el-table-column>
							</el-table>
						</el-tab-pane>
					</el-tabs>
				</el-col>
			</el-row>
		</HContainer>
	</section>
</template>

<script>
import HContainer from '~/components/common/HContainer';
import ReadXLS from '~/components/excel/ReadXLS';
import WriteXLS from '~/components/excel/WriteXLS';

export default {
	name: 'excel',
	components: {
		HContainer,
		ReadXLS,
		WriteXLS,
	},
	data() {
		return {
			xlsData: null,
			activeName: '',
		};
	},
	methods: {
		/**
		 * [readXlsCallBack]
		 * 格式
		 * data: {
		 *   Sheet1: {
		 *     thead: [key1. key2],
		 *     tbody: [{key1: 1, keys2: 2}, {key1: 3, keys2: 4}],
		 *   },
		 *   Sheet2: {
		 *     thead: [key1. key2],
		 *     tbody: [{key1: 1, keys2: 2}, {key1: 3, keys2: 4}],
		 *   },
		 * }
		 */
		readXlsCallBack(data) {
			const keys = data ? Object.keys(data) : [];
			if (keys.length > 0) this.activeName = Object.keys(data)[0];
			this.xlsData = data;
		},
	},
};
</script>

<style lang="less" scoped></style>
