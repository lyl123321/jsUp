function fn(){
	function inner(){
		console.log(5);
	}
	return inner;
}
var f = fn();
f();
//闭包与函数的[[scope]]属性密不可分

1/闭包分析:
JS引擎根据全局对象下对象是否可获得进行垃圾回收;
f引用了inner函数对象,inner函数对象可获得;
inner函数对象的[[scope]]属性引用了父函数执行上下文中的Scope属性对应的对象
(父函数执行上下文被执行上下文栈调用时将Scope属性的值即变量对象数组(作用域链对象)的引用赋值给每个子函数的[[scope]]属性),
所以作用域链对象和其中的父变量对象可获得,未被回收,而执行上下文在 7 执行完后被销毁(弹出调用栈)了;
所有子函数的[[scope]]属性指向同一个作用域链对象，函数被调用生成自己的执行上下文时,
执行上下文对象的属性fooContext.Scope = fooContext.AO + foo.[[Scope]],
fooContext.Scope 和 foo.[[Scope]]中的父变量对象AO/VO都是对堆中父变量对象的引用 ,
所以每个函数修改自由变量(父AO属性值),都会共享到其他函数的作用域中的自由变量.

2/总结:
JS中变量对象和对象都存放在堆中,不可获取则会被销毁;
函数的[[Scope]]属性引用了父上下文的Scope属性,父执行上下文的Scope属性指向了AO数组,
Scope属性指向的AO数组对象可获取,所以在父函数执行完毕后未被销毁
(Scope属性随同执行上下文被销毁,但它原来指向的AO数组对象不被销毁,因为返回出去的函数的[[Scope]]属性指向了它);
父上下文的Scope属性即AO数组中包含堆中AO/VO的引用(变量对象是引用类型),这也是闭包自由变量共享的原因,
父上下文活动对象VO可获取,所以在父函数执行完毕后未被销毁,全局AO更不用说,永远可获取.

3/函数和对象的属性/变量获取:
对象的属性从原型链上获取,原型链上都是对象,最终指向[Object.prototype](大部分有/可以无)->null;
函数的变量从作用域链上获取,作用域链上都是变量对象(变量对象的原型并不是Object.prototype!!!,
所以不会继承Object.prototype的属性),最末端为全局变量对象(window/global对象);
如果作用域链上的活动对象/变量对象有原型,那么在搜索完AO/VO后如果未找到属性/变量则会继续搜索它们
的原型链,未找到则继续搜索作用域链上后面的AO/VO.

4/函数对象和函数的变量对象的区别:
函数对象(函数本身)在函数声明时就被创建了,在它声明时就被JS引擎添加了一个属性[[scope]]——父上下文的作用域链,
同时也会创建一个属性__proto__指向Function.prototype,同时由于它是函数,还会创建一个prototype属性;
函数的变量对象是函数执行上下文的一个属性,在函数执行时才被创建;
因此函数的变量从变量对象及作用域链上获取,属性从函数对象及原型链上获取;

5/阶段
JavaScript代码的整个执行过程，分为两个阶段，代码编译阶段与代码执行阶段。编译阶段由编译器完成，将代码翻译成可执行代码，
这个阶段作用域规则会确定。执行阶段由引擎完成，主要任务是执行可执行代码，执行上下文在这个阶段创建。
编译阶段(编译器): 词法分析,语法分析,生成可执行代码,确定作用于规则;
执行阶段(JS引擎): 创建执行上下文,执行执行上下文,垃圾回收(标记清除法).
