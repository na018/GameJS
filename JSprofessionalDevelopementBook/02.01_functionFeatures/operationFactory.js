(function () {

    var ouptutContainer = document.getElementById("output");
    var line = 0;

    function output(snippet) {
        ouptutContainer.innerHTML += line++ + ": " + snippet + "</br>";
    }

    /*    output={
     snippet:"",
     add:function(snippet){this.snippet+=line++ + ": " + snippet + "</br>"},
     line:0,
     print:function(){ouptutContainer.innerHTML=this.snippet},
     };*/


    function operationFactory(name) {
        switch (name) {
            case 'add':
                return function (x, y) {
                    return x + y;
                };     //return x*y; not working
            case 'sub':
                return function (x, y) {
                    return x - y;
                };
            case 'mult':
                return function (x, y) {
                    return x * y;
                };
            case 'div':
                return function (x, y) {
                    return x / y;
                }
        }
    }

    /*    output.add(operationFactory('add')(1, 2));
     output.add(operationFactory('mult')(1, 2));
     output.print();*/


    output(operationFactory('add')(1, 2));
    output(operationFactory('mult')(1, 2));

    var operationen = {
        addition(x, y, ...val){
            output(x + y + val);
        }
    };
    operationen.addition(2, " Haha", 3, 23, 34, 45, 'sdfa');

    /*****/
    var name = "Global Name";
    //not working in strict modus
    function getNameGlobal() {
        return this.name;
    }

    var p1 = {name: "Peter Object", getName: getNameGlobal};
    var p2 = {name: "Peter Object", getName: getNameGlobal};
    output('This:')
    output(getNameGlobal());
    output(p1.getName());
    output(p2.getName());


    console.log('normal');
    console.error('my error');
    console.info('info');
    console.debug('debug');


    output('range of validity')

    function variableVisibility(x) {
        var timeNow = new Date().getMilliseconds();
        console.info(timeNow);
        if (x) {
            var y = 4711;
        }
        for (var i = 0; i < y; i++) {
            //do something
        }
        console.log(i);
        console.log(y);
        console.info(new Date().getMilliseconds());
        console.info(new Date().getMilliseconds() - timeNow);
    }

    output(["y", variableVisibility("y")]);
    output(["i", variableVisibility("i")]);

    output('overwrite methods:')

    function animal(name,age,sound) {
        var out;
        if(arguments[1]&&arguments[1]>1)
        out="Hi :) my name is "+name+" and I am "+age+" years old.";
        else if(arguments[1]&&arguments[1]<=1) out="Hi :) my name is "+name+" and I am "+age+" year old.";
        else if(arguments[0]) out="Hi :) my name is "+name+" and I do not know my age.";
        if(sound)out+=" "+sound+"!";
        output(out);
    }
    animal("Dog",2,"Wuff");
    animal("snake",23);
    animal("blizzard");
    animal('cat',1,'meow',23);

    function constructorFct(title){
        this.title=title;
        output(this.title)
    }
    var myConstuctor=new constructorFct('I am a constructor');
    output(new constructorFct('I am a constructor'));
    console.log(myConstuctor.constructor)

})();