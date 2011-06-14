/****************************
 * Assumptions & Disclaimer *
 ****************************/

// this talk is targeted at web application developers who are looking to get a better understanding of javascript
// it is assumed that the audience is already familiar with the basic syntax of the language
// if the code that follows looks like gibberish, then you should probably seek a more introductory resource 
// such as the javascript koans: https://github.com/mrdavidlaing/javascript-koans
// or read "Javascript: The Good Parts" by Douglas Crockford which truly should be read by anyone programming javascript

	function assumptions() {
		var response = '';
		var agreement = ['sure', 'sure', 'i', 'understand'];
		for(var i=0, len=agreement.length; i < len; i++) {
			response += agreement[i];
		}
		return response;
	}
 
// much of the code that follows is for illustrative purposes and is somewhat naive in it's implementation 
// a lot of edge cases and potential gotchas are glossed over for the sake of clarity



/****************
 * Introduction *
 ****************/

// "i understand why people are frustrated with the language.  if you try to write in javascript as though it is java, it'll keep biting you.  
//  i did this.  one of the first things i did in the language was to figure out how to simulate something that looked sort of like a java class, 
//  but at the edges it didn't work anything like it.  and i would always eventually get pushed up against those edges and get hurt."
//
// - douglas crockford

// javascript was originally developed by brendan eich for the netscape browser
// it borrows the syntax of java, the function model of scheme, and the prototype objects of self and combines them into a wildly misunderstood language
// parts of the language are just awful (netscape didn't have the time to get it right)
// but despite it's flaws, the language is amazingly expressive and is one of the most popular languages in the world



/****************************
 * Truthy and Falsey Values *
 ****************************/

// javascript uses the concept of 'falsey' values which are not boolean types but will evaluate to either true or false in conditional statements
// this allows the writing of simpler conditionals but you can easily get burned if you aren't careful

// the following values are considered 'falsey':
// * false
// * null
// * undefined
// * ''
// * 0
// * NaN

	var falseyValues = [false, null, undefined, '', 0, NaN];
	
	for(var i=0, len = falseyValues.length; i < len; i++) {
		var falsey = falseyValues[i];
		if(falsey) {
			console.log(falsey + ' is true');
		} else {
			console.log(falsey + ' is false');		
		}
	}

// all other values are 'truthy' including true, the string "false", and all objects



/**********************
 * Equality Operators *
 **********************/

// equality operators in javascript are unlike those in most languages

// the are 2 sets of equality operators:
// * '===' and '!=='  // good!
// * '==' and '!='    // bad!

// the first set work the way you would traditionally expect
// i.e.; if the 2 operands are the same type and have the same value, then '===' produces true and '!==' produces false

	console.log(0 === '0'); /* false */
	console.log(1 === 1);   /* true  */
	console.log(2 !== '2'); /* true  */
	console.log(3 !== 3);   /* false */

// the second set do the right thing when the operands are of the same type
// if they are different types, javascript will attempt to coerce the values using a series of complicated and obscure rules

	console.log('' == '0');          /* false */
	console.log(0 == '');            /* true  */
	console.log(0 == '0');           /* true  */
	
	console.log(false == 'false');   /* false */
	console.log(false == '0');       /* true  */
	
	console.log(false == undefined); /* false */
	console.log(false == null);      /* false */
	console.log(null == undefined);  /* true  */
	
	console.log(' \t\r\n ' == 0);    /* true  */

// best practice is to always perform comparisons using '===' and '!=='



/*************************
 * Fall-through Operator *
 *************************/

// the '||' operator can be used to fill in default or fallback values when objects are null or undefined

	console.log(null || 2);              /* 2 */
	console.log(null || undefined || 3); /* 3 */
	console.log(undefined || 4 || null); /* 4 */

// the C# equivalent of this operator is '??'

	/*
	
	public static void Greet(string greeting = null) 
	{
		greeting = greeting ?? "hello";
		Console.WriteLine(greeting);
	}
	
	Greet("hi there"); // hi there
	Greet();           // hello
	
	*/


/*************************
 * Objects in Javascript *
 *************************/

// javascript has primitive types like number, string, boolean, null, and undefined
// everything else is an object
// number, string, boolean are immutable but do have methods, making them object-like
// objects are mutable maps of properties (i.e.; hashes or dictionaries)
// so, arrays are objects, functions are objects, regular expressions are objects, and object is an object
// there are no classes or types in javascript (except for the primitive types)



