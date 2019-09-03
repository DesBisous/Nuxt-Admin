<template>
	<section class="container">
		内容
	</section>
</template>

<script>
import { userApi } from '~/api';

export default {
	layout: 'scroll',
	mounted() {
		const data = {
			start: 1,
			limit: 10,
		};
		// 采用这种
		// userApi.getListAll(this.$axios, data).then(res => {
		// 	console.log('res: ', res);
		// });
		userApi.getCorssDomain(this.$axios, data).then(res => {
			console.log('res: ', res);
		});
		// userApi.getJsonpCorssDomain(this.$jsonp, data).then(res => {
		// 	console.log('res: ', res);
		// });
	},
};
</script>

<style></style>
