var inDiv = document.getElementById('input'),
	outDiv = document.getElementById('output');
$(inDiv).on('focusout',function(){
	var html = inDiv.innerHTML;
	//var html = inDiv.textContent;
	console.log(html);
	$(outDiv).html(html);
});

/*
JS动态向HTML中添加<script>标签:
在页面中动态追加html片段的时候，有时候动态添加的代码会含有<script>标签，
比如用了一些模板引擎，或者你的代码有些复杂的时候。然而我们用DOM提供的innerHTML属性或者
insertAdjacentHTML方法来插入HTML的时候，<script>标签中的代码并不能执行，如果有src属性，
指向的外联文件也不会被加载，这并不是浏览器的bug，而是因为w3c文档就是这么规定的。

XSS攻击实验中，使用inDiv.innerHTML获取用户的输入时，浏览器会对用户的输入进行编码，
将一些预留字符转化为字符实体，然后插回HTML时会将字符实体再次被转化为预留字符，
这符合字符实体的定义和作用。所以outDiv会显示<script>标签，而不会解析它。
但是，这种情况和上面的w3c文档规定情况是不同的。

而使用inDiv.textContent获取用户的输入时，不会将预留字符转化为字符实体，所以使用$.html
方法插回时<script>标签会被解析，其中的代码会被执行。
*/