/*******************
 * Object Literals *
 *******************/

// object literals are name/value pairs 
// property names can be any string, including an empty string

	var empty_object = {};

	var person = { 
		'firstName': 'Colin',
		'lastName': 'Casey'
	};
	person.firstName;    /* Colin */
	person['firstName']; /* Colin */

// quotes around the property name are optional if the property name is a proper name (i.e.; it contains no operators or illegal characters)

	var name = {
		first_name: 'Colin',    /* quotes are optional */
		'first-name': 'Colin'   /* quotes are required */
	};
	

// objects can be nested and easily traversed

	var book = {
		title: 'Palm Sunday',
		author: {
			firstName: 'Kurt',
			lastName: 'Vonnegut'
		},
		chapters: [
			'The First Amendment',
			'Roots',
			'When I Lost My Innocence',
			'Triage',
			/* ... */
			'In the Capital of the World'
		]
	};
	book.title;                 /* Palm Sunday */
	book.author.firstName;      /* Kurt */
	book['author']['lastName']; /* Vonnegut */
	book.chapters[3];           /* Triage */

// undefined is returned if an attempt is made to access a non-existant property

	book.publishDate;  /* undefined */
	book['pageCount']; /* undefined */

// attempting to read a property from undefined will throw a TypeError exception

	book.publishDate;      /* undefined */
	
	try {
		book.publishDate.year; /* TypeError */
	} catch(ex) {
		console.log(ex.message);
	}

// you can guard against this by using the '&&' operator

	book.publishDate && book.publishDate.year; /* undefined */

// setting values is simple

	book.publishDate = {};
	book.publishDate.year = 2011;
	book.publishDate['month'] = 'April';

// objects are passed around by reference, never copied

	var x = {}, y = {}, z = {};   /* x, y, and z are different 'empty' objects   */
	var a, b, c = {};             /* a, b, and c are all the same 'empty' object */

	var person = { 
		firstName: 'colin',
		lastName: 'casey'
	};
	var colin = person;
	colin.middleName = 'francis';
	person.middleName; /* francis */

	
	
/***********************
 * The Prototype Chain *
 ***********************/

// every object has a 'prototype'
// the prototype is a linked object that the instance can inherit properties from
// all object literals are linked to Object.prototype which is effectively the end of the prototype chain

// the prototype link has no effect on setting values but it is used in the retrieval process
// if we try to retrieve a property value of an object and the object lacks the property name, 
// then javascript attempts to retrieve the property value from the prototype object
// and if that object is lacking the property,
// then it goes to the prototype object's prototype object and so on until it reaches the end of the prototype chain at Object.prototype

	var a = 37; 
	/* object chain: Number => Number.prototype => Object.prototype */

	var result = a.mustardToast; 
	/* 1. a.mustardToast (a is Number)  - property not found */
	/* 2. Number.prototype.mustardToast - property not found */
	/* 3. Object.prototype.mustardToast - property not found */
	console.log(result); /* undefined */

	var b = [1, 2];
	/* object chain: Array => Array.prototype => Object.prototype */

	var result = b.length;
	/* 1. b.length (b is Array) - property was found */
	console.log(result); /* 2 */

	var result = b.toString();
	/* 1. b.toString (b is Array)   - property not found */
	/* 2. Array.prototype.toString  - property was found */
	console.log(result); /* '1,2' */

// adding a new property to the prototype automatically makes that property available to all object based on that prototype
// this applies to objects that already exist, not just newly created ones

	var o1 = { i: 1 };
	o1.sharedValue;    /* undefined */

	/* add a new property to all instances of Object */
	Object.prototype.sharedValue = 'mustardToast';

	var o2 = { i: 2 };
	o2.sharedValue;    /* mustardToast */
	o1.sharedValue;    /* mustardToast */
 
 
 
/**************
 * Reflection *
 **************/

// the 'typeof' operator returns a string the identifies the type of it's operand

	typeof(37);             /*  number    */
	typeof('hello');        /*  string    */
	typeof(/^a/);           /*  object    */
	typeof({ a: 'b' });     /*  object    */
	typeof([]);             /*  object    */
	typeof([].toString);    /*  function  */
	typeof(null);           /*  object    */
	typeof(undefined);      /*  undefined */
	
