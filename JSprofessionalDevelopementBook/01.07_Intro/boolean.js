(function(){
    var ouptutContainer=document.getElementById("output");
    var line=0;
    function output(snippet){
        var text=""+snippet;
        ouptutContainer.innerHTML+=line++ +": "+snippet+"</br>";
    }
    var testArray=[
        ["false==0",false==0],
        ['false==""',false==""],
        ['0=="',0==""],
        ["null==false",null==false],
        ["null==undefined",null==undefined],
        ["undefined==undefined",undefined==undefined],
        ["null==null",null==null],
        ["null==true",null==true],
        ["Nan==false",NaN==false],
        ["Nan==null",NaN==null],
        ["typeop NaN",typeof NaN],
        ["NaN==NaN",NaN==NaN,NaN,NaN=="Text"]
    ];
    console.log(testArray)
    for(var i=0;i<testArray.length;i++){
        output(testArray[i]);
    }

})();