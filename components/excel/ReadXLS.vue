<template lang="html">
	<Upload
		uploadType="btn"
		fileType="xls,xlsx"
		:autoUpload="false"
		:drag="false"
		@uploadCallBack="uploadCallBack"
	>
	</Upload>
</template>

<script>
import Upload from '~/components/common/Upload';
import XLSX from 'xlsx';

export default {
	name: 'ReadXLS',
	components: {
		Upload,
	},
	methods: {
		readWorkbook(workbook) {
			const sheetNames = workbook.SheetNames; // 工作表名称集合
			const workbookFormat = {};
			sheetNames.forEach(name => {
				const worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
				// XLSX 提供了多种工具可使用，这两种最常用
				// const worksheetCsv = XLSX.utils.sheet_to_csv(worksheet); // 生成CSV格式
				const worksheetJson = XLSX.utils.sheet_to_json(worksheet); // 输出JSON格式
				const thead =
					worksheetJson.length > 0 ? Object.keys(worksheetJson[0]) : [];
				const tbody = worksheetJson;
				workbookFormat[name] = {
					thead,
					tbody,
				};
			});
			return workbookFormat;
		},
		readXLSX(file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsBinaryString(file);
				reader.onload = evt => {
					const result = evt.target.result; // 读到的数据
					const workbook = XLSX.read(result, { type: 'binary' });
					resolve(workbook);
				};
			});
		},
		async uploadCallBack(file) {
			const workbook = await this.readXLSX(file);
			const workbookFormat = this.readWorkbook(workbook);
			this.$emit('readXlsCallBack', workbookFormat);
		},
	},
};
</script>

<style lang="less" scoped></style>
