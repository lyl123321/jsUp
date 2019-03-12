深入理解JavaScript系列（5）：强大的原型和原型链

1\当查找一个对象的属性时，JavaScript 会向上遍历原型链，直到找到给定名称的属性为止，
到查找到达原型链的顶部 - 也就是 Object.prototype - 但是仍然没有找到指定的属性，
就会返回 undefined

2\hasOwnProperty是Object.prototype的一个方法，他能判断一个对象是否包含自定义属性而不是
原型链上的属性，因为hasOwnProperty 是 JavaScript 中唯一一个处理属性但是不查找原型链的函数。
在使用 for in loop 遍历对象时，推荐总是使用 hasOwnProperty 方法，这将会避免原型对象扩展
带来的干扰.

3\Object.getPrototypeOf(obj)获取obj的原型
function Person(){};
Person.prototype.kick = function(type){
	alert(type +' kick!');
};
function Norris(){};
// Inherit properties from Person
Norris.prototype = new Person();
Norris.prototype.kick = function(){
	Object.getPrototypeOf(this).kick('Roundhouse');
};
(new Norris()).kick();

4\Object.create(o, prototype)创建对象,同时设置原型
function User(){}
User.prototype.name = 'Anonymous';
User.prototype.url = 'http://google.com/';
var john = Object.create(new User(), {
	name: { value: 'John', writable: false },
	url: { value: 'http://google.com/' }
});
console.log( john.name );	// John
