/* eslint-disable no-useless-escape */

// 验证手机号
export function mobile(text) {
	return /^1[2-9]\d{9}$/.test(text);
}
// 验证密码
export function pwd(text) {
	// return /^([A-Z]|[a-z]|[0-9]){6,16}$/.test(text);
	// return /^[a-zA-Z0-9\S]{6,16}$/.test(text);
	return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z][\x20-\x7f]{5,15}$/.test(text);
}
// 验证验证码
export function authCode(text) {
	return /^\d{6}$/.test(text);
}
// 验证图形验证码
export function imgCode(text) {
	return /^[0-9a-zA-Z]{4}$/.test(text);
}
// 验证座机号
export function landlines(text) {
	return /^0\d{2,3}-[1-9]\d{6,7}$/.test(text);
}
// 验证金额
export function money(text) {
	return /(^[1-9]([0-9]{0,})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(
		text
	);
}
//验证银行卡号
export function isBankNumber(text) {
	return /^([1-9]{1})(\d{14}|\d{15}|\d{18})$/.test(text);
}
//验证是否为身份证号
export function isIdCard(text) {
	return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(text);
}
//验证是否为港澳台通行证
export function isHKAndTW(text) {
	return /(^([a-z]|[A-Z]|[0-9]){9}$)|(^([a-z]|[A-Z]|[0-9]){8}$)|(^([a-z]|[A-Z]|[0-9]){18}$)/.test(
		text
	);
}
//验证是否为护照
export function isPassPort(text) {
	return /^[0-9a-zA-Z]/.test(text);
}
//验证输入框的值是否为空
export function isEmpty(text) {
	const reg = /^\s*$/g;
	if (reg.test(text) || text === '' || text === null) {
		return false;
	}
	return true;
}
//营业执照验证
export function isBizIdNo(text) {
	return /^([0-9a-zA-Z]{15}|[0-9a-zA-Z]{18})$/.test(text);
}

// 验证 url 是否正确
export function validURL(url) {
	const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	return reg.test(url);
}

// 验证 Email
export function validEmail(email) {
	const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(email);
}
