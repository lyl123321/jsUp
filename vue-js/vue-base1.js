//一、介绍
var app = new Vue({
	el: '#app',
	data: {
		message: 'Hello! Today is ' + (new Date()).toLocaleDateString(),
		seen: true,
		todos: [
			{ text: '学习 JavaScript' },
		    { text: '学习 Vue' },
		    { text: '整个大项目' }
	    ]
	},
	methods: {
		//事件触发时调用app.methods，所以this指向Vue实例app
		reverseMessage: function(){
			this.message = this.message.split(' ').reverse().join(' ');
		}
	}
});

Vue.component('todo-item', {
	props: ["todo"],
  	template: '<li>{{todo.text}}</li>'
})
var app2 = new Vue({
	el: "#app2",
	data: {
		sd:"attribute中的自定义属性",
		list: [
			{ id: 0, text: '蔬菜' },
	      	{ id: 1, text: '奶酪' },
	      	{ id: 2, text: '随便其它什么人吃的东西' }
		]
	}
});

//二、Vue实例
var data = { a: 1 };
//Object.seal(data);
//Object.freeze(data);
var vm = new Vue({
	el: "#app3",
    data: data,
    methods: {
    	//v-on:click指令中的（函数名或内联JS中的函数）必须是最终 Vue 实例中的方法
    	alert: function(a,e){
    		alert(a + e.target.nodeName.toLowerCase());
    		// this 指向 vm 实例，on 绑定的方法取值范围确定，事件句柄和模板绑定，易于维护
    		console.log(this);
    	}
    },
    created: function(){
    	// `this` 指向 vm 实例, 可能是通过call来实现或者直接vm.created()
    	console.log(this);
    }
    //箭头函数中的 this 和父执行上下文中的 this 一致，这个对象作为一个从全局传入的参数，其中的 this 为全局 window 对象
    //created: () => console.log(this)
});

//sealed 对象和 freezed 对象都不会触发View的更新，即使 sealed 对象已有属性的值可以修改
data.a = 4;
//vm.$data 和 data 指向同一个对象，vm 初始化时复制 data、computed 和 methods 等选项中的属性和方法。
//当一个 Vue 实例被创建时，它向 Vue 的响应式系统中加入了其 data 对象中能找到的所有的属性，
//以后 vm 实例中的初始属性和 data 对象中的初始属性同步变化，且会响应到 View，
//但是 vm 实例或 data 对象中新增的属性不会同步，也不会响应到 View。
vm.$data.b = 2;
console.log(vm.$data === data);	//true
console.log(data.b);
console.log(vm.b);
console.log(vm.$data.b);
//Vue 实例使用的根 DOM 元素
console.log(vm.$el === document.getElementById('app3')); // => true
// $watch 是一个观察 Vue 实例变化的实例方法
vm.$watch('a', function (newValue, oldValue) {
	// 这个回调将在 `vm.a` 改变后调用
    console.log('a is changed from ' + oldValue + ' to ' + newValue);
});
vm.a = 3;