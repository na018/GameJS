(function () {

    var ouptutContainer = document.getElementById("output");
    var line = 0;

    function output(snippet) {
        ouptutContainer.innerHTML += line++ + ": " + snippet + "</br>";
    }
    //apply()
    // call()
    // bind()  --> which specific object will be bind to this when fct/ method is invoked

    var button={
        handler:"buttonHandler",
        onClick:function(handler) {
            this.handler = handler;
            console.log(this.handler);
            if(this.handler==undefined)console.log("Button: I do not have a log method");
        },
        click:function () {
            this.handler;
            console.log(this.handler);
        }/*,
        log:function () {
            console.log("Log Method from Button.");
        },
        handle:function(){console.log("handle function from Button")}*/
    };
    var handler= {
        log:function(){
            console.log("Button gecklickt.");
        },
        handle:function () {
            console.log("handler.handle()");
            this.log();
        }
    };
  /*  button.click();//buttonHandler
    button.onClick(handler.handle());
    button.onClick(); //ruft handler Objekt auf
    button.click();//ruft handler Objekt auf*/
 var anHandlerBindFct= handler.handle.bind(handler);         // handler.handle()--> Button gecklickt -->undefined

  console.log("---");
 button.onClick(anHandlerBindFct);
 button.onClick(function () {
     handler.handle();
 });
 function gebeNamenAus(){
     Array.prototype.forEach.call(arguments,function (argument) {
         console.log(argument);
     });
 };
 gebeNamenAus("Nadin","Katrin","Apel");
    function gebeNamenAus2(){
        Array.prototype.forEach.apply(arguments,[function (argument) {
            console.log(argument);
        }]);
    };
    gebeNamenAus2("Nadin","Katrin","Apel");

    var zahlen=[Math.random()*10+1,Math.random()*10+1,Math.random()*10+1,Math.random()*10+1];
    console.log(Math.max(Math.random()*1000,Math.random()*1000+1,Math.random()*1000+1,Math.random()*1000+1));
    console.log(Math.max.apply(null,zahlen));






})();