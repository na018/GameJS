(function () {
    // protoypicalInheritance();
    // pseudoclassicalInheritance();
    // copyingInheritance();
    // encapsulationPrivilegedPublic();
    // encapsulationPrivilegedNonPublic();
    // encapsulationPrivilegedNonPublic_Closure_IIFE();
    // emulateInterfaces();
    // emulateNamespace();
    // emulateModule();
    // revealingModuleDesignPattern();
    // importModule();
    moduleAugmentation();

    function protoypicalInheritance() {
        var Tier = {
            fressen: function () {
                console.log('fressen');
            }
        }
        var Hund = Object.create(Tier);
        Hund.bellen = function () {
            console.log(this.name + ': Wau');
        }
        var bello = Object.create(Hund);
        bello.name = 'Bello';
        var struppi = Object.create(Hund);
        struppi.name = 'Struppi';

        struppi.bellen = function () {
            Hund.bellen.call(this);
            Hund.bellen.call(this);
        };
        struppi.bellen();
    }

    //Konstruktormethode: Objektmehtoden innerhalb konctructor auf this definieren = Instanzmehtode --> jede Objektinstanz enthält Kopie der Methode => belegt Speicherplatz => Performance
    //besser: Methode auf Prototyp

    function pseudoclassicalInheritance() {
        function Tier(name) {
            this.myname = name;
            this.sayMessage = 'Hello from ' + this.name;
            this.printName = function () {
                console.log(this.myname + ' is my name');
            };
        };
        Tier.prototype.fressen = function () {
            console.log('fressen');
        };
        Tier.prototype.schlafen = function () {
            console.log('sleeping');
        }

        function Hund(name, hunderasse) {
            Tier.call(this, name);  //der Name des Parameters wird auf den Namen des Tieres gesetzt
            this.hunderasse = hunderasse;
        };
        function Katze(name, rasse) {

        }

        Hund.prototype = new Tier(); //Hund wird auf ein neues Ojekt gesetzt, dass als Typ das Objekt Tier,Prototype referenziert
        Hund.prototype.constructor = Hund; //Verlinken von Prototyp zu Konstruktorfunktion
        Hund.prototype.bellen = function () {
            console.log(this.myname + ': Wau');
        }
        var bello = new Hund('Bello', 'Malteser');
        var struppi = new Hund('Struppi', 'Havaneser');

        Hund.prototype.tellMessage = function () { //geht nur mit prototype
            this.printName();       //funktioniert
            //this.prototype.printName(); Error can not ead property printName of undefined
            Hund.prototype.printName();  //Name undefined
            if (this instanceof Hund)
                console.log('I am a dog');
            console.log(this.__proto__);

            Hund.prototype.printName.call(this); //undefined is my name
        }

        struppi.bellen = function () { //geht nur ohne prototype, da Objekt
            Hund.prototype.bellen.call(this);// Konstruktor der Superklasse über call aufrufen & this übergeben (als Ausführungskontext) Aufruf der Konstruktor
            Hund.prototype.bellen.call(this);
        }
        bello.bellen();
        struppi.bellen();
        struppi.printName();
        struppi.sayMessage;
        struppi.tellMessage();
        var animal = new Tier('name');
        animal.schlafen();
        console.log(struppi.__proto__);     //Hund
        console.log(Tier.__proto__);            //function
        console.log(Hund.__proto__);        //function
        console.log(animal.__proto__);      //Tier
    }

    function copyingInheritance() {
        function extend(ziel, quelle) {
            ziel = ziel || {};
            for (var eigenschaft in quelle) {
                if (quelle.hasOwnProperty(eigenschaft) != ziel.hasOwnProperty(eigenschaft)) {
                    ziel[eigenschaft] = quelle[eigenschaft];
                }
                else
                    console.log('Das Ziel hat auch die Eigenschaft ' + eigenschaft)
            }
            return ziel;
        }

        var person = {
            name: 'Max',
            getName: function () {
                return this.name;
            },
            jump: 'jump'
        };
        var hund = {

            bellen: function () {
                console.log('Wau wau');
            },
            singen: 'sdf',
            name: 'Bello',
            blub: 3
        }

        function personF(name) {
            this.name = name;
            var getName = function () {
                return this.name;
            }
        }

        function hundf() {
            //personF.getName.call(this);
        }

        var myDog = hundf();
        //hundf.name='myName';
        // console.log(hundf.getName());

        extend(hund, person);
        var hundReferenz = hund;
        var hundCopie = Object.create(hund);
        var hundCop2;
        hundCop2 = extend(hundCop2, hund);
        console.log(hund.getName());
        console.log(person.getName());
        person.getName = function () {
            console.log('Person.getName() überschrieben');
            return this.name;
        }

        hundReferenz.name = 'Bello Referenz';
        hundCopie.name = 'Bello Referenz2';
        hundCop2.name = 'HundCop2';
        console.log(person.getName());
        console.log(hund.getName());
        console.log(hund.jump);
        console.log(hundCop2.name);
        console.log(hundCop2.jump);
    }

    function encapsulationPrivilegedPublic() {

        //public
        function publicStudent(name, surname, matrikel) {
            if (!(this instanceof publicStudent))return new publicStudent();
            this.surname = surname;
            this.name = name;
            this.matrikel = matrikel;
        }

        var nadin = new publicStudent('Apel', 'Nadin-Katrin', 28257);
        console.log(nadin.surname + " " + nadin.name + " : " + nadin.matrikel);

        function privateStudent(name, surname, matrikel) {
            var name = name, surname = surname, matrikel = matrikel;
            //privileged public
            //esistieren pro Objektinstanz-->Speicher/Performance
            //besser Methoden am Prototyp definieren --> Objektinstanzen teilen sich  Methoden = nonprivileged public Methods
            this.getName = function () {
                return name;
            };
            this.getSurname = function () {
                return surname;
            };
            this.getMatrikel = function () {
                return matrikel;
            };

        }

        var privateNadin = new privateStudent('Apel', 'Nadin-Katrin', 28257);
        if (privateNadin.surname || privateNadin.name || privateNadin.matrikel)
            console.log(privateNadin.surname + " " + privateNadin.name + " : " + privateNadin.matrikel);
        else
            console.log('My variables are private');
        console.log(privateNadin.getSurname() + " " + privateNadin.getName() + " : " + privateNadin.getMatrikel());

    };
    function encapsulationPrivilegedNonPublic() {
        function Worker(name, surname, workerID) {
            this._name = name;
            this._surname = surname;
            this._workerID = workerID;
        }

        Worker.prototype.getName = function () {
            return this._name;
        }
        Worker.prototype.getSurname = function () {
            return this._surname;
        }
        var nadin = new Worker('Apel', 'Nadin-Katrin', 28257);
        nadin._surname = nadin._surname + ' changed.';
        console.log(nadin.getSurname());
    };
    function encapsulationPrivilegedNonPublic_Closure_IIFE() {
        var Worker = (function () {
            var _name;
            var _surname;
            var _workerID;

            function Worker(name, surname, workerID) {
                _name = name;
                _surname = surname;
                _workerID = workerID;
            }

            Worker.prototype.getName = function () {
                return _name;
            }
            Worker.prototype.getSurname = function () {
                return _surname;
            }
            return Worker;
        })();
        var nadin = new Worker('Apel', 'Nadin-Katrin', 28257);
        nadin._surname = 'Changed surname';
        console.log(nadin.getSurname());
    }

    //statische Methoden --> Zugriff über Konstuktorfunktion obj.staticVal
    //Methoden, die auf dem Prototyp definiert sind können nur über Objektinstanzen (new) AUFGERUFEN WERDEN

    function emulateInterfaces() {
        //Interface: Vertrag
        //Attribute Checking --> nicht sicher ob Objekt Methoden hat, die vom Interface gefordert --> vom Typ kann nicht auf die Methoden geschlossen werden
        //Duck Typing --> von den Methoden auf Objekt schließen
        var Box = new Interface('Box', ['length', 'depth', 'height']);

        function calcVolume(box) {
            var volume = 0;
            if (Interface.ensureImplements(carton, Box)) {
                volume = box.getLength() * box.getDepth() * box.getHeight();
            }
        }
    }

    function emulateNamespace() {
        //Validator || {} verhindert, dass ein evtl. existierendes Validator Objekt überschrieben wird.
        var Validator = Validator || {
                format: 'HTML5',
                validiere: function () {
                    console.log('Validierung von ' + this.format);
                }
            };
        Validator.validiere();
        /* var de = de || {};
         de.phillpackermann = de.philipackermann || {};
         de.phillpackermann.javascript = de.philipackermann.javascript || {};*/

        var de = de || {
                philipackermann: {
                    javascript: {},
                }
            };

    }

    function emulateModule() {
        var ValidatorModul = ValidatorModul || (function () {
                var format = 'HTML5';//private variable
                return {
                    //public API
                    validiere: function () {
                        console.log('Validierung gestartet: ' + format);
                    }
                }
            })();
        ValidatorModul.validiere();
        ValidatorModul.format = 'SGML'; //funktioniert nicht, da private Variable, trotzdem kein Fehler
        ValidatorModul.validiere();
    }

    function revealingModuleDesignPattern() {
        var ValidatorModul = ValidatorModul || (function () {
                var format = 'HTML5';//private variable
//private Methode
                function validiere() {
                    console.log('Validierung 1gestartet: ' + format);
                    validierungBeendet();
                }

                function validierungBeendet() {
                    console.log('Validierung1 beendet: ' + format);
                }

                return {
                    //public API
                    validiere1: function () {
                        validiere();
                    },
                    sayHello: function () {
                        console.log('hello ' + format);
                    },
                    validiere2: (function () {
                        validiere()
                    })(),
                    validiere3: validiere(),
                    validiere: validiere
                }

            })();
        var test = ValidatorModul; //ruft validiere2 & validiere3 auf --> die anderen beiden müssen mit Punkt aufgerufen werden
        test.sayHello();
        test.sayHello();
        test.validiere();

    }

    function importModule() {
        var PersistenceModule = PersistenceModule || (function () {
                function saveResults(results) {
                    console.log('Results saved: ' + results);
                }

                return {saveResults: saveResults}
            })();
        var ValidatorModule = ValidatorModule || (function (persistenceModule) {
                var format = 'HTML5';
                var results = [];

                function validate() {
                    console.log('Started validating ' + format);
                    results.push('Test passed '+results.length);
                    persistenceModule.saveResults(results);
                }
                //Referenz
                function getResults() {
                    return results;
                }

                return {validate: validate, getResults: getResults}
            })(PersistenceModule);

        ValidatorModule.validate();
        var results=ValidatorModule.getResults();console.log(results+'\n\n');
        ValidatorModule.validate();
        ValidatorModule.validate();
        var results2=ValidatorModule.getResults(); console.log(results2);
    }
    function moduleAugmentation(){
        //Definition eines Moduls auf mehrere Dateien verteilen
        var ValidatorModule =(function (module) {
                var format = 'HTML5';
                module.results = [];

                module.validate=function() {
                    console.log('Started validating ' + format);
                    module.results.push('Test passed '+module.results.length);

                }
                //Referenz
                module.getResults=function() {
                    return module.results;
                }

                return module;
            })(ValidatorModule||{});
        ValidatorModule.validate();
       console.log( ValidatorModule.getResults());

       //Loose Augmentation = erstellt übergebene Modul evtl.neu --> async skripte laden
        // tight Augmentation = Modul muss existieren --> Reihenfolge: Attributes & Methods existieren
    }


})();