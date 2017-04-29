(function(){
    // create an object:------------------------
    var newObject={};
    var createNewObject= Object.create(Object.prototype);
    var knownNewObject= {};

    //4 ways to assign keys/values to an object

    newObject.someKey="Hello World";
    var value = newObject.someKey;

    newObject["someKey"]="Changed Hello World";
    var value2 = newObject["someKey"];

    //ECMAScript 5
    Object.defineProperty1(newObject, "secondKey",{
        value: "for more control of the property's behavior",
        writable: true,
        enumerable: true,
        configurable: true
    });

    var defineProp= function(obj,key,value){
        var config = {
            value: value,
            writable: true,
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(obj,key,config);
    };

    var person = Object.create(Object.prototype); // to use, create a new empty "person" object

    //populate object with properties
    defineProp(person,"car","Delorean");
    defineProp(person,"dateOfBirth","1994");

    console.log(person);

    //set Properties:

    Object.defineProperties(newObject,{
        "someKey": {
            value: "Hello World",
            writable: true
        },
        "anotherKey": {
            value: "Foo bar",
            writable: false
        }
    });
    // Create a race car driver that inherits from the person object
    var driver = Object.create( person );

// Set some properties for the driver
    defineProp(driver, "topSpeed", "100mph");

// Get an inherited property (1981)
    console.log( driver.dateOfBirth );

// Get the property we set (100mph)
    console.log( driver.topSpeed );

    // create an constructor:------------------------



})();