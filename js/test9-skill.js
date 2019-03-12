1\利用a标签自动解析URL
var a = document.createElement('a');
a.href = 'http://www.cnblogs.com/wayou/p/';
console.log(a.host);
//将url解析成对象
function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}

2\利用浏览器DOM API将HTML预留字符转化为字符实体
// 将字符转化为实体
function escape(html){
    var elem = document.createElement('div');
    elem.textContent = html;
    return elem.innerHTML;	//编码
}
// 将实体转回为字符
function unescape(str) {
    var elem = document.createElement('div');
    elem.innerHTML = str;	//解码
    return elem.textContent || elem.innerText;
}
console.log(escape("<div></div>"));
console.log(unescape("&lt;div&gt;&lt;/div&gt;"));

var inDiv = document.getElementById('input'),
	outDiv = document.getElementById('output');
$(inDiv).on('focusout',function(){
	var html = inDiv.innerHTML;
	//var html = inDiv.textContent;
	console.log(html);
	outDiv.innerHTML = html;
});

3\html小技巧
1、HTML中拥有ID的元素会创建全局变量
<div id="sample">hello</div>
<script type="text/javascript">
        console.log(sample.textContent);
</script>

2、加载CDN文件时，可以省掉HTTP标识
<script src="//domain.com/path/to/script.js"></script>
	
3、利用script标签保存任意信息
script标签中的文本内容不可见,令type='text'然后可以在里面保存任意信息，
之后可以在JavaScript代码中很方便地获取。
<script type="text" id="template">
	<h1>This won't display</h1>
</script>
var text = document.getElementById('template').innerHTML;

4\生成随机字符串
function generateRandomAlphaNum(len) {
    var rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len);
}

5\整数的操作
|0和~~是很好的一个例子，使用这两者可以将浮点转成整型且效率方面要比同类的parseInt,
Math.round 要快。在处理像素及动画位移等效果的时候会很有用。
var foo = (12.4 / 4.13) | 0;//结果为3
var bar = ~~(12.4 / 4.13);//结果为3
console.log(2.98 | 0);
console.log(2.98 >> 0);
console.log(2.98 >>> 0);
console.log(~~2.98);
另外, !!将一个值方便快速转化为布尔值  !!window===true 。

6\重写原生浏览器方法以实现新功能
(function() {
    var oldAlert = window.alert,
        count = 0;
    window.alert = function(a) {
        count++;
        oldAlert(a + "\n You've called alert " + count + " times now. Stop, it's evil!");
    };
})();
alert("Hello World");
alert("Hello World");

7\Chrome的console.log是支持对文字添加样式的，甚至log图片都可以。于是可以重写掉默
认的log方法，把将要log的文字应用到CSS的模糊效果，这样当有人试图调用console.log()
的时候，出来的是模糊不清的文字。
var _log = console.log;
console.log = function() {
  _log.call(console, '%c' + [].slice.call(arguments).join(' '), 'color:transparent;text-shadow:0 0 2px rgba(0,0,0,.5);');
};
console.log('hello');

8\不声明第三个变量的值交换
我们都知道交换两个变量值的常规做法，那就是声明一个中间变量来暂存。但鲜有人去挑战
不声明中间变量的情况，下面的代码给出了这种实现。
var a = 1, b = 2;
a = [b, b = a][0];

9\万物皆对象
在JavaScript的世界，万物皆对象。除了undefined，其他基本类型数字，字符串和布尔值都
有对应的包装对象。对象的一个特征是你可以在它身上直接调用方法。对于数字基本类型，当
试图在其身上调用toString方法会失败，但用括号括起来后再调用就不会失败了，内部实现是
用相应的包装对象将基本类型转为对象。所以
(1).toString()相当于new Number(1).toString()。
因此，你的确可以把基本类型数字，字符串，布尔等当对象使用的，只是注意语法要得体。
同时我们注意到，JavaScript中数字是不分浮点和整形的，所有数字其实均是浮点类型，只是
把小数点省略了而以，比如你看到的
1可以写成1.，
这也就是为什么当你试图1.toString()时会报错，所以正确的写法应该是这样：
1..toString()，
或者如上面所述加上括号，这里括号的作用是纠正JS解析器，不要把1后面的点当成小数点。
内部实现如上面所述，是将1.用包装对象转成对象再调用方法。

10\If语句的变形
用JavaScript中的逻辑操作符或三位运算符来代替if语句:
var day = (new Date).getDay() === 0;
//传统if语句
if (day) {
	alert('Today is Sunday!');
};
//运用逻辑与代替if
day && alert('Today is Sunday!');
//运用三位运算符代替if
day ? alert('Today is Sunday!') : alert("Today isn't Sunday!");

11\禁止别人以iframe加载你的页面
window.location != window.parent.location && (window.parent.location = window.location);

12\console.table()
将JavaScript关联数组以表格形式输出到浏览器console, IE不支持:
var data = [{'品名': '杜雷斯', '数量': 4}, {'品名': '冈本', '数量': 3}];
console.table(data);

13\给浮点数取近似值
有些浮点数用二进制表示是无穷的,可能导致计算错误,所以需要取近似值
function fixFloatCalcRudely(num){
    if(typeof num == 'number'){
        var str=num.toString(),
            match=str.match(/\.(\d*?)(9|0)\2{5,}(\d{1,5})/);
        if(match != null){
            return num.toFixed(match[1].length)-0;
        }
    }
    return num;
}
console.log(fixFloatCalcRudely(0.20000001));

14\运算符优先级
运算符								描述
. [] ()								字段访问、数组下标、函数调用以及表达式分组
++ -- - ~ ! delete new typeof void	一元运算符、返回数据类型、对象创建、未定义值
* / %								乘法、除法、取模
+ - +								加法、减法、字符串连接
<< >> >>>							移位
< <= > >= instanceof				小于、小于等于、大于、大于等于、instanceof
== != === !==						等于、不等于、严格相等、非严格相等
&									按位与
^									按位异或
|									按位或
&&									逻辑与
||									逻辑或
?:									条件
= oP=								赋值、运算赋值
,									多重求值