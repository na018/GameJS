(function(){
    //apply()
    // call()
    // bind()  --> which specific object will be bind to this when fct/ method is invoked

    var person = {
        firstName: "Penelope",
        lastName: "Barrymore",
        fullName: function () {
            // ​ Notice we use "this" just as we used "he" in the example sentence earlier?:​
            //fullname is invoked by the person object, so this refers to the person object
            console.log(this.firstName + " " + this.lastName);
	    // ​ We could have also written this:​​
           // console.log(person.firstName + " " + person.lastName);

        }
    }
    var anotherPerson={
        firstName: "Jonny",
        lastName: "Depp"
    }
    var mp=person;
    person.fullName();
    person.fullName.apply(anotherPerson);

    var operationFactory={
        x:0,y:0,z:0,
        add:function () {
            var result=0;
             Array.prototype.forEach.call(arguments,function (argument) {
                result+=argument;
            });
            return result;
        },
        addVector:function (t) {
            console.log(t);
            return this.x+this.y+this.z
        },
        sub:function () {
            var result=0;
            Array.prototype.forEach.call(arguments,function (argument) {
                result-=argument;
            });
            return result;
        }
    };
    var myVector={
        x:1,
        y:4,
        z:3
    }
    console.log(operationFactory.addVector.apply(myVector,[3]));
    console.log(operationFactory.add(10,5));
})();