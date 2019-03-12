//六、v-if 指令
//1、Vue.js 官网 v-if 指令
//https://cn.vuejs.org/v2/api/?#v-if
//2、<template>标签的具体用法见：
//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
//3、Vue.js的特殊特性key的用途见：
//https://cn.vuejs.org/v2/api/?#key
//4、避免 v-if 和 v-for 用在一起见：
//https://cn.vuejs.org/v2/style-guide/#避免-v-if-和-v-for-用在一起-必要

var vm = new Vue({
	el: '#app',
	data: {
		ok: true,
		type: 'B',
		loginType: 'email',
		showOk: true,
		ifOk: true,
		shouldShowUsers: true,
		users: [
			{ id: 0, isActive: true, name: 'XiaoMing Wang'},
			{ id: 1, isActive: false, name: 'XiaoHong Li'},
			{ id: 2, isActive: true, name: 'Bob Tim'},
			{ id: 3, isActive: true, name: 'Jake Chen'}
		]
	},
	computed: {
		activeUsers: function(){
			return this.users.filter(function (user){
				return user.isActive;
			});
		}
	},
	methods: {
		toggle: function(){
			this.loginType = this.loginType === 'username' ? 'email' : 'username';
		}
	}
});