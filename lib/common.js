/* eslint-disable no-bitwise */

/**
 * [replaceTel 隐藏手机号中间4位]
 * @param  {[type]} text [description]
 * @return {[type]}      [description]
 */
export function replaceTel(text) {
	return text.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/**
 * [judgeCORS 判断是否存在跨域]
 * @param  {[type]} url [请求地址]
 * @return {[type]}     [返回 Boolean]
 */
export function judgeCORS(url) {
	if (url && url.indexOf('//') > -1) {
		const origin = `${url.split('//')[0]}//${url.split('//')[1].split('/')[0]}`;
		if (window.location.origin !== origin) {
			return true;
		}
	}
	return false;
}

/**
 * [trim 去所有空格]
 * @param  {[type]} str [源字符串]
 * @return {[type]}     [返回以去除空格字符串]
 */
export function trim(str) {
	return str.replace(/\s/g, '');
}

/**
 * [createObjectURL 本地图片转换为本地可预览地址]
 * @param  {[type]} file [本地文件对象]
 * @return {[type]}      [返回可预览地址]
 */
export function createObjectURL(file) {
	let url = '';
	if (window.createObjectURL) {
		// basic
		url = window.createObjectURL(file);
	} else if (window.URL) {
		// mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL) {
		// webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}

/**
 * [getItemByRecursion 递归数组查找项]
 * @param  {[type]} list     [源数组]
 * @param  {[type]} childKey [数组子集 Key]
 * @param  {[type]} signkey  [查找标识 Key]
 * @param  {[type]} val      [查找 val]
 * @return {[type]}          [返回查找项]
 */
export function getItemByRecursion(list, childKey, signkey, val) {
	let curItem = null;
	function getChild(curList) {
		for (let i = 0; i < curList.length; i += 1) {
			const item = curList[i];
			if (item[signkey] === val) {
				curItem = JSON.parse(JSON.stringify(item));
				break;
			} else if (item[childKey] && item[childKey].length) {
				getChild(item[childKey]);
			}
		}
	}
	list && getChild(list);
	return curItem;
}

/**
 * [setItemValByRecursion 递归设置数组中的属性值]
 * @param {[type]} list     [源数组]
 * @param {[type]} childKey [数组子集 Key]
 * @param {[type]} signkey  [查找标识 Key]
 * @param {[type]} val      [待设置 value]
 */
export function setItemValByRecursion(list, childKey, signkey, val) {
	function setChildVal(curList) {
		for (let i = 0; i < curList.length; i += 1) {
			const item = curList[i];
			item[signkey] = val;
			if (item[childKey] && item[childKey].length) {
				setChildVal(item[childKey]);
			}
		}
	}
	list && setChildVal(list);
}

/**
 *
 * [getKeysByRecursion 递归数组查找keys数组]
 * @param  {[type]} list     [源数组]
 * @param  {[type]} childKey [数组子集 Key]
 * @param  {[type]} signkey  [查找标识 Key]
 * @return {[type]}          [返回keys集合，无层级的]
 */
export function getKeysByRecursion(list, childKey, signkey) {
	const keys = [];
	function getKey(curList) {
		for (let i = 0; i < curList.length; i += 1) {
			const item = curList[i];
			if (item[signkey] !== undefined) {
				keys.push(item[signkey]);
			}
			if (item[childKey] && item[childKey].length) {
				getKey(item[childKey]);
			}
		}
	}
	list && getKey(list);
	return keys;
}

/**
 * [strArrayBuffer 字符串转 ArrayBuffer]
 * @param  {[type]} str [字符串]
 * @return {[type]}     [Buffer]
 */
export function strArrayBuffer(str) {
	const buf = new ArrayBuffer(str.length);
	const view = new Uint8Array(buf);
	for (let i = 0; i !== str.length; i += 1) view[i] = str.charCodeAt(i) & 0xff;
	return buf;
}

/**
 * [download description]
 * @param  {[type]} url      [下载地址，也可以是一个blob对象，必选]
 * @param  {[type]} fileName [保存文件名，可选]
 * @return {[type]}          [description]
 */
export function download(url, fileName) {
	let _url = url;
	if (typeof _url === 'object' && _url instanceof Blob) {
		_url = URL.createObjectURL(_url); // 创建blob地址
	}
	const aLink = document.createElement('a');
	aLink.href = _url;
	aLink.download = fileName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
	let event;
	if (window.MouseEvent) {
		event = new MouseEvent('click');
	} else {
		event = document.createEvent('MouseEvents');
		event.initMouseEvent(
			'click',
			true,
			false,
			window,
			0,
			0,
			0,
			0,
			0,
			false,
			false,
			false,
			false,
			0,
			null
		);
	}
	aLink.dispatchEvent(event);
}
