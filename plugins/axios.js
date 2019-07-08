export default app => {
	const axios = app.$axios;

	// 基本配置
	axios.defaults.timeout = 30000;

	// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
	axios.defaults.headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

	// 添加请求拦截器
	axios.onRequest(config => config);

	// 添加响应拦截器
	axios.onResponse(res => ({
		code: 1,
		data: res.data,
		msg: '请求成功',
	}));

	// 错误回调
	axios.onError(error => {
		let errorMsg = null;
		if (error.response) {
			// console.log(window.document.cookie);
			if (error.response.status === 401) {
				errorMsg = `登录失效，请重新登录[${error.response.status}]`;
			}
			if (error.response.status === 400) {
				errorMsg = `请求无效[${error.response.status}]`;
			}
			if (error.response.status === 404) {
				errorMsg = `请求不存在[${error.response.status}]`;
			}
			if (error.response.status === 500) {
				errorMsg = `服务器错误[${error.response.status}]`;
			}
			if (error.response.status === 501) {
				errorMsg = `服务器维护或宕机[${error.response.status}]`;
			}
			errorMsg = `网络异常[${error.response.status}]`;
		} else if (error.request) {
			// 超时
			if (error.request.readyState === 4 && error.request.status === 0) {
				errorMsg = '请求超时';
			} else {
				errorMsg = '请求失败';
			}
		}
		return {
			code: 0,
			msg: errorMsg,
		};
	});
};