// unfortunately, typeof cannot distinguish between null and objects 
// user-defined 'classes' and 'sub-classes' are also indistinguishable from regular objects

// since any property in the prototype chain can produce a value (e.g.; book.toString) 
// to get a list of all the properties of an object with functions removed, use the 'hasOwnProperty' method

	book.hasOwnProperty('pages');    /* true  */
	book.hasOwnProperty('toString'); /* false */

// to loop over all the property names in an object, use the for/in statement
// this will include all properties, functions, and prototype properties

	var o = { 
		a: 0, 
		b: 1, 
		c: 2, 
		someFunction: function() {
			return 3;
		}
	};

	Object.prototype.sharedValue = 'mustardToast';

	for(var property in o) {
		var value = o[property];
		console.log(value);
	}
	/* 0, 1, 2, function, mustardToast */

// using typeof and hasOwnProperty, you can easily filter out properties that you may not be interested in

	for(var property in o) {
		if(o.hasOwnProperty(property) && typeof(o[property]) !== 'function') {
			var value = o[property];
			console.log(value);
		}
	}
	/* 0, 1, 2 */

// to remove a property from an object, use the delete operator

	delete o.someFunction;
	delete Object.prototype.sharedValue;

	
	
/*************************************
 * The Global Object and Namespacing *
 *************************************/

// javascript is dependant on a global object and global variables
// since there is no compilation step or linker, all code is loaded into this common object
// this makes it very easy to define global variables in javascript but this tends to weaken the resiliency of programs and should be avoided
// polluting the global namespace is consider bad practice

// there are 3 ways to define global variables:
// * var a = 0;    // declared global
// * window.a = 0; // declared global
// * a = 0;        // implied global

// a quick side-note:
// the global javascript object in browsers is typically named 'window' 
// but in javascript interpreters such as rhino or spidermonkey it is named 'global' (or possibly something else)

// the following code example is commonly seen javascript program structure:

	var wasClicked = true;

	function handleClick() {
		if(wasClicked) {
			doTheOtherThingToo();
		}
		wasClicked = true;
	}

	function doTheOtherThingToo() {
		wasClicked = false;
	}

// this may work for small, simple programs but can quickly break down as the codebase grows
// a best practice method to avoid this problem is to create a namespace for your code
// namespaces are essentially object literals and are singletons

	App = {};          
	App.Module1 = {};  
	App.Module2 = {};  
	App.Module1.wasClicked = function() {
		/* ... */
	};

// which is equivalent to the following:

	App = {};
	App['Module1'] = {};
	App['Module2'] = {};
	App['Module1']['wasClicked'] = function() {
		/* ... */
	};

// while not a panacea for poorly structured programs, this can reduce naming collisions and bad interactions with 3rd party libraries
// it is also a useful organizational techique and should be preferred over adding to the global object

// because namespaces in javascript are not true namespaces, it is possible to mistakenly clobber an existing namespace
	
	/* namespace declared in "application.js" */
	App = {
		init: function() {
			var panel = new App.Views.Panel();
		}
	};
	
	/* namespace declared in "views.js" */
	App = {};
	App.Views = {};
	App.Views.Panel = function() {
		// ...
	}
	
	/*
	
	<html>
		<body onload="App.init();">
			<script type="text/javascript" src="application.js"></script>
			<script type="text/javascript" src="views.js"></script>
		</body>
	</html>
	
	*/
	
// in this scenario, because "views.js" gets loaded after "application.js", it effectively clobbers the 'App' object when trying to ensure the existence of it's namespace
// when the document ready function executes, there is no 'App.init' function and a TypeError will get thrown
// note: what might have happened if "views.js" was before "application.js"?

// a technique to guard against this is to declare namespaces with the '||' operator

	/* namespace declared in "application.js" */
	App = window.App || {};
	App.init = function() {
		var panel = new App.Views.Panel();
	};	
	
	/* namespace declared in "views.js" */
	App = window.App || {};
	App.Views = App.Views || {};	
	App.Views.Panel = function() {
		/* ... */
	}
	
