/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax*/
/**@method setCookie  存储cookie
 * @param {String} name cookie名字
 * @param {String} value cookie值
 * @param {Number} time  cookie过期时间格式1970/01/01,
 * @param {String} domain cookie所在的域，默认为请求的地址
 * @param {String} path cookie所在的目录，默认为/，就是根目录。
 * @return {Undefined}
 */
export function setCookie(name, value, time, domain, path) {
	let str = `${name}=${encodeURIComponent(value)}`;
	if (time) {
		const date = new Date(time).toGMTString();
		str += `;expires=${date}`;
	}
	str = domain ? `${str};domain=${domain}` : str;
	str = path ? `${str};path=${path}` : str;
	document.cookie = str;
}
/**
 * @method getCookie  根据cookie的name获取cookie值
 * @param  {name} cookie名
 * @return {String} 返回cookie值
 */
export function getCookie(name) {
	const cookieStr = document.cookie;
	let end;
	if (cookieStr.length > 0) {
		let start = cookieStr.indexOf(`${name}=`);
		if (start > -1) {
			start += name.length + 1;
			end = cookieStr.indexOf(';', start);
			if (end === -1) {
				end = cookieStr.length;
			}
			return decodeURIComponent(cookieStr.slice(start, end));
		}
	}
	return '';
}
/**
 * @method deleteCookie
 * @param  {String} name   cookie名
 * @param  {String} domain cookie所在的域，默认为请求的地址
 * @param  {String} path   cookie所在的目录，默认为/，就是根目录。
 * @return {undefined}        未定义
 */
export function deleteCookie(name, domain, path) {
	const date = new Date('1970/01/01');
	let str = `${name}=null;expires=${date.toGMTString()}`;
	str = domain ? `${str};domain=${domain}` : str;
	str = path ? `${str};path=${path}` : str;
	document.cookie = str;
}
