/**
 * /日期数组转时间戳
 * @param  {[array]} date [year, month, date]
 * @return {[string]}      [description]
 */
export function dateToTimestamp(dateArr) {
	const date = new Date();
	date.setFullYear(dateArr[0]);
	date.setMonth(dateArr[1]);
	date.setDate(dateArr[2]);
	return Date.parse(date) / 1000;
}

/**
 * /时间戳转日期
 * @param  {[string]} timestamp [description]
 * @return {[string]}           ["2018-01-01"]
 */
export function timestampToDate(timestamp) {
	const date = new Date(timestamp * 1000);
	const y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? `0${m}` : m;
	let d = date.getDate();
	d = d < 10 ? `0${d}` : d;
	return `${y}-${m}-${d}`;
}

/**
 * /时间戳转日期
 * @param  {[string]} timestamp [description]
 * @return {[string]}           ["2018年01月01日"]
 */
export function timestampToYMD(timestamp) {
	const date = new Date(timestamp * 1000);
	const y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? `0${m}` : m;
	let d = date.getDate();
	d = d < 10 ? `0${d}` : d;
	return `${y}年${m}月${d}日`;
}

// 时间戳转时间
export function timestampAll(timestamp) {
	const date = new Date(timestamp * 1000);
	const y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? `0${m}` : m;
	let d = date.getDate();
	d = d < 10 ? `0${d}` : d;
	let h = date.getHours();
	h = h < 10 ? `0${h}` : h;
	let t = date.getMinutes();
	t = t < 10 ? `0${t}` : t;
	return `${y}-${m}-${d} ${h}:${t}`;
}

//计算当天23:59:59时间戳（秒为单位）
export function todayTimestamp(time) {
	const _time = time + 23 * 60 * 60 + 59 * 60 + 59;
	return _time;
}

/**@method formatDate  可根据参数返回对应时间格式
 * @param {Date} date 时间 new Date()
 * @param {String} format 格式化字符串 例如：yyyy-MM-dd hh:mm:ss
 * @return {String}
 */
export function formatDate(date, format) {
	const _date = {
		y: date.getFullYear(),
		M: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		m: date.getMinutes(),
		s: date.getSeconds(),
	};
	return format.replace(/(y+|M+|d+|h+|m+|s+)/g, v =>
		((v.length > 1 ? '0' : '') + eval(`_date.${v.slice(-1)}`)).slice(
			-(v.length > 2 ? v.length : 2)
		)
	);
}
