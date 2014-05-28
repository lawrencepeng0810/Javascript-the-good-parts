/************************************************
*
*	Basic example for Javascript: the good parts
*	For AFT studygroup
*	Author: Mike
*
*************************************************/

/* Chapter4: Functions */

// function literals doesn't require a name, it can be anonymous
var add = function(a,b){
	return a+b;
};	//add.name is empty string

// 1. The Method Invocation Pattern

var myObject = {
	value: 0,
	increment: function(inc){
		this.value += typeof inc === 'number' ? inc : 1;
	}
};

myObject.increment(); // call function throught object method
document.writeln(myObject.value);  // 1

myObject.increment(2);
document.writeln(myObject.value);  // 3

// 2. The Function Invocation Pattern

var sum = add(3,4);
console.log(sum);

// 3. The Constructor Invocation Pattern
var Quo = function(string){
	this.status = string;	
}; // Capitalize naming

Quo.prototype.get_status = function(){
	return this.status;
};

var myQuo = new Quo("confused"); 
console.log(myQuo.get_status());
// not recommend


// 4. The Apply Invocation Pattern
var array = [3,4];
var sum = add.apply(null,array);
console.log(sum); // 7


//arguments array available to functions
var sum = function(){
	var i, sum = 0;
	for(i=0;i<arguments.length;i+=1){
		sum += arguments[i];
	}
	return sum;
}
console.log(sum(4,8,15,16,23,42));


// link Function prototype with a "method" method, no need to type prototype anymore  
Function.prototype.method = function(name, func){
	if(!this.prototype[name]){
		this.prototype[name] = func;		
	}
};

String.method('trim', function(){
	return this.replace(/^\s+|\s+$/g, ''); // regex at Chapter 7
});
console.log('  asdasdas    '.trim()); // works

// Recursion
// Fibonacci sequence
var fibonacci = function(n){
	return (n < 2) ? n : (fibonacci(n-1)+fibonacci(n-2));
};
console.log(fibonacci(10));

//Scope

var foo = function(){
	
	var a = 3, b = 5;
	var bar = function(){
		var b = 7, c = 11;	
		// a is 3, b is 7, c is 11
		a += b+c;	
		// a is 21, b is 7, c is 11
		
	};
	// a is 3, b is 5, c is not defined
	bar();
	// a is 21, b is 5
};
foo();

// declare variables at the top of the body


// Callback
function randomAdd(arg1, arg2, callback){
	var random = arg1 + arg2;
	callback(random);
}

randomAdd(1,3, function(num){
	console.log('callback '+ num);
});

// Closure: Module Pattern

var mainModule = (function(){
	// private variables and methods
	var a = 0;
	var b = function(){
		console.log(1);	
	};
	return{
		getA: function(){
			console.log(a);
		},
		getB: b(),
	};
})();

// Curry

var wait = function(a){
	return function(b){
		console.log("This is what you type in sequence " + a + " " + b);
	};
};

var testA = wait('testA');
testA('testB');