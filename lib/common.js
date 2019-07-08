// 隐藏手机号中间4位
export function replaceTel(text) {
	return text.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
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