// or write your own namespace function

	var namespace = function (namespace) {
		var namespaces = namespace.split('.');
		var currentNamespace = window || {};
		
		for(var i=0, len=namespaces.length; i < len; i++) {
			var ns = namespaces[i];
			if (currentNamespace[ns] === undefined) {
				currentNamespace[ns] = {};
			}
			currentNamespace = currentNamespace[ns];
		}
	};
	
	namespace('App.Models'); /* creates App and App.Models */
	namespace('App.Views');  /* App already exists, but will create App.Views */


/*************
 * Functions *
 *************/

// functions are objects
// this means that functions also can contain name/value pairs and a link to a prototype object
// functions are special only in that they can be invoked

	var greeter = function() {
		console.log('hello');
	};

	Function.prototype.delay = function(seconds) {
		setTimeout(this, seconds * 1000);
	};

	greeter.delay(2);

// every function also has 2 hidden properties:
// * a context (a.k.a. this)
// * the code to execute the function

// every function also is created with a 'prototype' property
// the value of the prototype property is an object with a 'constructor' property whose value is the function
// this arrangement is seperate from the link to Function.prototype
// the reason for this convoluted setup will be explained later on

// since functions are object, they can be stored just like any other value
// you can store them in variable, objects, and arrays

	var func = function() {};
	
	var obj = {
		func: function() {}
	};
	
	var funcs = [
		function() {},
		function() {},
		function() {}
	];

// functions can be passed as arguments to other functions

	var a = [4,3,2,1];
	
	var ascending = function(x, y) {
		return x - y; /* result < 0 if x is smaller, result = 0 if x and y are the same, result > 0 if y is smaller */
	};
	
	a.sort(ascending); /* [1,2,3,4] */

// functions can be defined inside of other functions (this is called a closure)
// and they can also be returned from functions

	var incrementor = function(step) {
		return function(num) {
			return num + step;
		};
	};

	var increment = incrementor(2);
	increment(1); /* 3 */
	increment(5); /* 7 */

// this code above is also an example of 'partial application' or 'function currying'
// it is functional-style programming technique not typically seen in object-oriented languages



/***********************
 * Functional Literals *
 ***********************/

// functions are created with function literals:

	var add = function(a, b) {
		return a + b;
	}

// there are 4 parts to this declaration:
// * the reserved keyword function
// * an optional function name (if a function is not given a name, it is an anonymous function)
// * a set of zero or more parameter names which are separated by commas
// * finally, the body of the function that will get executed on invocation


/**********************
 * Invoking Functions *
 **********************/

// when a function is invoked, it gets two additional parameters along with the declared ones:
// * this (sometimes referred to as the scope or context)
// * arguments (an array of all the arguments passed to the function, not just declared ones)

	var argsInspector = function(x) {
		console.log(x);
		console.log(arguments);
	};

	argsInspector();
	/* undefined */
	/* []        */

	argsInspector(1);
	/* 1   */
	/* [1] */

	argsInspector(1, 2, 'c', ['d', 5]);
	/* 1                     */
	/* [1, 2, 'c', ['d', 5]] */

// the arguments object is not a true array but behaves similar to one in that it does have a length property and you can access items by index (e.g.; arguments[3])
// but many other operations are missing and certain scenarios may require you to convert the arguments object into an array before you can do anything useful with it
	

/******************
 * Function Scope *
 ******************/

// we can use the following utility function to investigate the 4 ways to invoke methods and the effect this has on function scope:

	var currentScope = function() {
		result = this === currentScope ?
			"'this' is me" :
			"'this' is " + this;
		console.log(result); 
	}; 


	
/******************************
 * Global Function Invocation *
 ******************************/

	var currentScope = function() {
		result = this === currentScope ?
			"'this' is me" :
			"'this' is " + this;
		console.log(result); 
	};

	currentScope(); 


	
/*****************************
 * Inner Function Invocation *
 *****************************/

	var containerFn = function() {
	
		var currentScope = function() {
			result = this === currentScope ?
				"'this' is me" :
				"'this' is " + this;
			console.log(result); 
		};

		currentScope();
	}();

	
	
/*********************
 * Method Invocation *
 *********************/

	var currentScope = function() {
		result = this === currentScope ?
			"'this' is me" :
			"'this' is " + this;
		console.log(result); 
	};

	var myObject = {
		myScope: currentScope,
		toString: function() { return 'myObject'; }
	};

	myObject.myScope();

	
	
