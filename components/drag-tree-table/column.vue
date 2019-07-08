<template>
	<div
		class="tree-column"
		v-bind:style="{
			width: `${width}${typeof width === 'number' ? 'px' : ''}`,
			flex: flex,
		}"
	>
		<slot></slot>
	</div>
</template>
<script>
export default {
	name: 'column',
	props: {
		width: {
			type: [Number, String],
			default: 'auto',
		},
		flex: Number,
	},
	data() {
		return {};
	},
};
</script>
<style>
.tree-column {
	padding: 0px 4px;
	min-width: 60px;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
