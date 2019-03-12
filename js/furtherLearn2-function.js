深入理解JavaScript系列（2）：揭秘命名函数表达式

1\匿名的函数一定是函数表达式,具名的函数可以是函数声明或者函数表达式,通过上下文来区分,
函数声明是程序或函数体的一部分,函数表达式是表达式的一部分.
函数声明:
　　function 函数名称 (参数：可选){ 函数体 }
函数表达式：
　　function 函数名称（可选）(参数：可选){ 函数体 }
return function f(){} \ new function bar(){} \ (function foo(){}) 等都是函数表达式

2\函数语句
函数语句可以像其他语句一样被解析,一般语句能用的地方,函数语句也能用(类似于函数表达式).
Block（块{...}） 中只能包含Statement语句,但也可以包含函数语句.
函数语句不是在变量初始化期间赋值的,而是在运行时赋值的——与函数表达式一样(运行时声明)。
不过，函数语句的标识符能在当前的整个作用域生效,
可理解为在预解析阶段声明了一个和标识符同名的变量,赋值为undifined(类似于var foo = function{})。
标识符有效性正是函数语句与函数表达式不同的关键所在(函数当前作用域/函数本身作用域).
函数语句:
console.log(foo); // 标识符变量已声明但未赋值，值为"undefined"
  if (true) {
    function foo(){ return 1; }
    //相当于var foo = function foo(){ return 1; }
  }
  else {
    function foo(){ return 2; }
  }
console.log(foo);  // 1
Hbuilder并未实现函数语句,当成了函数声明,输出了2

3\自执行函数表达式
依旧存在缺点:即使函数未被使用,也会运行一次,嗅探一次
var contains = (function() {
    var docEl = document.documentElement;

    if (typeof docEl.compareDocumentPosition != 'undefined') {
      return function(el, b) {
        return (el.compareDocumentPosition(b) & 16) !== 0;
      };
    }
    else if (typeof docEl.contains != 'undefined') {
      return function(el, b) {
        return el !== b && el.contains(b);
      };
    }
    return function(el, b) {
      if (el === b) return false;
      while (el != b && (b = b.parentNode) != null);
      return el === b;
    };
  })();

4\函数柯里化
较好的方式,用到才会运行,且同样只嗅探一次,初次运行便可用,再次运行无需嗅探
var contains = function(el, b) {
    var docEl = document.documentElement;

    if (typeof docEl.compareDocumentPosition != 'undefined') {
      contains = function(el, b) {	//只需嗅探一次的关键
        return (el.compareDocumentPosition(b) & 16) !== 0;
      };
    }
    else if (typeof docEl.contains != 'undefined') {
      contains = function(el, b) {
        return el !== b && el.contains(b);
      };
    }
    else {
      contains = function(el, b) {
	      if (el === b) return false;
	      while (el != b && (b = b.parentNode) != null);
	      return el === b;
      };
    }
    
    contains(el,b); //初次运行便可用的关键
};

5\命名(具名)函数表达式可以让调试过程更方便,
IE的ECMAScript实现——JScript新版已经修复了将命名函数表达式同时当作函数声明和函数表达式
并生成两个不同的函数对象的BUG,目前也和其它高级浏览器一样实现了函数语句.

命名函数表达式的标识符只在函数的局部作用域中有效,原因:
在命名函数表达式被求值时，会创建一个特殊的对象，该对象的唯一目的就是保存一个属性，
而这个属性的名字对应着函数标识符，属性的值对应着那个函数。
这个对象会被注入到当前作用域链的前端,然后作用域链赋值给foo.[[scope]],
在函数运行生成执行上下文时再将函数VO+[[scope]]生成函数作用域链。

命名函数表达式中函数的作用域链(函数运行时生成):
[函数VO , { foo: <function object> } , 父函数VO/全局AO , ...]
如果变量对象/特殊的标识符对象继承了其它对象如Object.prototype,会对变量/函数获取产生影响,
因为搜索作用域链上的变量/函数时,如果某个AO有原型,会在搜索完此AO后搜索它的原型链上的属性/方法,
然后才继续搜索作用域链.