/**************************
 * Constructor Invocation *
 **************************/


	var currentScope = function() {
		result = this === currentScope ?
			"'this' is me" :
			"'this' is " + this;
		console.log(result); 
	};

	currentScope.prototype.toString = function() { 
		return 'a new object'; 
	};

	new currentScope();

	
	
/****************************
 * Invocation Using apply() *
 ****************************/

	var currentScope = function() {
		result = this === currentScope ?
			"'this' is me" :
			"'this' is " + this;
		console.log(result); 
	};

	currentScope.apply(currentScope);

	

/***************************
 * Invocation Using call() *
 ***************************/

	var currentScope = function() {
		result = this === currentScope ?
			"'this' is me" :
			"'this' is " + this;
		console.log(result); 
	};

	currentScope.call(currentScope);

	
	
/******************
 * Changing Scope *
 ******************/

	var currentScope = function() {
		result = this === currentScope ?
			"'this' is me" :
			"'this' is " + this;
		console.log(result); 
	};

	var myObject = {
		toString: function() {
			return 'myObject';
		}
	};

	currentScope.apply(myObject);
	
	
	
/********************
 * Creating Objects *
 ********************/

// if a function is invoked with the 'new' prefix, then a new instance will be created
// this instance will be automatically linked to the prototype member of that function
// and 'this' will be bound the that new object
// the new operator also changes the behaviour of the return statement
// functions intended to be used with the new prefix are 'constructor functions'
// this is the 'pseudoclassical' approach to creating objects

	/* constructor function */
	Dog = function(name) {
		this.name = name;
		return this;
	};
	
	/* instance methods for all Dog objects */
	Dog.prototype.speak = function() {
		console.log('woof!');
	};

	var rover = new Dog('Rover');
	rover.name;    /* Rover */
	rover.speak(); /* woof! */

// the 'new' operator is required when calling a constructor
// if you forget to add the 'new' prefix and call the function bad things can happen
// it will be called as a function instead of a constructor and 'this' will be pointing at the global object instead of the new object
// then the global object will be returned as if it were the new instance

	
/**********************
 * Augmenting Objects *
 **********************/
 
// augmenting objects, especially core classes is a powerful techique but is considered by many to be a bad practice
// it is usually referred to as 'monkey-patching' because of you can easily monkey around with an object's expected behaviour
// this often-abused technique should be used sparingly and at your own risk

	/* class-level augmentation */
	String.prototype.trim = function() {
		var trimRegex = /^\s+|\s+$/g;
		return this.replace(trimRegex, '');
	};
	
	var sandwich = '   ham melt     '; 
	sandwich.trim() /* 'ham melt' */
	
	/* instance-level augmentation */
	var word1 = { value: 'music' };
	var word2 = { value: 'film' };
	
	word1.reverse = function() {
		var word = this.value;
		var chars = [];
		for(var i = word.length-1; i >= 0; i--) {
			chars.push(word[i]);
		}
		return chars.join('');
	};
	
	word1.reverse(); /* cisum */
	
	try	{
		word2.reverse(); /* TypeError */
	} catch(ex) {
		console.log(ex.message);
	}

// with instance-level augmentation, there is an inconsitency in the language that prevents native types from being modified in this manner
// the code above will not work if you replace the word1 declaration with: var word1 = 'music';



/***********************
 * Variables and Scope *
 ***********************/

// javascript has function scope
// this means that parameters and variables defined in a function are not visible outside of that function
// and a variable defined anywhere in a function is visible everywhere within the function

	var outer = function() {
		var a = 0, b = 1, c;
		console.log([a, b, c]);     /* [0, 1, undefined]   */
		
		var inner = function() {
			var b = 99, c = 100;
			a = b + c;
			console.log([a, b, c]); /* [199, 99, 100]      */
		}();
		
		console.log([a, b, c]);     /* [199, 1, undefined] */
	}();
	
	

/************
 * Closures *
 ************/

// inner functions get access to the parameters and variables they are defined in
// the exception here are the variables this and arguments
// this makes for an interesting case when the inner function may have a longer lifetime than the outer function

	var cat = function(name) {
		return {
			getName: function() {
				return name;
			}
		};
	};
	
	var myCat = cat('mischief');
	myCat.getName(); /* mischief  */
	myCat.name       /* undefined */
	
