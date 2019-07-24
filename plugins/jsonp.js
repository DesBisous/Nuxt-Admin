import Vue from 'vue';
import qs from 'qs';
import jsonp from 'jsonp';

export default () => {
	// jsonp
	Vue.prototype.$jsonp = (url, data) =>
		new Promise((resolve, reject) => {
			jsonp(
				url,
				{
					param: `${qs.stringify(data)}&callback`,
					name: `jsonp_${new Date().getTime()}`,
					timeout: 10000,
				},
				(err, res) => {
					if (err) {
						reject(new Error(err.message));
					}
					resolve({
						code: 1,
						data: res,
						msg: '请求成功',
					});
				}
			);
		}).catch(err => {
			let errorMsg = '';
			switch (err.message) {
				case 'Timeout':
					errorMsg = 'jsonp 跨域请求超时[Timeout]';
					break;
				default:
					errorMsg = err.message;
			}
			return {
				code: 0,
				msg: errorMsg,
			};
		});
};
