<template>
	<div class="drag-tree-table" ref="table">
		<div class="drag-tree-table-header">
			<Column
				v-for="(item, index) in data.columns"
				:width="item.width"
				:flex="item.flex"
				:key="index"
			>
				<input
					v-if="item.type === 'checkbox'"
					class="checkbox"
					type="checkbox"
					@click="onCheckAll($event)"
				/>
				<span v-else>
					{{ item.title }}
				</span>
			</Column>
		</div>
		<div
			class="drag-tree-table-body"
			v-bind:style="bodyStyle"
			@dragover="draging"
			@dragend="drop"
			:class="isDraing ? 'is-draging' : ''"
		>
			<Row
				depth="0"
				v-for="(item, index) in data.lists"
				:key="index"
				:model="item"
				:columns="data.columns"
				:isdraggable="isdraggable"
				:custom_field="custom_field"
				:onCheck="onSingleCheckChange"
				:isContainChildren="isContainChildren"
			>
			</Row>
		</div>
	</div>
</template>

<script>
import Row from './row.vue';
import Column from './column.vue';
import func from './func';

export default {
	name: 'dragTreeTable',
	components: {
		Row,
		Column,
	},
	computed: {
		bodyStyle() {
			return {
				overflow: this.fixed ? 'auto' : 'hidden',
				height: this.fixed ? `${this.height}px` : 'auto',
			};
		},
	},
	props: {
		isdraggable: {
			type: Boolean,
			default: true,
		},
		data: {
			type: Object,
			required: true,
		},
		onDrag: {
			type: Function,
			default: () => {},
		},
		onCheckChange: {
			type: Function,
		},
		fixed: {
			type: Boolean,
			default: false,
		},
		height: {
			type: Number,
		},
		isContainChildren: {
			//是否勾选子节点，默认false
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			dragX: 0,
			dragY: 0,
			dragId: '',
			targetId: '',
			whereInsert: '',
			isDraing: false,
			custom_field: {
				id: 'id',
				parent_id: 'parent_id',
				order: 'order',
				lists: 'lists',
				open: 'open',
				checked: 'checked',
			},
		};
	},
	methods: {
		draging(e) {
			e.preventDefault();
			this.isDraing = true;
			if (e.pageX === this.dragX && e.pageY === this.dragY) return;
			this.dragX = e.pageX;
			this.dragY = e.pageY;
			this.filter(
				e.pageX,
				e.pageY + document.getElementsByClassName('__panel')[0].scrollTop
			);
			if (e.clientY < 100) {
				window.scrollTo(0, window.scrollY - 6);
			} else if (e.clientY > document.body.clientHeight - 160) {
				window.scrollTo(0, window.scrollY + 6);
			}
		},
		drop(event) {
			func.clearHoverStatus();
			this.resetTreeData();
			this.isDraing = false;
		},
		// 查找匹配的行，处理拖拽样式
		filter(x, y) {
			const rows = document.querySelectorAll('.tree-row');
			this.targetId = undefined;
			const dragParentNode = window.dragParentNode;
			// 获取当前拖拽对象距离文档顶部的距离
			const dragOriginElementTop = func.getElementTop(
				dragParentNode, // dragstart 中赋予值，当前拖拽对象
				this.$refs.table
			);
			const dragOriginElementLeft = func.getElementLeft(dragParentNode);
			const dragW = dragOriginElementLeft + dragParentNode.clientWidth;
			const dragH = dragOriginElementTop + dragParentNode.clientHeight;
			/**
			 * 这里判断了拖拽一定的位置是否在原本被拖拽元素的位置上，如果是，则不做样式处理，也不可插入的意思.
			 * 就是这里进行了判断，判断的时候，
			 * dragOriginElementTop 和 dragH 是包含了 拖拽表格外部 滚动的距离的，
			 * 所以这里的 x 和 y 也必须包含外部滚动距离，
			 * 因为如果 y = e.pageY ，y指的是元素到游览器的距离，这就不包含滚动距离了
			 */
			if (
				x >= dragOriginElementLeft &&
				x <= dragW &&
				y >= dragOriginElementTop &&
				y <= dragH
			) {
				// 当前正在拖拽原始块不允许插入
				return;
			}
			for (let i = 0; i < rows.length; i += 1) {
				const row = rows[i];
				const rx = func.getElementLeft(row);
				const ry = func.getElementTop(row, this.$refs.table);
				const rw = row.clientWidth;
				const rh = row.clientHeight;
				// 这里就是对拖拽插入显示的效果模块
				if (x > rx && x < rx + rw && y > ry && y < ry + rh) {
					const diffY = y - ry;
					const hoverBlock = row.children[row.children.length - 1];
					// 这里显示对当前行进行拖拽效果插入显示，包括 opacity = 0.5
					hoverBlock.style.display = 'block';
					this.targetId = row.getAttribute('tree-id');
					let whereInsert = '';
					const rowHeight = row.offsetHeight;
					if (diffY / rowHeight > 3 / 4) {
						if (hoverBlock.children[2].style.opacity !== '0.5') {
							func.clearHoverStatus(); // 这里清除所有拖拽插入状态
							hoverBlock.children[2].style.opacity = 0.5;
						}
						whereInsert = 'bottom';
					} else if (diffY / rowHeight > 1 / 4) {
						if (hoverBlock.children[1].style.opacity !== '0.5') {
							func.clearHoverStatus();
							hoverBlock.children[1].style.opacity = 0.5;
						}
						whereInsert = 'center';
					} else {
						if (hoverBlock.children[0].style.opacity !== '0.5') {
							func.clearHoverStatus();
							hoverBlock.children[0].style.opacity = 0.5;
						}
						whereInsert = 'top';
					}
					this.whereInsert = whereInsert;
				}
			}
		},
		resetTreeData() {
			if (this.targetId === undefined) return;
			const listKey = this.custom_field.lists;
			const parentIdKey = this.custom_field.parent_id;
			const idKey = this.custom_field.id;

			const newList = [];
			const curList = this.data.lists;
			const _this = this;
			let curDragItem = null;
			let taggetItem = null;
			function pushData(_curList, needPushList) {
				for (let i = 0; i < _curList.length; i += 1) {
					const item = _curList[i];
					const obj = func.deepClone(item);
					obj[listKey] = []; // 清掉子集，然后递归的时候，将子集又传进去，重新给这个 listKey 塞子集
					// 放置目标 row
					if (String(_this.targetId) === String(item[idKey])) {
						curDragItem = _this.getItemById(_this.data.lists, window.dragId);
						taggetItem = _this.getItemById(_this.data.lists, _this.targetId);
						if (_this.whereInsert === 'top') {
							curDragItem[parentIdKey] = item[parentIdKey];
							needPushList.push(curDragItem);
							needPushList.push(obj);
						} else if (_this.whereInsert === 'center') {
							curDragItem[parentIdKey] = item[idKey];
							obj[listKey].push(curDragItem);
							needPushList.push(obj);
						} else {
							curDragItem[parentIdKey] = item[parentIdKey];
							needPushList.push(obj);
							needPushList.push(curDragItem);
						}
					} else if (String(window.dragId) !== String(item[idKey])) {
						// 找到了正在被拖拽的自己 item 就不加入到新生成的数组了
						needPushList.push(obj);
					}
					if (item[listKey] && item[listKey].length) {
						pushData(item[listKey], obj[listKey]);
					}
				}
			}
			pushData(curList, newList);
			this.resetOrder(newList);
			this.onDrag(newList, curDragItem, taggetItem, _this.whereInsert);
		},
		// 重置所有数据的顺序order
		resetOrder(list) {
			const _list = list;
			const listKey = this.custom_field.lists;
			for (let i = 0; i < _list.length; i += 1) {
				_list[i][this.custom_field.order] = i;
				if (_list[i][listKey] && _list[i][listKey].length) {
					this.resetOrder(_list[i][listKey]);
				}
			}
		},
		// 根据id获取当前行
		getItemById(lists, id) {
			let curItem = null;
			const listKey = this.custom_field.lists;
			const idKey = this.custom_field.id;
			function getchild(curList) {
				for (let i = 0; i < curList.length; i += 1) {
					const item = curList[i];
					if (String(item[idKey]) === String(id)) {
						curItem = JSON.parse(JSON.stringify(item));
						break;
					} else if (item[listKey] && item[listKey].length) {
						getchild(item[listKey]);
					}
				}
			}
			getchild(lists);
			return curItem;
		},
		// 全选按钮事件
		onCheckAll(evt) {
			this.setAllCheckData(this.data.lists, !!evt.target.checked);
			const checkedList = this.getCheckedList(this.data.lists);
			this.onCheckChange && this.onCheckChange(checkedList);
		},
		// 单个CheckBox勾选触发
		onSingleCheckChange() {
			const checkedList = this.getCheckedList(this.data.lists);
			this.onCheckChange && this.onCheckChange(checkedList);
		},
		// 根据flag批量处理数据
		setAllCheckData(curList, flag) {
			const listKey = this.custom_field.lists;
			for (let i = 0; i < curList.length; i += 1) {
				const item = curList[i];
				this.$set(item, 'checked', flag);
				if (item[listKey] && item[listKey].length) {
					this.setAllCheckData(item[listKey], flag);
				}
			}
		},
		// 获取所有选中的行
		getCheckedList(lists) {
			const listKey = this.custom_field.lists;
			const checkedList = [];
			const deepList = func.deepClone(lists);
			function getchild(curList) {
				for (let i = 0; i < curList.length; i += 1) {
					const item = curList[i];
					if (item.checked && item.isShowCheckbox !== false) {
						checkedList.push(item);
					}
					if (item[listKey] && item[listKey].length) {
						getchild(item[listKey]);
					}
				}
			}
			getchild(deepList);
			return checkedList;
		},
	},
	mounted() {
		if (this.data.custom_field) {
			this.custom_field = Object.assign(
				{},
				this.custom_field,
				this.data.custom_field
			);
		}
		document.body.ondrop = function ondrop(event) {
			event.preventDefault();
			event.stopPropagation();
		};
	},
	beforeDestroy() {
		document.body.ondrop = null;
	},
};
</script>

<style lang="less">
.drag-tree-table {
	margin: 20px 0;
	color: #606266;
	font-size: 12px;
}
.drag-tree-table-header {
	display: flex;
	padding: 15px 10px;
	background: #f5f7fa;
	height: 66px;
	line-height: 36px;
	box-sizing: border-box;
	font-weight: 600;
}
.tree-icon-hidden {
	visibility: hidden;
}
.is-draging .tree-row:hover {
	background: transparent !important;
}
input[type='checkBox'] {
	-webkit-appearance: checkbox;
}
</style>
