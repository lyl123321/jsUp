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

//普通写法
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.getName = function() {
    return this.name;
}

function cPerson(name, age, job) {
	Person.call(this, name, age);
    this.job = job;
}

cPerson.prototype = new Person(null, null);
//cPerson.prototype = Object.create(Person.prototype);
cPerson.prototype.constructor = cPerson;

var cperson = new cPerson();

console.log('getName' in cperson);	//true
//cperson.constructor 和 cperson.constructor.prototype.constructor 永远相等
//Object.getPrototypeOf(cperson) 相当于cperson._proto_ ,永远可以得到正确的原型
console.log(cperson.constructor);
console.log(cperson.constructor.prototype.constructor);
console.log(Object.getPrototypeOf(cperson));
console.log(Object.getPrototypeOf(Object.getPrototypeOf(cperson)));

//比较
//1、class 写法
class Queue {
	constructor(contents = []) {
	    this._queue = [...contents];
	}
	
	fn1() {
		const value = this._queue[0];
	  this._queue.splice(0, 1);
	  return value;
	}
}

class PeekableQueue extends Queue {
	constructor(contents) {
	    super(contents);
	}
	
	fn2() {
		return this._queue[1];
	}
}

let p = new PeekableQueue([1,2]);
console.log(p instanceof PeekableQueue, p instanceof Queue);
console.log(typeof PeekableQueue, p.constructor.prototype);

//2、原型写法
function Queue(contents = []) {
	this._queue = [...contents];
}

Queue.prototype.fn1 = function() {
	const value = this._queue[0];
	this._queue.splice(0, 1);
	return value;
}

function PeekableQueue(contents) {
	Queue.call(this, contents);
}

//PeekableQueue.prototype = new Queue();
PeekableQueue.prototype = Object.create(Queue.prototype);
PeekableQueue.prototype.constructor = PeekableQueue;

PeekableQueue.prototype.fn2 = function() {
	return this._queue[1];
}

let p = new PeekableQueue([1,2]);
console.log(p instanceof PeekableQueue, p instanceof Queue);
console.log(typeof PeekableQueue, p.constructor.prototype);