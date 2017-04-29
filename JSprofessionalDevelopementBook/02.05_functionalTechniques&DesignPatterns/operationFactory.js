(function () {
    mySelfDefining();
    // myCallBack();
    // myIIFE();
    // myCurry();
    // myPartial();
    //myComposition();
    //myRecursion();
    // myClosure();
    // myMemoization();


    // var ouptutContainer = document.getElementById("output");
    var line = 0;

    function output(snippet) {
        ouptutContainer.innerHTML += line++ + ": " + snippet + "</br>";
    }

    function myComposition() {

        function add4(x) {
            console.log(x + "+4");
            return x + 4;
        };
        function mult7(x) {
            console.log(x + "*7");
            return x * 7;
        };

        var composition = function (f, g) {
            return function (x) {
                return f(g(x));
            };
        };
        console.log(composition(function (x) {
            return x + 1
        }, function (x) {
            return x + 2
        })(22));


        var composition2 = function (f, g) {
            return function () {
                return f.call(this, g.apply(this, arguments));
            };
        };
        console.log(composition2(function (x) {
            return x + 1
        }, function (x) {
            return x + 2
        })(23));
        console.log(composition2(add4, mult7)(4));
        var plus4mult7 = composition2(mult7, add4);
        console.log(plus4mult7(2));
        console.log(mult7(add4(2)));
        console.log(add4(mult7(2)));
        console.log(add4(mult7(plus4mult7(2))));

        var composition3 = function () {
            var functions = arguments;
            return function () {
                var args = arguments;
                for (var i = functions.length; i-- > 0;) {
                    args = [functions[i].apply(this, args)]
                }
                return args[0];
            }

        };
        console.log("---");
        var add8mult7 = composition3(mult7, add4, add4)(2);

        console.log(add8mult7);
        console.log()


    }

    function myRecursion() {
        var fibonacciRecursive = function (n) {
            console.log((n - 1) + " + " + (n - 2));

            return n < 2 ? n : fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2)
        };
        var text = function (n) {
            console.log("inner" + n)
            return n++;
        }
        for (var n = -1; n++ < 10;) {
            console.log("for" + n)
            console.log(text(n));
        }

        console.log(fibonacciRecursive(5));
    }

    function myClosure() {
        var instanceCounter = function (name) {
            var i = 0;
            return function () {
                i++;
                console.log(name + " : " + i);
            }
        };
        var firstInstance = instanceCounter('first closure:');
        firstInstance();
        firstInstance();
        var secondInstance = instanceCounter('second closure:');
        secondInstance();
        secondInstance();

    }

    function myMemoization() {
        var fibonacciCache = function () {
            var cache = [0, 1];
            var fibonacci = function (n) {
                var result = cache[n];
                if (typeof result !== 'number') {
                    console.log('New calculation of: ' + n);
                    result = fibonacci(n - 1) + fibonacci(n - 2);
                    cache[n] = result;
                }
                return result;
            };
            return fibonacci;
        };
        var fibonacci = fibonacciCache();
        console.log(fibonacci(3));
        console.log(fibonacci(11));
        console.log(fibonacci(11));
        console.log(fibonacci(5));

    }

    function myPartial() {


        function volume(x, y, z) {
            console.log(x + ", " + y + ", " + z);
            return x * y * z;
        }

        function volumeB() {
            var result = 1;
            Array.prototype.forEach.call(arguments, function (argument) {
                console.log(argument);
                result *= argument;
            });
            return result;
        }

        function volumenX(x) {
            return function (y, z) {
                return volume(x, y, z);
            }
        }

        function volumenXY(x, y) {
            return function (z) {
                return volume(x, y, z);
            }
        }

        function volumenY(y) {
            return function (x, z) {
                return volume(x, y, z);
            }
        }

        function volumenZ(z) {
            return function (x, y) {
                return volume(x, y, z);
            }
        }

        function volumePlaceholder(x, y, z) {
            var placeholer = [x, y, z];

            return function (inner_x, inner_y) {
                var numbers = [];
                var inner_p;
                if (typeof inner_y !== 'number')
                    inner_p = inner_x;
                else
                    inner_p = inner_y;

                if (typeof placeholer[0] !== 'number')
                    numbers.push(inner_x);
                else
                    numbers.push(placeholer[0]);
                if (typeof placeholer[1] !== 'number')
                    numbers.push(inner_p)
                else
                    numbers.push(placeholer[1]);
                if (typeof placeholer[2] !== 'number')
                    numbers.push(inner_p)
                else
                    numbers.push(placeholer[2]);
                return volume(numbers[0], numbers[1], numbers[2]);
            }
        }

        /*
         var volumeX2 = volumenX(2);
         console.log(volumeX2(2, 2));

         var volumeXZ2 = volumePlaceholder(2, '', 2);
         var volumeZ3 = volumePlaceholder('', '', 3);
         var volumeXY1 = volumePlaceholder(1, 1, '');

         console.log(volumeXZ2(2));
         console.log(volumeZ3(2, 1));
         console.log(volumeXY1(2));*/


        function volumenFabric() {
            var test = typeof arguments;
            var array = [2, 4];
            var arrGebunden = array.slice(0);
            var parameterGebunden = Array.prototype.slice.apply(arguments, [0]);
            var i = this;
            console.log(parameterGebunden);
            return function () {
                var parameterUngebunden = Array.prototype.slice.call(arguments, 0); //arguments wird als this an Array übergeben
                var alleParameter = parameterGebunden.concat(parameterUngebunden);
                var my = this;


                return volume.apply(this, alleParameter); //this ist obj das Volumen aufruft
            }
        }

        var volumenX2Y4 = volumenFabric(2, 4);
        /*   console.log(volumenX2Y4(5));
         console.log(volumenX2Y4(1));*/


        function partial(funktion) {
            var parameterGebunden = Array.prototype.slice.call(arguments, 1);
            return function () {
                var parameterUngebunden = Array.prototype.slice.call(arguments, 0);
                return funktion.apply(this, parameterGebunden.concat(parameterUngebunden));
            }
        }

        function shortPartial(funktion, ...parameterGebunden) {
            return function (...parameterUngebunden) {
                return funktion(...parameterGebunden, ...parameterUngebunden);
            }
        }

        volume(2, 3, 4);
        var volumenX5 = partial(volume, 5);
        console.log(volumenX5(2, 4));
        var erstellePerson = function (v, n) {

            return [{name: v}, {vorname: n}];
        }

        var erstelleMustermann = partial(erstellePerson, 'Mustermann');
        var max = erstelleMustermann('Max');
        console.log(max);
        var Moritz = erstelleMustermann('Moritz');
        console.log(Moritz);
        var erstelleMustermann = shortPartial(erstellePerson, 'Mustermann');
        var max = erstelleMustermann('Mellanie');
        console.log(max);
        var Moritz = erstelleMustermann('Michael');
        console.log(Moritz);

        var _ = {}; //platzhalter

        function partialMitPlatzhalter(funktion) {
            var parameterGebunden = Array.prototype.slice.call(arguments, 1);
            return function () {
                var i, parameter = [], parameterUngebunden = Array.prototype.slice.call(arguments, 0);
                for (i = 0; i < parameterGebunden.length; i++) {
                    if (parameterGebunden[i] !== _) {
                        parameter[i] = parameterGebunden[i];
                    } else {
                        parameter[i] = parameterUngebunden.shift();
                    }
                }
                return funktion.apply(this, parameter.concat(parameterUngebunden));

            }
        }

        var x5 = partialMitPlatzhalter(volume, 5, _, 2);
        console.log(x5(2, 2));
        var x5 = partialMitPlatzhalter(volumeB, 5, _, 1);
        console.log(x5(2, 2, 3, 4));

    }

    function myCurry() {

        function volume() {
            var result = 1;
            Array.prototype.forEach.call(arguments, function (argument) {
                console.log(argument);
                result *= argument;
            });
            return result;
        }

        function volumen(x, y, z) {
            return x * y * z;
        }

        var counter = 0;
        var counter2 = 0;

        function curry(ersterParameter) {
            var n, funktion, parameterGebunden = Array.prototype.slice.call(arguments, 1);
            counter++;

            if (typeof ersterParameter === 'function') {
                funktion = ersterParameter;
                n = ersterParameter.length;
            } else {
                funktion = parameterGebunden.shift();
                n = ersterParameter;
            }
            console.log("counter:" + counter);
            return function () {
                var parameterUngebunden = Array.prototype.slice.call(arguments);
                var parameter = parameterGebunden.concat(parameterUngebunden);
                counter2++;
                console.log("inner counter: " + counter2);

                return parameter.length < n
                    ? curry.apply(this, [n, funktion].concat(parameter))
                    : funktion.apply(this, parameter);


            }
        }

        console.log(['m', 'z'].concat('b'));
        var volumenCurried = curry(volumen);
        console.log(volumenCurried(5)(5)(5)); // 125
        var volumenX5 = volumenCurried(5);
        console.log(volumenX5(2)(2)); // 20
        console.log(volumenX5(3)(3)); // 45
        console.log(volumenX5(4)(4)); // 80
        console.log(volumenX5(5)(5)); // 125
        console.log(volumenX5(2)(2)); // 125
    }

    //immediately invoked funcion expression
    function myIIFE() {
        (function () {
            console.log("Diese Funktion wird deklariert und direkt aufgerufen.");
            console.log("Diese Funktion ist ein Ausdruck. Keine Deklaration.");
            console.log("Ich werde nur ein mal aufgerufen. Mit mir kannst du Block Scopes emulieren.");
        })();

    }

    //Übergabe einer Funktion als Parameter
    function myCallBack() {
        function eineFct(callback) {
            if (typeof callback === "function")
                callback();
            else {
                //FehlerBehandlung
            }
        }


        function nocheineFct() {
            console.log("I call you back");
        }

        //eineFct(nocheineFct); hier wird die Funktion nicht übergeben sondern aufgerufen
        eineFct(nocheineFct);
        eineFct(function () {
            console.log("I am an anonyuous callback function");
        });
        function summePerCallback(x, y, callback) {
            var ergebnis = x + y;
            if (typeof callback === "function") {
                callback(ergebnis);
            }
        }

        summePerCallback(4, 9, function (ergebnis) {
            console.log("Das Ergebnis lautet: " + ergebnis);
        });
        /* document.getElementById("knopf").addEventListener("click",function (e) {
         output("clicked");
         });*/

        //asynchrone Funktionen können weder Fehler werfen noch Rückgabewerte liefern
        function asynchronuousFct(success, error) {

            setTimeout(function () {
                var ergebnis = 4711;
                if (ergebnis < 0) {
                    error(new Error("Ergebnis kleiner 0"));
                } else {
                    success(ergebnis);
                }

            }, Math.random() * 2000);

        }

        //Pyramid of Doom Problematik: Async in Async Funktion
        asynchronuousFct(function (ergebnis) {
            console.log(ergebnis);
        }, function (fehler) {
            console.log(fehler);
        });

    };
    function mySelfDefining() {
        function erstEinsDannZwei() {
            console.log(1);
            erstEinsDannZwei = function () {
                console.log(2);
                erstEinsDannZwei = function () {
                    console.log(3);
                }
            }
        }

        var funktionsReferenz=erstEinsDannZwei;
        erstEinsDannZwei();
        erstEinsDannZwei();
        erstEinsDannZwei();
        funktionsReferenz();
        funktionsReferenz();
        funktionsReferenz();
        funktionsReferenz();

        //Emulation von Lazy Instantiation
        function init() {
            console.log("int()");
            return "Ergebnis";
        }
        function getErgebnis() {
            var ergebnis=init();
            getErgebnis=function(){
                return ergebnis;
            }
            return ergebnis;
        }
        console.log(getErgebnis());
        console.log(getErgebnis());
        console.log(getErgebnis());
        console.log(getErgebnis());
    };

})();