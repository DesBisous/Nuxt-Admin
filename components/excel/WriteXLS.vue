<template lang="html">
	<el-button
		type="primary"
		size="small"
		icon="ios-cloud-upload-outline"
		@click="exportExcel"
		>导出 Excel</el-button
	>
</template>

<script>
import XLSX from 'xlsx';
import { strArrayBuffer, download } from '~/lib/common';

export default {
	name: 'WriteXLS',
	props: {
		/**
		 * 格式
		 * xlsData: {
		 *   Sheet1: 数据[json|table dom|二维数组],
		 *   Sheet2: 数据[json|table dom|二维数组],
		 * }
		 */
		xlsData: {
			type: Object,
			default: null,
		},
	},
	methods: {
		sheetBlob(workbook) {
			// 生成excel的配置项
			const wopts = {
				bookType: 'xlsx', // 要生成的文件类型
				bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
				type: 'binary',
			};
			const wbout = XLSX.write(workbook, wopts);
			const blob = new Blob([strArrayBuffer(wbout)], {
				type: 'application/octet-stream',
			});
			return blob;
		},
		sheetFormat(SheetNames) {
			const Sheets = {};
			SheetNames.forEach(key => {
				// json_to_sheet: 将一个由对象组成的数组转成sheet; 还有其他模式，查看笔记吧
				Sheets[key] = XLSX.utils.json_to_sheet(this.xlsData[key].tbody);
			});
			const workbook = { SheetNames, Sheets };
			return workbook;
		},
		exportExcel() {
			if (this.xlsData) {
				const SheetNames = Object.keys(this.xlsData);
				if (SheetNames.length > 0) {
					const sheet = this.sheetFormat(SheetNames);
					const blob = this.sheetBlob(sheet);
					download(blob, '导出.xlsx');
				} else {
					this.$message.error('导出数据不能为空');
				}
			} else {
				this.$message.error('导出数据不正确或不存在');
			}
		},
	},
};
</script>

<style lang="less" scoped></style>
