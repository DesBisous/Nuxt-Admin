/**
 * [结算状态]
 * @param  val [description]
 * @return     [description]
 */
export const brokerageSettleState = val => {
	switch (val) {
		case '0':
			return '未结算';
		case '1':
			return '已结算';
		default:
			return val;
	}
};
