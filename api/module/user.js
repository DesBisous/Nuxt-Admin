const user = {
	getUsers: (axios, data) =>
		axios.post('/api/srms-web/vsim/getPagew', data, { form: true }),
	getListAll: (axios, data) =>
		axios.post('/gyenno-admin/dict/api/apiListAll', data),
	getCorssDomain: (axios, data) =>
		axios.post('http://121.12.81.99:1096/bsp-security-server/getLogUser', data),
	getJsonpCorssDomain: (jsonp, data) =>
		jsonp('http://121.12.81.99:1096/bsp-security-server/getLogUser', data),
};

export default user;
