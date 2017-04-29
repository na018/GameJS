(function () {
    var nadin = Object.create(Object.prototype, {
        name: {
            value: 'Apel',
            writable: false,
            configurable: true,
            enumerable: true
        },
        firstName: {
            value: 'Nadin-Katrin',
            writable: false,
            configurable: true,
            enumerable: true
        },
        properties: {
            value: [
                'I love figure skating',
                'I dance',
                'funny (sometimes)'
            ],
            writable: true,
            configurable: true,
            enumerable: true
        },
        name2: {
            value: 23,
            writable: true,
            configurable: true,
            enumerable: true
        }
    });
    console.log(nadin);
    console.dir(nadin.properties[2]);
    nadin.properties.push('I develope awesome software');
    nadin.properties = "New";
    nadin.properties[0] = "new prop";
    console.log(nadin);
    nadin.name2 = 'This is not nadin';

    console.log(nadin.name2);
    console.log(Object.getOwnPropertyDescriptor(nadin, 'name'));
    Object.defineProperty(nadin, 'cute', {
        value: 'Yes, very <3 :D',
        writable: true,
        configurable: true,
        enumerable: true
    });
    console.log(nadin);
    Object.defineProperties(nadin, {
        clever: {
            value: 'Yes, very <3 :D',
            writable: true,
            configurable: true,
            enumerable: true
        },
        awesome: {
            value: 'Yes, very <3 :D',
            writable: true,
            configurable: true,
            enumerable: true
        },
        notenumerable: {
            value: 'not enumerable',
            enumerable: false
        },
        testval: {
            value: 'testval'
        }
    });
    console.log(Object.getOwnPropertyDescriptor(nadin, 'testval'))
    console.log(nadin);
    console.log(Object.keys(nadin));
    console.log(Object.getOwnPropertyNames(nadin));
    Object.preventExtensions(nadin);
    if (Object.isExtensible(nadin))
        Object.defineProperty(nadin, 'change', {
            value: "This change does not work anymore :/",
            writable: true,
            configurable: true,
            enumerable: true
        });
    else
        console.log(nadin.firstName+': "I am not extensible."\nExtensible: '+Object.isExtensible(nadin));

    console.log(nadin);

    Object.seal(nadin);
    //Property Diskreptoren dürfen nicht verändert werden. Eigenschafte nicht gelöscht/erweitert werden
    //Werte der Eigenschaften dürfen weiterhin verändert werden
    nadin.awesome='sometimes';
    console.log(nadin);
    if(Object.isSealed(nadin))
        console.log('Property Diskreptoren dürfen nicht verändert werden. Eigenschafte nicht gelöscht/erweitert werden');
    Object.freeze(nadin);
    if(Object.isFrozen(nadin))
        console.log('die Werte können nun auch nicht mehr verändert werden.');

    var PersonObj=function(vorName,nachName){
        if(!(this instanceof PersonObj)) {
            console.info('You did not create the Object constructor with the new Operator. But no Problem I do this for you ;)');
            return new Person(vorName, nachName);
        }
        this.vorName=vorName;
        this.nachName=nachName;
        this.toString=function(){
            return this.vorName+ ' '+this.nachName;
        }
    }
/*--------------------------___*/
    class Person{
        constructor(vorName,nachName){
            this.vorName=vorName;
            this.nachName=nachName;
        }
        toString(){
            return this.vorName+ ' '+this.nachName;
        }
    }
    var nadin=new Person('Nadin-Katrin','Apel');
    console.log(nadin.toString());
    console.log(PersonObj('Jessica','Anderson').toString());
    console.log(new PersonObj('Jessica','Musterfrau').toString());
    var newPerson=new PersonObj('Jessica','Musterfrau');
    console.log(newPerson.toString());

})();