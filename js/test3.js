1.找出数字数组中最大的元素（使用Match.max函数）
2.转化一个数字数组为function数组（每个function都弹出相应的数字）
3.给object数组进行排序（排序条件是每个元素对象的属性个数）
4.利用JavaScript打印出Fibonacci数（不使用全局变量）
5.实现如下语法的功能：var a = (5).plus(3).minus(6); //2
6.实现如下语法的功能：var a = add(2)(3)(4); //9

1.var arr = [3,2,65,3,13];
console.log(Math.max.apply(this,arr));

2.var arr = [3,2,65,13];
for(var i = 0, len = arr.length; i<len; i++){
	(function(val){
		arr[i]=function(){
			alert(val);
		}
	})(arr[i]);
}
arr[0]();arr[1]();arr[2]();arr[3]();

3.var objArr = [{firstName:"John1", lastName:"Doe", age:50, eyeColor:"blue"},
	{firstName:"John2", age:50, eyeColor:"blue"},
	{firstName:"John3", age:50},
	{a:3,b:4,c:32,d:77,e:21,f:54}
];
sortObj(objArr);
console.log(Object.keys(objArr[0]));
console.log(Object.keys(objArr[1]));
console.log(Object.keys(objArr[2]));
console.log(Object.keys(objArr[3]));
function sortObj(arr){
	var i,j,tem,len=arr.length;
	for(i=0; i<len-1; i++){
		for(j=0; j<len-i-1;j++){
			if(Object.keys(arr[j]).length > Object.keys(arr[j+1]).length){
				tem = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = tem;
			}
		}
	}
}

4.function fibonacci(a) {
	if(a < 3){
		return 1;
	} else {
		return fibonacci(a - 1) + fibonacci(a -2);
	}
}
console.log(fibonacci(6));

5.Number.prototype.plus = function(num){
	return this.valueOf() + num;
}
Number.prototype.minus = function(num){
	return this.valueOf() - num;
}
var a = (5).plus(3).minus(6);
console.log(a);

6.//add(2)(3)(4)()
var a = add(2,2)(3,5,7)(4)();
console.log(a);
function add() {
	var arr = [];
	Array.prototype.push.apply(arr,arguments);
	return function() {
		if(!arguments.length) {
			var sum = 0;
			for(var i=0, len=arr.length; i<len; i++){
				sum += arr[i];
			}
			return sum;
		} else {
			Array.prototype.push.apply(arr,arguments);
			return arguments.callee;
		}
	}
}
//add(2)(3)(4)
var a = add(2)(3)(4);
console.log(a);
function add() {
	var arr = [];
	Array.prototype.push.apply(arr,arguments);
	function addInner() {
		Array.prototype.push.apply(arr,arguments);
		return arguments.callee;
	}
	addInner.toString = addInner.valueOf = function () {
		var sum = 0;
		for(var i=0, len=arr.length; i<len; i++){
			sum += arr[i];
		}
		return sum;
		/*return arr.reduce(function(a,b){
			return a + b;
		});
		*/
	};
	return addInner;
}