//七、v-for 指令
//1、Vue.js 官网 v-for 指令
//https://cn.vuejs.org/v2/api/?#v-for
//2、Vue 就地复用策略注意事项：
//http://www.cnblogs.com/btgyoyo/p/9305567.html
//3、解析 DOM 模板时的注意事项：
//https://cn.vuejs.org/v2/guide/components.html#解析-DOM-模板时的注意事项
//4、vm.$emit( eventName, […args] )，使用 $emit 传递子组件数据到父组件：
//https://cn.vuejs.org/v2/api/?#vm-emit

var vm = new Vue({
	el: '#app',
	data: {
		parentMessage: 'Name',
		array: [
			{ message: 'Foo' },
      		{ message: 'Bar' }
		],
		object: {
			firstName: 'John',
		    lastName: 'Doe',
		    age: 30
		},
		items: [
			{ id: 0, text: "its id is 0"},
			{ id: 1, text: "its id is 1"}
		]
	},
	methods: {
		/* 4、数组更新检测 */
		/* 变异方法 (mutation method)，会改变调用这些方法的原始数组，如：
		 * push() pop() shift() unshift() splice() sort() reverse()
		 */
		mutMethod: function(){
			this.array.sort();
			this.array.reverse();
		},
		
		/* 非变异 (non-mutating method) 方法，不会改变原始数组，但总是返回一个新数组。
		 * 例如：filter(), map(), concat() 和 slice() 。当使用非变异方法时，可以用新数组替换旧数组。
		 */
		unmutMethod: function(){
			this.array = this.array.filter(function(item){
				return item.message.match(/F\w+/);
			});
		},
		
		/* 数组更新检测注意事项
		 * 由于 JavaScript 的限制，Vue 不能检测以下数组的变动：
		 * 1、当你利用索引直接设置一个项时，例如：vm.array[indexOfItem] = newValue;
		 * 2、当你修改数组的长度时，例如：vm.array.length = newLength.
		 */
		indOrLen: function(){
			this.array[0] = { message: 'Bob' }; 	// 不是响应性的
			this.array.length = 1;					// 不是响应性的
			//实际上 this.array 已经改变，但是 Vue 并未检测到，这时用其它按钮更新一下 view 就会显示
		},
		//解决方法: 使用 Vue.set 和它的别名 this.$set 或者 Array.prototype.splice
		insteadOfIndex: function(){
			Vue.set(this.array, 1, { message: 'Tom' });
			//this.$set(this.array, 1, { message: 'Tom' });
			this.array.splice(0, 1, { message: 'Jarry' });
		},
		insteadOfLength: function(){
			this.array.splice(1);
		},
		
		/* 5、对象更新检测注意事项
		 * 1、对于已经创建的实例，Vue 不能动态添加根级别的响应式属性；
		 * 2、由于 JavaScript 的限制，Vue 不能检测到对象属性的添加或删除。
		 */
		errorMethod: function(){
			this.b = 4;					// 不是响应性的
			this.object.height = 180;	// 不是响应性的
		},
		//第二点的解决方法: 使用 Vue.set 或者它的别名 this.$set 给嵌套对象添加单个响应式属性
		addOneAttribute: function(){
			Vue.set(this.object, 'height', '180cm');
			this.$set(this.object, 'weight', '70kg');
		},
		//需要添加多个响应式属性时，直接创建一个新的对象赋给原来的对象名
		addAttributes: function(){
			this.object = Object.assign({}, this.object, {
				length: '18cm',
				favoriteColor: 'Vue Green'
			});
		}
	}
});

/* 3、key
当 Vue.js 用 v-for 更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，
而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。
Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法，当列表项的顺序被改变时，
列表中都是 li 元素，所以 Vue 会把第二个节点相应的静态属性重新赋值给第一个元素，包括文本内容，class名等，同样，一也赋给二。
这基本上让大家看不到被复用的痕迹，就好像是 Vue 真的移动了 DOM 元素一样。
这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。
 */
vm.array.unshift(vm.array.pop());

/* 8、一个组件的 v-for */
Vue.component('todo-item', {
	props: ['text'],
	template: '\
		<li>\
			{{ text }}\
			<button  @click="$emit(\'remove\')">Remove</button>\
		</li>\
	'
});

new Vue({
	el: '#todo-list-app',
	data: {
		todos: [
		    {id: 1, text: 'Do the dishes'},
		    {id: 2, text: 'Take out the trash'},
		    {id: 3, text: 'Mow the lawn'}
	    ],
	    newTodoText: '',
	    nextTodoId: 4
	},
	methods: {
		addNewTodo: function(){
			this.todos.push({
				id: this.nextTodoId++,
				text: this.newTodoText
			});
			this.newTodoText = '';
		}
	}
});