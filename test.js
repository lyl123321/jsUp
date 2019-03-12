function Person(name){
    this.name = name;
    var label = 'Person';
}

Person.prototype.nickName = 'PersonPrototype';

Person.prototype.greet = function(){
    console.log('Hi! I am ' + this.name);
}

function Student(name,school){
    this.name = name;
    this.school = school;
    var label = 'Student';
}
 Student.prototype = Object.create(Person.prototype);
 Student.prototype.greet = function(){
	  console.log('Hi! I am ' + this.name + ',my school is ' + this.school);
};
var p1 = new Person('p1');
var s1 = new Student('s1','USTB');
p1.greet();//Hi! I am p1
s1.greet();//Hi! I am s1