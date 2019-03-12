深入理解JavaScript系列（3）：全面解析Module模式

1/基本用法
var Calculator = function (eq) {
    //这里可以声明私有成员

    var eqCtl = document.getElementById(eq);

    return {
        // 暴露公开的成员
        add: function (x, y) {
            var val = x + y;
            eqCtl.innerHTML = val;
        }
    };
};
var calculator = new Calculator('eq');
calculator.add(2, 2);

函数没有return的时候,new 返回函数体;
有return时候 ,new 返回return内容.

2/松耦合扩展(加载顺序任意,不好重写函数):
每个单独分离的文件都保证这个结构，那么我们就可以实现任意顺序的加载,这个时候的var就是必须要声明的.
var blogModule = (function (my) {
    var privateName = "博客园";

    function privateAddTopic(data) {
        // 这里是内部处理代码
    }

    my.Name = privateName;
    my.AddTopic = function (data) {
        privateAddTopic(data);
    };

    return my;
} (blogModule || {}));

3/紧耦合扩展(限制了加载顺序,可重写函数):
虽然松耦合扩展很牛叉了，但是可能也会存在一些限制，比如你没办法重写你的一些属性或者函数,
,也不能在初始化的时候就使用Module的属性,因为顺序任意的话不清楚当时对象有什么属性。
紧耦合扩展限制了加载顺序，但是提供了我们重载的机会，看如下例子：
var blogModule = (function (my) {
    var oldAddPhotoMethod = my.AddPhoto;//可使用Module的属性，因为前面的js文件已经声明

    my.AddPhoto = function () {
        // 重载方法，依然可通过oldAddPhotoMethod调用旧的方法
    };

    return my;
} (blogModule));
第一次声明后,后面的js文件可以选择加或不加var,加var的话预解析时会因为变量同名而忽略声明(var),
赋值依然存在.

4/跨文件共享私有对象
var module = (function () { 
    //将所有的私有属性、方法都定义在_private对象中 
    //每个扩展Module都可以通过my._private来访问 
    var my = {}, 
    _private = my._private = {}, 
    
    _seal = function (){ 
        //密封，删除所有私有数据的可访问性 
        delete my._private; 
    }, 
    _unseal = function (){ 
        //解封，让私有数据重新可访问 
        my._private = _private; 
    }; 
    
    my.extend = function(otherModules){ 
        //必须通过此方法来添加扩展Module文件 
        _unseal(); 
        //add other modules 
        _seal();//异步调用，此处只是示意，真正的代码并非如此 
    } 
    return my; 
}());

5\子模块
blogModule.CommentSubModule = (function () {
    var my = {};
    // ...

    return my;
} ());