// even though the function 'cat' has already returned, the inner function 'getName' still has access to the name parameter
// this access is not a copy, rather the value of the parameter itself
// the reason is that a function always has access to the context in which is was created
// this is called a 'closure' and the context is referred to as the 'binding'
// a commonly seen usage of closures and binding is with event handling and callbacks



/***************
 * Inheritance *
 ***************/

// object-oriented languages typically provide a mechanism to inherit from existing classes as a form of code-reuse

	/*

	C# example
	
	class Set : Array
	{
		public override int IndexOf(object o) 
		{
			return base.IndexOf(o);
		}
		
		...
	}
	
	*/
	
// classical inheritance also allows specification of a system of types, freeing the programmer from having to write explicit casts and giving better type-safety
// in javascript, there is no system of types or type-safe function calls and the lineage of an object is irrelevant
// what is relevant is what the object can do, not where it comes from 
// this is sometimes referred to as 'duck-typing' (if it walks like a duck, talks like a duck, then it is a duck)
// the code reuse patterns of javascript are much richer
// supporting both classical patterns and other, more expressive ones

// javascript is a prototypical language
// this means that objects inherit directly from other objects
// unfortunately, the prototype mechanism is obscured by rather cryptic syntax
// an unnecessary level of indirection is added instead of letting objects inherit directly
// this level of indirection is the 'constructor function'

// when a function object is created, the Function constructor that produces the function object runs some code like this:

	this.prototype = { constructor: this }; 
	
// the new function object is given a prototype property whose value is an object containing a constructor property
// the value of the constructor property is the new function object
// the constructor property is not very useful, it is the prototype object that is important

// when a function is invoked with the 'new' operator, this changes the way the function is executed
// if the 'new' operator where a method instead of an operator, it might look like this:

	Function.prototype.new = function() {
		/* create a new object that inherits from the constructor's prototype */
		var F = function() { };
		F.prototype = this.prototype;
		var that = new F();
		
		/* invoke the constructor, binding 'this' to the new object */
		var other = this.apply(that, arguments);
		
		/* if the return value isn't an object, substitute the new object */
		return (typeof(other) === 'object' && other) || that;
	};
	
	var Dog = function(name) {
		this.name = name;
	};
	
	var myDog = Dog.new('spot');
	console.log(myDog.name); /* spot */
	
// when defining a new object type, you typically specify the constructor function and then extend the prototype

	var Animal = function(name) {
		this.name = name;
	};
	
	Animal.prototype.says = function() {
		return this.name + ' says nothing';
	};
	
// we can extend from the Animal pseudoclass to create a new object type that inherits the Animal properties
// this is achieved by defining a new constructor function and replacing its prototype with an instance of Animal

	var Cat = function(name) {
		this.name = name;
	};
	
	Cat.prototype = new Animal();
	
	Cat.prototype.says = function() {
		return this.name + ' says "meow"';
	}
	
	Cat.prototype.purr = function() {
		console.log('prrrrrrrrrrrr');
	};
	
	var kitty = new Cat('mischief');
	kitty.says(); /* mischief says "meow" */
	kitty.purr(); /* prrrrrrrrrrrr        */
	
	var emu = new Animal('shemu the emu');
	emu.says();   /* shemu the emu says nothing */
	try {
		emu.purr();   /* TypeError */
	} catch(ex) {
		console.log(ex.message);
	}
	
// the prototype chain can be extended further using the same procedures

	var Tiger = function() {
		this.name = 'simba';
	};
	
	Tiger.prototype = new Cat();
	/* object chain: Tiger => Cat.prototype => Animal.prototype => Object.prototype */
	
// but what happens when you override a method of an object and still need access the parent implementation?

	Tiger.prototype.says = function() {
		var saying = Cat.prototype.says.call(this);
		return saying + ' because ' + this.name + ' is a only a cub';
	}

	var tiger = new Tiger();
	tiger.says(); /* simba says "meow" because simba is only a cub */
	
	

/***********************
 * Simpler Inheritance *
 ***********************/

// the 'new' operator and the ugliness of setting the prototype chain can be done away with quite easily
// constructor functions can simply augment objects to achieve the same effect
// this is also known as 'parasitic' or 'prototypal inheritance' since each successive subclass takes an existing object and injects it's own behaviour into it

function Widget(name) {
	var instance = {
		name: name,
		toString: function() {
			return 'widget "' + this.name + '"';
		}
	};
	return instance;
}

