"use strict"
var fIn;
function f1(){
	fIn = function(){
		return this;
	}
	function f2(){
		console.log("标识符，所属对象为不可见的函数AO:"+this);
	}
	f2();
  	return this;
}

//()左边表达式值为函数对象
(function () {
  console.log("表达式值为函数对象:"+this); // null => global
})();

var foo = {
  bar: function () {
    console.log(this);
  }
};
foo.bar(); // 标识符，所属对象为普通对象
(foo.bar)(); // 表达式值为标识符，所属对象为普通对象
(foo.bar = foo.bar)(); // 表达式值为函数对象
(false || foo.bar)(); // 表达式值为函数对象
(foo.bar, foo.bar)(); // 表达式值为函数对象

console.log(this);	//全局执行上下文的this属性
console.log(f1()); 	// 标识符，所属对象为可见的全局AO
console.log(fIn());	// 标识符，所属对象为可见的全局AO
console.log(window.f1()); 	// 标识符，所属对象为window
console.log((window.fIn)());	// 表达式值为标识符，所属对象为window

/*var x = 10;
with ({
  foo: function () {
    console.log("标识符，所属对象为作用域链中可见的with对象:"+this.x);
  },
  x: 20
}) {
  foo(); // 20, 标识符，所属对象为作用域链中可见的with对象
}*/

(function foo11(bar) {
  console.log("命名函数表达式:"+bar+this);
  !bar && foo11(1); // 标识符，所属对象为不可见的存储着命名函数表达式标识符的特殊对象
})(); // 因为是命名函数表达式，所以表达式值为标识符，所属对象为可见的全局对象/不可见的特殊对象???

//http://www.cnblogs.com/dongcanliang/p/7054176.html

/*他人总结：
1.如果没有显示标明this的值(call、apply和bind),javascript引擎就会根据调用语句去推断this的值.
2.引擎会试图将调用语句格式化为[对象名].[函数名]().如果能够格式化,this就为上述对象.
否则，非严格模式下this取 window，严格模式下this取 undefined.
3.对于[函数名]()的调用,引擎会先根据作用域链找到隐式的对象(变量对象).由于全局上下文的变量
对象、动态(with、catch)变量对象是可以给用户访问的,因此格式化成功.函数上下文的变量对象不能
给用户直接访问,因此格式化失败.
4.对于(表达式)()的调用，先对表达式求值，然后再判断.
*/

/*我的看法：
1、this是在进入上下文时确定的，这个值每次调用都不同，但是在代码运行时this值是不变的。
2、非严格模式下，对于[函数名]()这种形式，JS会从函数的作用域链中找到函数所属的对象（AO 或者
with对象 或者 存储着命名函数表达式标识符的特殊对象）：
对象可见(全局AO或者 with对象)，this 指向其；对象不可见（函数AO或者特殊对象），this 指向 window。
3、严格模式下，[函数名]()这种调用形式，函数内部的this值为undefined。
*/

/*我的总结：
1、()左边为标识符时，JS会尝试找到调用标识符的对象，普通对象直接赋值给this，作用域链中的隐式对象（包括 window 对象和 with 对象）：
非严对象可见，直接赋给this；非严对象不可见，this值为window；严格模式，不管隐式对象可不可见，this值为undefined。
2、()左边为表达式时，JS先对表达式求值，然后再判断：表达式值为函数对象，即找不到函数所属
的对象，非严window，严格undefined；表达式值为标识符，按第一种情况判断。
3、特殊情况：
call、apply方法指定this值并执行函数；
bind方法指定函数以后调用时的this值，但是不会马上执行函数；
原型链中的方法的this仍然指向调用它的对象；
构造函数中的this指向被创建的新对象；
事件监听函数中的this指向它绑定的元素对象；
$.on()方法中的this指向事件目标对应的元素对象，可以查看jQuery原码了解一下，
$("#demo1,#demo2").on('keyup input change','input',validate)；
回调函数的this不能确定，不同方法中的回调函数的this取值不同：
[].map()方法回调函数的this可以设置，不设置则为"undefined"，
setTimeout和setInterval方法中的this值为window；
箭头函数的this和父执行上下文中的this一致。
*/
