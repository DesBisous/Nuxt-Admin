const user = {
	getUsers: (axios, data) => axios.post('/api/srms-web/vsim/getPagew', data),
	getListAll: (axios, data) =>
		axios.post('/gyenno-admin/dict/api/apiListAll', data),
};

export default user;
