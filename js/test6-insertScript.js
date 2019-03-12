//页面动态加入<script>标签并执行代码（推荐使用1和3）

//https://www.cnblogs.com/lvdabao/p/4253704.html

/*html
<div id="xss"></div>
<div id="cont"></div>
*/

//1、document.createElement('script') + appendChild(newScript)
var newScript = document.createElement('script'),
	xss = document.getElementById('xss');
//可以运行外部js
//newScript.src = 'js/test2.js';
newScript.innerHTML = 'alert("hello1")';
xss.appendChild(newScript);

//2、使用eval()在js中执行<script>标签内的代码
var html = '<div>html</div><script>alert("hello2");<\/script>',
	cont = document.getElementById('cont');
cont.innerHTML = html;
var oldScript = cont.getElementsByTagName('script')[0];
cont.removeChild(oldScript);
eval(oldScript.innerHTML);

//3、使用jQuery的html()
var html = '<div>html</div><script>alert("hello3");<\/script>';
$('#xss').html(html);
//根据jquery.js 5990行，jQuery会ajax请求外部js，用eval执行内部js，
//然后删除<script>标签,不过在我的 XSS攻击实验中并没有删除，不清楚什么情况

//4、使用document.write()
var html = '<script>alert("hello4");<\/script>';
document.write(html);