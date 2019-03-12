//https://github.com/forthealllight/blog/issues/5
//XXms后放入event队列,
setTimeout(function(){console.log(1)},5);
 
new Promise(function(resolve,reject){
   console.log(2);
   setTimeout(function(){resolve()},0)
}).then(function(){console.log(3)
}).then(function(){console.log(4)});

console.log(6);
var sum = 0;
for(var i =0;i<1000;i++){
	sum+=i;
}
