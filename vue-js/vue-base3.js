//五、v-bind 指令
//1、Vue.js 官网 v-bind 指令
//https://cn.vuejs.org/v2/api/?#v-bind
//2、vue 2.x 的 v-bind 指令的 .prop 事件修饰符详解
//https://segmentfault.com/a/1190000012820563

var vm = new Vue({
	el: '#app',
	props:[],
	data: {
		imageSrc: '../images/info.png',
		fileName: 'info.png',
		isRed: true,
		isActive: true,
		error: null || false || undefined,
		classA: 'ca',
		classB: 'cb',
		isB: false,
		isC: true,
		activeColor: 'red',
		size: 12,
		styleObjectA: {
			color: 'red',
    		fontSize: '13px'
		},
		//当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。
		styleObjectB: {
			fontFamily: 'arial',
			transform: 'auto'
		},
		someProp: 'id1',
		otherProp: 'ot1',
		text: 'This is div2',
		//props 里的自定义属性不会在标签中显示，可用来传值
		customa: 'props',
		//attribute 里的自定义属性会在标签中显示
		customb: 'attribute',
		//property 里的自定义属性不会在标签中显示，可用来存储变量
		customc: 'property'
	},
	computed: {
		classObject: function () {
		    return {
		      	active: this.isActive && !this.error,
		      	'text-danger': this.error && this.error.type === 'fatal'
		    }
  		}
	},
	components: {
		'my-component': {
			props:['custom1'],
			template: '<div class="foo bar">me \
					<!-- 通过 $props 将父组件的 props 一起传给子组件 --> \
					<child-component v-bind="$props"></child-component></div>',
			components: {
				'child-component': {
					template: '<div>child</div>'
				}
			}
		},
	}
});