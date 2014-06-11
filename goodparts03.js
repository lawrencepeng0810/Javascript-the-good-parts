/************************************************
*
*	Basic example for Javascript: the good parts
*	For AFT studygroup
*	Author: Mike
*
*************************************************/

/* Chapter5: Inheritance */

// classical languages: objects are instance of classes, and a class can inherit from another class
// in Javascript: objects inherit directly from other objects


// p.47  this.prototype = { constructor: this } 
function Shape(){
	this.x = 0;
	this.y = 0;
}
var shape = new Shape(); // check the console

// pseudoclassical

// overwrite the new operator to a method

// recall p.33
Function.prototype.method = function(name, func){
	this.prototype[name] = func;
	return this;
}
Function.method('new',function(){
	// create new object inherits from constructor's prototype 
	var that = Object.create(this.prototype);
	// binding this to that(the new object)
	var other = this.apply(that, arguments);
	// check return is an object
	return (typeof other === 'object' && other) || that;
});

// define a constructor and augment its prototype
var Mammal = function(name){
	this.name = name;
};
Mammal.prototype.get_name = function(){
	return this.name;
};
Mammal.prototype.says = function(){
	return this.saying || '';
};

// make an instance
var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name();
console.log(name); //Herb the Mammal

var Cat = function(name){
	this.name = name;
	this.saying = 'meow';
	// this.get_name = function(){
	// 	return this.says()+' '+this.name+' '+this.says();
	// };
};
// replace prototype with a new instance of the parent Class
Cat.prototype = new Mammal();
Cat.prototype.purr = function(n){
	var i, s = '';
	for(i=0;i<n;i+=1){
		if(s){
			s+='-';
		}
		s+='r';
	}
	return s;
};
Cat.prototype.get_name = function(){
	return this.says()+' '+this.name+' '+this.says();
};
var myCat = new Cat('Henrietta');
var says = myCat.says();
console.log(says);	//meow
var purr = myCat.purr(5);
console.log(purr);	//r-r-r-r-r
var name = myCat.get_name();
console.log(name); 	//meow Henrietta meow

// add a method inherits
Function.method('inherits', function(Parent){
	this.prototype = new Parent();
	return this;
});

// now Cat can be done in one line
var Cat = function(name){
	this.name = name;
	this.saying = 'meow';
}.inherits(Mammal).method('purr',function(){
	var i, s='';
	for(i=0;i<n;i+=1){
		if(s){
			s+='-';
		}
		s+='r';
	}
	return s;
}).method('get_name',function(){
	return this.says()+' '+this.name+' '+this.says();
});

//instead of giving parameters an order, give them specific name
// easy to read	
/*
var myObject = maker(a,b,c,d,e);

var myObject = maker({
	first: a,
	second: b,
	third, c,
	fourth: d,
	fifth: e	
});
*/

//prototypal

var myMammal = {
	name: 'Herb the mammal',
	get_name: function(){
		return this.name;
	},
	says: function(){
		return this.saying || '';
	}
};

var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function(n){
	var i, s='';
	for(i=0;i<n;i+=1){
		if(s){
			s+='-';
		}
		s+='r';
	}
	return s;	
};
myCat.get_name = function(){
	return this.says() + ' ' + this.name + ' ' + this.says();
};

// Functional pattern - a little bit privacy
var mammal = function(spec){
	var that = {};
	that.get_name = function(){
		return spec.name;
	};
	that.says = function(){
		return spec.saying || '';
	};
	// this.get_name = function(){
	// 	return spec.name;
	// }
	// this.says = function(){
	// 	return spec.saying || '';
	// }	

	return that;
};
var myMammal = mammal({name: 'Herb'});

var cat = function(spec){
	spec.saying = spec.saying || 'meow';
	var that = mammal(spec);
	that.purr = function(n){
		for(i=0;i<n;i+=1){
			if(s){
				s+='-';
			}
			s+='r';
		}
		return s;	
	};
	that.get_name = function(){
		return that.says() + ' ' + spec.name + ' ' + that.says(); 
	};

	return that;
};

// make our super method called superior
Object.method('superior', function(name){
	var that = this,
		method = that[name];
	return function(){
		return method.apply(that, arguments);
	};
});

var coolcat = function(spec){
	var that = cat(spec);
	var super_get_name = that.superior('get_name');
	that.get_name = function(n){
		return 'like ' + super_get_name() + ' baby';
	};
	return that;
};

var myCoolCat = coolcat({name: 'Bix'});
var name = myCoolCat.get_name();
console.log(name);