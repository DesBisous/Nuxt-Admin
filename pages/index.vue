<template>
	<section class="container">
		内容
	</section>
</template>

<script>
import { userApi } from '~/api';

export default {
	// layout: 'horizontal',
	mounted() {
		const data = {
			start: 1,
			limit: 10,
		};
		// 采用这种
		// userApi.getListAll(this.$axios, data).then(res => {
		//   console.log('res: ', res);
		// });
	},
};
</script>

<style></style>
