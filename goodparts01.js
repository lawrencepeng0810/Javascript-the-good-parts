/************************************************
*
*	Basic example for Javascript: the good parts
*	For AFT studygroup
*	Author: Mike
*
*************************************************/

/* Chapter2: Grammer */


/* 
*	p6 comment: use single line: //	 (ctrl + / or cmd + / )
*/ 

/* 
*	p7 number: number are all 64-bit floating point
*/

console.log(100==1e2);
console.log(100<Infinity);

/*
*	p8 string
*/

var s = 'Mike\'s coding';
console.log(s);
// \u for unicode
console.log("A"==="\u0041");

// str concatenation
var cat = 'c'+'a'+'t';
console.log(cat);

/*
*	p10 statement
*/

// 	variable scope
{
	var varInBlock = 'asd';
}
console.log(varInBlock);	//block doesnt create new scope

function scopeTest(){
	var scopeStr = 'can you access?';
	console.log(scopeStr);
}
console.log(scopeStr);	//scopeStr is not defined

//	write human-readable code
var a = 1000;
do{
	switch(true){
		case (a>100):
			console.log('greater than 100');
			break;
		case a<0:
			console.log('negative number');
			break;
		default:
			console.log('regular number');
	}
}while(false);

/*
*	p15 expression
*/

// ternary operator
var ter = (a<1000)? 'small' : 'large';
console.log(ter);

// use typeof to make sure your varaible type
console.log(typeof(ter));	//string






/*	Chapter3: Objects  */

// in javascript, array, functions and regular expression are objects
var book = {
	'name': 'The good part',
	'author': 'Douglas Crockford'
};

console.log(book.name);	//works
console.log(book['name']);	//works


var status = book.status || 'unknown';
console.log(status);

//	Objects are passed by reference
var x = {
	'name': 'x men'
};
y = x;
y.power = 'super';
console.log(x.power);	//super

// use delete to delete object property
function myclass() {
    this.variable = 'myvalue'
    delete this.variable // finished with this variable
}
var inst = new myclass();

// might cause unwanted linking
var book1 = {
	'name': 'The good part 1',
	'author': 'Douglas Crockford 1'	
};
var book2 = {
	'name': 'The good part 2',
	'author': 'Douglas Crockford 2' 
};
delete book2.author;
console.log(book2.author);


// use one global variable to manage your application
var MYAPP = {};
MYAPP.website = {
	'html': 'erb',
	'css' : 'compass'
};
MYAPP.mobile = {
	'android' : 'JAVA',
	'ios'     : 'OBJECT C',
};