function Whatzit(name, cost) {
	var instance = Widget(name); /* the parent constructor */
	instance.cost = cost;
	instance.toString = function() {
		return 'whatzit "' + this.name + '" costs $' + this.cost;
	};
	return instance;
}

var whatzit = Whatzit('now', 99);
console.log(whatzit.toString());
	

/*****************************************
 * Favoring Composition Over Inheritance *
 *****************************************/

// one interesting aspect of the prototypal inheritence provided by javascript is that we can do away with classes
// the focus shifts instead to objects and behaviours
// the classification process of breaking an application down into a set of nested abstractions can be completely avoided

// the Tiger => Cat => Animal => Object inheritence chain demonstrated above is an example of 'differential inheritence'
// in other words, objects which are slight different than the object on which it was based

// a more useful application of prototypal inheritence is 'compositional inheritence' or 'mixins'
// this is a method of using base sets of behaviour and mixing them together into a single object

	var Lion = function() {	};
	
	Lion.prototype.roar = function() {
		console.log('rawr!');		
	};
	
	Lion.prototype.socialize = function() {
		console.log("hey, how's everyone doing tonite?");
	};
	
	var Tigress = function() { };
	
	Tigress.prototype.intimidate = function() {
		console.log('hiss & growl!');
	};
	
	Tigress.prototype.socialize = function() {
		console.log('get bent');
	};
	
	/* a liger?  it's like a lion and a tiger mixed...bred for its skill in magic. */
	var Liger = function() {
		var composedOf = [Tigress, Lion];
		for(var i=0, len=composedOf.length; i < len; i++) {
			for(var property in composedOf[i].prototype) {
				this[property] = composedOf[i].prototype[property];
			}
		}
		return this;
	};
	
	var liger = new Liger();
	liger.roar();
	liger.intimidate();
	liger.socialize();
	
// in this way, a constructor could assemble objects from a set of parts
// this is like building with lego blocks
// the 'duck-typing' capabilties of javascript are a benefit here since we are not burdened with a type system concerned about the lineage of classes
// instead we can focus on reusable behaviours

 

/****************
 * Hiding State *
 ****************/

// javascript has no concept of 'public' or 'private' state 
// but you can simply use closures to duplicate this functionality
// this technique is called 'the module pattern'

	var Greeter = (function () { 		
		/* this acts as a container for our public operations */
		var obj = {};
	
		/* these are private variables */
		var _greeterName = 'colin';
		var _greeting = 'hello';
		
		/* this is a private method */
		function _doGreet() { 
			obj.hasGreeted = true;
			return _greeterName + ' says ' + _greeting;
		} 
		
		
		/* this is a public property */
		obj.hasGreeted = false; 
		
		/* these are public methods */
		obj.greet = function () { 
			return _doGreet();
		}; 
		
		obj.setGreeting = function(greeting) {
			_greeting = greeting;
		};
		
		return obj; 
	}());

	console.log(Greeter.hasGreeted);   /* false            */
	console.log(Greeter.greet());      /* colin says hello */
	console.log(Greeter._greeterName); /* undefined        */

	Greeter.setGreeting("what's up?");

	console.log(Greeter.hasGreeted); /* true                  */
	console.log(Greeter.greet());    /* colin says what's up? */

	
/***********************
 * Leveraging Features *
 ***********************/

// the 2 examples below highlight how we can leverage the expressiveness of the javascript language
// though it is relatively easy to enhance the functionality of the language, when it comes to composing larger javascript applications
// it is recommended that you use libraries like 'underscore.js', 'prototype', etc.
// these libraries provide many useful methods, patterns, and syntatic sugar that will make your code much more readable and maintainable
// while shielding you from a lot of the strange edge cases that lead to unexpected behaviour

