/*
 * [金额格式化]
 * 参数说明：
 * number：要格式化的数字
 * decimals：保留几位小数
 * decPoint：小数点符号
 * thousandsSep：千分位符号
 * roundtag:舍入参数，默认 'ceil' 向上取,'floor'向下取,'round' 四舍五入
 * */
export const amtFormat = (
	amount,
	decimals,
	decPoint,
	thousandsSep,
	roundtag
) => {
	const numberStr = `${amount}`.replace(/[^0-9+-Ee.]/g, '');
	const roundtagStr = roundtag || 'ceil';
	const n = !isFinite(+numberStr) ? 0 : +numberStr;
	const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
	const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;
	const dec = typeof decPoint === 'undefined' ? '.' : decPoint;
	let s = '';
	const toFixedFix = (n, prec) => {
		const k = Math.pow(10, prec);
		if (roundtagStr === 'floor') {
			return `${parseFloat(
				Math.floor(parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)
			) / k}`;
		}
		if (roundtagStr === 'round') {
			return `${parseFloat(
				Math.round(parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)
			) / k}`;
		}
		return `${parseFloat(
			Math.ceil(parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)
		) / k}`;
	};
	s = (prec ? toFixedFix(n, prec) : `${Math.round(n)}`).split('.');
	const re = /(-?\d+)(\d{3})/;
	while (re.test(s[0])) {
		s[0] = s[0].replace(re, `$1${sep}$2`);
	}

	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
};
