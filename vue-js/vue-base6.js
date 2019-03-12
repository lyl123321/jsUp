//八、v-on 指令
//1、Vue.js 官网 v-on 指令
//https://cn.vuejs.org/v2/api/?#v-on
//2、为什么在 HTML 中监听事件?
//https://cn.vuejs.org/v2/guide/events.html#为什么在-HTML-中监听事件

Vue.config.keyCodes = {
 	v: 86,
  	f1: 112,
  	// camelCase 不可用
  	mediaPlayPause: 179,
  	// 取而代之的是 kebab-case 且用双引号括起来
  	"media-play-pause": 179,
  	//Vue.js 2.5.0 中可以直接在 html 中使用 $event.key 内置按键名的 kebab-case 形式作为修饰符，
  	//不再需要在 Vue.config.keyCodes 中手动将内置按键名对应到按键码，
  	//eg；<input @keyup.page-down="onPageDown"> 中方法仅在 $event.key === 'PageDown' 时被调用
  	"page-down": 40,
  	up: [38, 87]
}

var vm = new Vue({
	el: '#app',
	data: {
		message: 'Vue.js'
	},
	methods: {
		greet: function(event){
			alert('Hello ' + this.message + ' !');
			if(event){
				alert(event.target.tagName);
			}
		},
		say: function(message, event){
			alert(message + this.message + ' !');
			if(event){
				alert(event.target.tagName);
			}
		},
		doThis: function(e){
			alert(e.target.innerHTML);
		},
		submit: function(e){
			alert(e.target.value);
		},
		click: function(e){
			alert(e.target.textContent);
		}
	}
});
