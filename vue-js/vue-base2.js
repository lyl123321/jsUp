//三、模板语法
var vm = new Vue({
	el: '#app',
	data: {
		//不能使用 v-html 来复合局部模板，并没有执行<script>，应该是使用innerHTML插入HTML的
		rawHtml: "<script>alert('hello2');<\/script>",
		//Vue中，布尔特性绑定的值为 null、undefined 或 false 时，特性最终不会被包含在元素中
		hid: null || undefined || false,
		id: '1'
	},
	methods: {
		alert: function(){
			alert('hello');
		}
	}
});

//四、计算属性
var vm2 = new Vue({
	el: '#app2',
	data: {
		message: "hello!",
		firstName: 'Foo',
	    lastName: 'Bar',
	    fullName: 'Foo Bar',
	    question: '',
    	answer: 'I cannot give you an answer until you ask a question!'
	},
	computed: {
		//计算属性 的 getter 函数为相应的匿名函数。
		//计算属性是基于它们的依赖进行缓存的，vm.message 发生改变时，
		//vm.reversedMessage 也会重新求值并缓存，所有依赖 vm.reversedMessage 的绑定也会更新。
		reversedMessage: function(){
			return this.message.split('').reverse().join('');
		},
		//now 将不再更新, 因为 Date.now() 不是响应式依赖。
		now: function () {
		    return Date.now() || new Date().getTime();
		},
		//计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：
		fullName2: {
		    // getter
		    get: function () {
		      	return this.firstName + ' ' + this.lastName;
		    },
		    // setter
		    set: function (newValue) {
		    	//"John Doe & Bob Bar",先执行 setter 再赋值 this.fullName2
		    	console.log(newValue + ' & ' + this.fullName2);
		    	
		    	/* 赋值语句会调用 setter，内存溢出，超过最大调用堆栈大小
		    	 * this.fullName2 = newValue + ' new';
		    	*/
		    	
		    	/* 使用Object.defineProperty()方法并不会调用 setter
		    	 * var self = this;
		    	 * Object.defineProperty(self,'fullName2',{
		    	 * 	   value: newValue + ' new'
		    	 * });
		    	*/
			    var names = newValue.split(' ');
			    this.firstName = names[0];
			    this.lastName = names[names.length - 1];
		    }
		}
	},
	methods: {
		//计算属性只有在相关依赖发生改变时才会重新求值，
		//而每当触发重新 渲染 时，调用方法将总会再次执行函数。
		reverseMessage: function(){
			return this.message.split('').reverse().join('');
		},
		nowM: function () {
		    return Date.now() || new Date().getTime();
		}
	},
	watch: {
		//命令式的 watch 回调
		firstName: function (newValue, oldValue) {
			//"John & Foo"。修改了两次 firstName 但总共只执行了一次 watch 回调。
			//首先， watch 回调是在同步代码执行后再执行的；
			//其次，可能多个同属性的 watch 回调最终只会执行最后一次，只会调用最终的修改。
			console.log(this.firstName + ' & ' + oldValue);
	      	this.fullName = newValue + ' ' + this.lastName;
	    },
	    lastName: function (val) {
	      	this.fullName = this.firstName + ' ' + val;
	    },
		//watch 可用于输入验证
	    question: function (newValue, oldValue){
	    	if (this.question.indexOf('?') === -1) {
		        this.answer = 'Questions usually contain a question mark. ;-)';
		        return;
		    }
	    	this.answer = 'You could ask google.';
	    }
	}
});
//触发 firstName 侦听属性 和 fullName2 的 getter
vm2.firstName = "Bob";
//"Foo Bar & Bob Bar",因为 watch 回调函数被放入事件队列中，先执行同步代码，再执行 watch 回调。
console.log(vm2.fullName + ' & ' + vm2.fullName2);
//触发 fullName2 的 setter
vm2.fullName2 = 'John Doe';
