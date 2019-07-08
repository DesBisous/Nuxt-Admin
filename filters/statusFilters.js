/**
 * [结算状态]
 * @param  val [description]
 * @return     [description]
 */
export const brokerageSettleState = val => {
	let state = '';
	switch (val) {
		case '0':
			state = '未结算';
			break;
		case '1':
			state = '已结算';
			break;
		default:
			state = '';
			break;
	}
	return state;
};
