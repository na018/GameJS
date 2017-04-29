(function(){
    var ouptutContainer = document.getElementById("output");
    var line = 0;

     function output(snippet) {
     ouptutContainer.innerHTML += line++ + ": " + snippet + "</br>";
     }
    output={
        snippet:"",
        add:function(snippet){this.snippet+=line++ + ": " + snippet + "</br>"},
        line:0,
        print:function(){ouptutContainer.innerHTML=this.snippet},
    };
})();