// Example #1: Hiding State, Augmenting Objects, Cleaning Up The Syntax
// with the addition of a few simple methods, object creation and composition can be made to look much cleaner

	Loggable = (function () { 			
		/* use console or a no-op implementation for those that don't support console */
		var logger = window.console || {
			log:   function() {},
			info:  function() {},
			warn:  function() {},
			error: function() {}
		};
		
		return {
			debug: function(msg) {
				logger.log(msg);
			},
			
			info: function(msg) {
				logger.info(msg);
			},
			
			warn: function(msg) {
				logger.warn(msg);
			},
			
			error: function(err) {
				logger.error(err);
			}
		};
	}());
	
	Observable = (function() {
		var listeners = {};
		
		var _getEventListeners = function(eventName) {
			return listeners[eventName] || [];
		};
		
		var _setEventListeners = function(eventName, listenerList) {
			listeners[eventName] = listenerList;
		};
	
		return {
			bind: function(eventName, fn) {
				var listenerList = _getEventListeners(eventName);
				listenerList.push(fn);
				_setEventListeners(eventName, listenerList);
			},
			
			unbind: function(eventName, fn) {
				var listenerList = _getEventListeners(eventName);
				/* find the fn object and remove it */
				var index = listenerList.indexOf(fn);
				if(index != -1) {
					/* this method is preferable to delete listenerList[index] since it won't leave an undefined value inside the array	*/
					_setEventListeners(eventName, listenerList.splice(index, 1));
				}
			},
		
			fireEvent: function(eventName) {
				var eventArgs = Array.prototype.slice.call(arguments);
				eventArgs.shift(); /* remove the 'eventName' parameter, leaving the rest */
				
				var listenerList = _getEventListeners(eventName);
				for(var i=0, len=listenerList.length; i < len; i++) {
					var fn = listenerList[i];
					fn.apply(this, eventArgs);
				}
			}
		};
	}());
	
	Function.prototype.mixin = function() {
		var mixins = arguments; /* this can take an infinite number of mixins */
		for(var i=0, len=mixins.length; i < len; i++) {
			var mixin = mixins[i];		
			for(var property in mixin) {
				this.prototype[property] = mixin[property];
			}			
		}
		return this;
	};
	
	Object.define = function(definition) {
		var constructor = function() {
			if(this.initialize && typeof(this.initialize) === 'function') {
				this.initialize.apply(this, arguments);
			}
		};
		
		var proto = constructor.prototype;
		for(var property in definition) {
			proto[property] = definition[property];
		}
		
		return constructor;
	};
	
	var Dog = Object.define({
		initialize: function(name) {
			this.name = name;
		},
		
		speak: function() {
			var sound = 'arf!';			
			this.info(this.name + ' is about to make the sound ' + sound);
			this.fireEvent('speak', this.name, sound);			
			return sound;
		}
	}).mixin(Loggable, Observable);
	
	var dog = new Dog('pizza');
	
	dog.bind('speak', function(dogName, sound) {
		console.log('speak event occured for dog named ' + dogName);
	});
	
	console.log(dog.speak());
	/* pizza is about to make the sound arf!   */
	/* speak event occured for dog named pizza */
	/* arf!                                    */
	
// Example #2: Simple Method Interception
// the dynamic nature of javascript makes it fairly trivial to implement proxies and interceptors without a lot of ceremony
// note: why does the interceptAll function apply the intercept using the interceptHandler inner-function instead of directly inside the loop?

function interceptAll(obj, interceptFunction) {
	/* this function returns a function that will call the interceptor and then the actual function */
	var interceptHandler = function(functionName, actualFunction) {
		return function() {
			var args = Array.prototype.slice.call(arguments);
			args.push(functionName);
			interceptFunction.apply(obj, args);
			return actualFunction.apply(obj, args);
		};
	};

	/* loop through all the objects properties */
	for(var prop in obj) {
		var val = obj[prop];
		/* is the value a function? */
		if(typeof(val) === 'function') {
			/* if so, replace the function with the incept handler */
			obj[prop] = interceptHandler(prop, val);
		}
	}
}

var calculator = {	
	add: function(a, b) {
		return a + b;
	},
	
	subtract: function(a, b) {
		return a - b;
	}
};

interceptAll(calculator, function() {
	var methodName = arguments[arguments.length - 1];
	console.log('intercepted "' + methodName + '" method of calculator');
});

calculator.add(2, 2);
calculator.subtract(3, 7);


/********************
 * Useful Resources *
 ********************/
	
// "Javascript: The Good Parts" by Douglas Crockford
// http://github.com/mrdavidlaing/javascript-koans
// http://bonsaiden.github.com/JavaScript-Garden/
// http://www.jslint.com/
// http://blip.tv/jsconf
// http://developer.yahoo.com/yui/theater/
