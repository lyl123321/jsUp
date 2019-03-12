深入理解JavaScript系列（4）：立即调用的函数表达式

1\在一个表达式后面加上括号()，该表达式会立即执行;
但是在一个语句后面加上括号()，括号只是分组操作符。
函数表达式直接在后面加个()就可以立即调用:
var i = function () { return 10; } ();
true && function () { /* code */ } ();
0, function () { /* code */ } ();

!function () { /* code */ } ();
~function () { /* code */ } ();
-function () { /* code */ } ();
+function () { /* code */ } ();

new function () { /* code */ }
new function () { /* code */ } () // 如果需要传递参数，只需要加上括弧()

而函数声明则需要用()转化为函数表达式:
(function () { /* code */ } ());
(function () { /* code */ })();

2\自执行匿名函数和立即执行的函数表达式区别
自执行函数:
function foo() { foo(); }
var foo = function () { arguments.callee(); };
var foo = function () { foo(); };
立即调用的函数表达式:
(function foo() { /* code */ } ());
立即调用的函数表达式也可以自执行:
(function () { arguments.callee(); } ());
(function foo() { foo(); } ());