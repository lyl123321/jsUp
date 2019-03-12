//JS中各种对象的宽和高和距离
window.onresize = window.onscroll = function(){
	var yScr = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
		yLkd = yScr + window.innerHeight,
		num = yLkd / document.body.clientHeight * document.body.clientWidth;
	console.log('clientLeft :' + document.getElementById('rtl').clientLeft);
	document.getElementById('proress').style.width = num + 'px';
};
window.screen.availTop;
var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
	x = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
/*
1、各种对象

window.screen - 屏幕，
window - 窗口，
document.documentElement & document.body.parentNode - 文档，
document.body - 文档的主体。

2、各种属性(单位为px)
屏幕
window.screen.availHeight 屏幕可用高度；
window.screen.availWidth 屏幕可用宽度；
window.screen.height 屏幕总高度 = availHeight + 下方任务栏；
window.screen.width 屏幕总宽度 = availWidth + 右方任务栏（如果存在）。

窗口(浏览器)
window.screenLeft & window.screenX 浏览器左边框到屏幕左侧的水平距离；
window.screenTop & window.screenY 浏览器上边框到屏幕上侧的垂直距离；
window.outerHeight / window.outerWidth 窗口外部大小，即整个浏览器的大小；
window.innerHeight / window.innerWidth 窗口内部大小，即视口viwport的大小，包括水平/垂直滚动条；
window.onresize 事件是在 window.innerHeight / window.innerWidth 改变时触发的；

window.pageXOffset & window.scrollX 文档当前在水平方向上被卷掉的像素数；
window.pageYOffset & window.scrollY 文档当前在垂直方向上被卷掉的像素数。

元素
document.documentElement, document.body.parentNode 和 document.body 这三个元素节点都继承了element对象的多个只读的和可写的高度和宽度属性（“=” 右边加‘CSS’的属性为CSS中的属性）：

element.clientHeight = CSS height + CSS padding 不包括边框，边距和水平滚动条；
element.clientWidth = CSS width + CSS padding 不包括边框，边距和垂直滚动条；
element.clientTop = CSS border-top-width；
element.clientLeft = CSS border-left-width 如果文本方向被设为rtl ，而且左边有垂直滚动条，那么clientLeft包含滚动条宽度；

element.scrollHeight = clientHeight + 溢出不可见的内容 + 伪元素的高度；
element.scrollWidth = clientWidth + 溢出不可见的内容 + 伪元素的宽度；
element.scrollTop 获取或设置元素内容向上滚动的像素数；
element.scrollLeft 获取或设置元素内容向左滚动的像素数；

element.offsetHeight = CSS height+ CSS padding + CSS border + 水平滚动条高度（如果存在），不包括伪元素的高度；
element.offsetWidth = CSS width + CSS padding + CSS border + 垂直滚动条宽度（如果存在），不包括伪元素的宽度；
element.offsetTop 只读属性，返回当前元素的左上角相对于offsetParent 节点顶部的距离(可理解为CSS margin-top-width)；
element.offsetLeft 只读属性，返回当前元素的左上角相对于offsetParent 节点左侧的距离(可理解为CSS margin-left-width)。

HTMLElement.offsetParent只读属性返回对包含元素的最近（在包含层次结构中最近）的有 position 属性元素的引用。 
如果父元素没有 position 属性，则返回最近的 td，th，table或body。
当element.display设置为none时，offsetParent返回null。 offsetParent非常有用，因为offsetTop和offsetLeft是相对于其填充边缘的。

3、一些兼容写法
文档当前在水平方向上被卷掉的像素数，文档当前在垂直方向上被卷掉的像素数。
var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
    x = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
 */