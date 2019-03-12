1\阿里模拟题:排序
<body>
    <table>
    <thead>
        <tr>
            <th id="eq">name</th>
            <th>age</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>张三</td>
            <td>17</td>
        </tr>
        <tr>
            <td>李四</td>
            <td>43</td>
        </tr>
        <tr>
            <td>王五</td>
            <td>22</td>
        </tr>
        <tr>
            <td>小刘</td>
            <td>9</td>
        </tr>
        <tr>
            <td>黄三</td>
            <td>20</td>
        </tr>
    </tbody>
</table>
 </body>
function sortByAge(){
  var trArr = document.querySelectorAll('tbody tr'),
  trArr2 = Array.prototype.slice.call(trArr);
  var tdArr = [];
  for(var i=0, len=trArr2.length; i < len; i++){
     tdArr[i] = parseInt(trArr2[i].lastElementChild.textContent);
  }
  for(var j = 0;j < len-1;j++){
  	var tem=0;
  	for(var k = 0;k<len - j;k++){
  		if(tdArr[k]>tdArr[k+1]){
  			tem = tdArr[k];
  			tdArr[k] = tdArr[k+1];
  			tdArr[k+1] = tem;
  			tem = trArr2[k];
  			trArr2[k] = trArr2[k+1];
  			trArr2[k+1] = tem;
  		}
  	}
  }
  for(var n = 0;n<len;n++){
  	trArr2[n]='<tr>'+trArr2[n].innerHTML+'</tr>';
  }
  document.getElementsByTagName('tbody')[0].innerHTML = trArr2.join('');
}
sortByAge();

-function() {
	var tbody = document.getElementsByTagName('tbody')[0],
		trs = [].slice.call(tbody.children);
	trs.sort((a, b) => parseInt(a.lastElementChild.textContent) - parseInt(b.lastElementChild.textContent));
	trs.forEach(tr => tbody.appendChild(tr))
}()

2\迅雷
function EventEmitter() {
    this._events = {};
    this.on = function(name,fn) {
    	this._events[name] = this._events[name] || [];
    	this._events[eventName].push(fn);
    }
    this.once = function(name,fn){
	    function wrap(){
	        fn.apply(this,arguments);
	        this.remove(name,wrap);
	    }
	    wrap.listener = fn;
	    this.on(name,wrap);
	}
    this.emit = function(name) {
        var args = arguments;
    	if(this._events[name]){
	        this._events[name].forEach(function(callback,i){
	            callback(args[i + 1]);
	        });
	    }
    }
    this.remove = function(name,fn) {
    	if(this._events[name]){
	        this._events[name] = this._events[name].filter(function(calllbacke){
	        	return callback !== fn || callback.listener !== fn;
	        });
	    }
	}
}

3\求根号
function fn(a,b){
	var res = b;
	fn = function(a,b){
		var m = (a + b) / 2, m2 = m * m;
		if(Math.abs(a - b) < 0.0000000001) {
			return m;
		}
		if(m2 < res) {
			return fn(m,b);
		} else if(m2 > res) {
			return fn(a,m);
		} else {
			return m;
		}
	}
	return fn(a,b);
}
function fn2(a){
	var x1= 0.0, x2 =a/2; 
	
	while(x1!=x2) 
	{ 
	x1=x2; 
	x2=(x1+a/x1)/2; 
	} 
	
	return x1;
}
4/微众银行多块木板求容积
function fn(arr){
	var i, j, k,
		len = arr.length,
		res = 0,
		index = 0,
		b = 0;
	for(i = 0; i < len - 1;){
		for(j = i + 1, index = i + 1, b = 0; j < len; j++){
			if(arr[j] >= arr[i]){
				b = 1;
				break;
			}
			index = arr[j] > arr[index] ? j : index;
		}
		if(b){
			res += (j - i) * arr[i];
			i = j;
		} else {
			res += (index - i) * arr[index];
			i = index;
		}
	}
	return res;
}
console.log(fn([1,2,3,1]));