//https://www.zhangxinxu.com/wordpress/2012/04/js-dom%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6/

//1\JS自定义事件
var Event = {
    _listeners: {},    
    // 添加
    addEvent: function(type, fn) {
        if (typeof this._listeners[type] === "undefined") {
            this._listeners[type] = [];
        }
        if (typeof fn === "function") {
            this._listeners[type].push(fn);
        }    
        return this;
    },
    // 触发
    fireEvent: function(type) {
        var arrayEvent = this._listeners[type];
        if (arrayEvent instanceof Array) {
            for (var i=0, length=arrayEvent.length; i<length; i+=1) {
                if (typeof arrayEvent[i] === "function") {
                    arrayEvent[i]({ "type": type });    
                }
            }
        }    
        return this;
    },
    // 删除
    removeEvent: function(type, fn) {
    	var arrayEvent = this._listeners[type];
        if (arrayEvent instanceof Array) {
            if (typeof fn === "function") {
                // 清除当前type类型事件下对应fn方法
                for (var i=0, length=arrayEvent.length; i<length; i+=1){
                    if (arrayEvent[i] === fn){
                        this._listeners[type].splice(i, 1);
                        break;
                    }
                }
            } else {
                // 如果仅仅参数type, 或参数fn邪魔外道，则所有type类型事件清除
                delete this._listeners[type];
            }
        }
        return this;
    }
};

//2\更好的原型写法
function Events(){
	this._listeners = {};
}
Events.prototype = {
	constructor: Events,
	addEvent: function(type,fn){
		this._listeners[type] = this._listeners[type] || [];
		if(typeof fn === "function"){
			this._listeners[type].push(fn);
		}
		return this;
	},
	fireEvent: function(type){
		var eventArr = this._listeners[type];
		if(eventArr instanceof Array){
			for(var i = 0, len = eventArr.length; i < len; i++){
				if(typeof eventArr[i] === "function"){
					eventArr[i].call(this);
				}
			}
		}
		return this;
	},
	removeEvent: function(type,fn){
		var eventArr = this._listeners[type];
		if(eventArr instanceof Array){
			console.log("1");
			if(typeof fn === "function"){
				console.log("2");
				for(var i = 0, len = eventArr.length; i < len; i++){
					if(eventArr[i] === fn){
						eventArr.splice(i,1);
						break;
					}
				}
			}
			else if(typeof fn === "undefined"){
				delete this._listeners[type];
			}
		}
	}
};

var myEvents = new Events();
myEvents.addEvent("once", function fn() {
        alert("该弹框只会出现一次！");
        this.removeEvent("once",fn);
    }
);
document.onclick = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if (!target || !/input|pre/i.test(target.tagName)) {
        myEvents.fireEvent("once");
    }
};

//3\DOM自定义事件/浏览器事件
if (window.HTMLElement) {
	HTMLElement.prototype.addEvent = function(type, fn, capture) {
	    if (HTMLElement.addEventListener) {
	        HTMLElement.prototype.addEvent = function(type, fn, capture){
	        	return this.addEventListener(type, function(event) {
		            fn.call(this, event);
		        }, capture);
	        }
	    } else if (HTMLElement.attachEvent) {
	        HTMLElement.prototype.addEvent = function(type, fn){
	        	return this.attachEvent("on" + type, function(event) {
		            fn.call(this, event);
		        });
	        }
	    }
    	this.addEvent(type, fn, capture);
	};
} else {
	// 如果是不支持HTMLElement扩展的浏览器
    // 通过遍历所有元素扩展DOM事件
    var elAll = document.all, lenAll = elAll.length;
    for (var iAll=0; iAll<lenAll; iAll+=1) {
        elAll[iAll].addEvent = function(type, fn) {
            var el = this;
            el.attachEvent("on" + type, function(e) {
                fn.call(el, e);
            });
        };
    }
}
document.getElementsByTagName('button')[0].addEvent('click',function(e){
	alert(e.target.nodeName);
});

//4\伪DOM自定义事件
var $ = function(el) {
    return new _$(el);    
};
var _$ = function(el) {
    this.el = (el && el.nodeType == 1)? el: document;
};
_$.prototype = {
    constructor: _$,
    addEvent: function(type, fn, capture) {
        var el = this.el;
        
        if (window.addEventListener) {
            el.addEventListener(type, fn, capture);

            var ev = document.createEvent("HTMLEvents");
            ev.initEvent(type, capture || false, false);
            // 在元素上存储创建的事件，方便自定义触发
            if (!el["ev" + type]) {
                el["ev" + type] = ev;
            }
            
        } else if (window.attachEvent) {
            el.attachEvent("on" + type, fn);    
            if (isNaN(el["cu" + type])) {
                // 自定义属性，触发事件用
                el["cu" + type] = 0; 
            }
            
            var fnEv = function(event) {
                if (event.propertyName == "cu" + type) {
                    fn.call(el);
                }
            };
            
            el.attachEvent("onpropertychange", fnEv);
            
            // 在元素上存储绑定的propertychange事件，方便删除
            if (!el["ev" + type]) {
                el["ev" + type] = [fnEv];
            } else {
                el["ev" + type].push(fnEv);    
            }
        }
        
        return this;
    },
    fireEvent: function(type) {
        var el = this.el;
        if (typeof type === "string") {
            if (document.dispatchEvent) {
                if (el["ev" + type]) {
                    el.dispatchEvent(el["ev" + type]);
                }
            } else if (document.attachEvent) {
            	// 改变对应自定义属性，触发自定义事件
                el["cu" + type]++;
            }    
        }    
        return this;
    },
    removeEvent: function(type, fn, capture) {
        var el = this.el;
        if (window.removeEventListener) {
            el.removeEventListener(type, fn, capture || false);
        } else if (document.attachEvent) {
            el.detachEvent("on" + type, fn);
            var arrEv = el["ev" + type];
            if (arrEv instanceof Array) {
                for (var i=0, len = arrEv.length; i < len; i+=1) {
                    // 删除该方法名下所有绑定的propertychange事件
                    el.detachEvent("onpropertychange", arrEv[i]);
                }
            }
        }
        delete el["ev" + type];
        return this;    
    }
};