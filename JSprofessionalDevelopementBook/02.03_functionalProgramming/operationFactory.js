const {expect}=require('chai'); //var expect=require('chai').expect;
(function () {


    //var ouptutContainer = document.getElementById("output");
    var line = 0;

    function output(snippet) {
        ouptutContainer.innerHTML += line++ + ": " + snippet + "</br>";
    }

    /*myFunctional_2();*/
    myFunctional_3();

    function myFunctional_1() {
        function addClickEventListenertoArray(elem, func) {
            Array.prototype.forEach.call(document.getElementsByClassName(elem), function (button) {
                button.addEventListener('click', function () {
                    func();
                    console.log('I am clicked' + new Date().getSeconds());
                    console.log(this.classList)
                });
            });
        }

        Array.prototype.forEach.call(document.getElementsByClassName('button'), function (button) {
            button.addEventListener('click', function () {
                console.log('I am clicked' + new Date().getSeconds());
            });
        });
        addClickEventListenertoArray('button', function () {
            console.log('inner function');
            console.log(this)
        });
        var interpreters = [{'name': 'Avril Lavigne'}, {'name': 'James Blunt'}];
        var interpretersArray = [['name', 'Avril Lavigne'], ['name', 'James Blunt']];
        var names = interpreters.map(function (interpret) {
            output(interpret.name);
            return interpret.name;
        });
        output(names);

        var albums = [
            {
                title: "Under My Skin",
                interpret: "Avril Lavigne",
                published: 2004
            }, {
                title: "Run",
                interpret: "AWOLNATION",
                published: 2016
            }, {
                title: "The Element Of Freedom",
                interpret: "Alicia Keys",
                published: 2009
            }
        ];
        var before2010 = albums.filter(function (album, index, albums) {
            if (album.published < 2010) output(album.title + " was published before 2010.");
            else output(album.title + " was published after 2010.");
            return album.published < 2010;
        });
        before2010.forEach(function (album, index) {
            output(album['title']);
        });
        Array.prototype.splice.call(interpreters[0], function (interpret) {
            interpret.splice(0, 0, {'albums': ['Under My Skin', 'The Best Damn Thing']});
        });
        interpreters[0][1] = {'albums': ['Under My Skin', 'The Best Damn Thing']};
        interpreters[1][1] = {'albums': ['Under My Skin', 'The Best Damn Thing']};

        interpretersArray[0].push(['albums', ['one', 'two']]);

        console.info(interpretersArray);
        console.info(interpreters);

        var albumsCounter = interpreters.reduce(function (result, interpret, index, interpreters) {
            return result + interpret.name.length;
        }, 0);
        console.log(albumsCounter);

        var albumsCounterArr = interpretersArray[0][1].length;
        console.log(albumsCounterArr);
    }

    function myFunctional_2() {

        var albums = [
            {
                title: "Under My Skin",
                interpret: "Avril Lavigne",
                published: 2004
            }, {
                title: "Run",
                interpret: "AWOLNATION",
                published: 2016
            }, {
                title: "The Element Of Freedom",
                interpret: "Alicia Keys",
                published: 2009
            }
        ];
        var interprets = [
            {
                name: "Avril Lavigne",
                albums: ['Under My Skin', 'The Best Damn Thing']
            }, {
                name: 'Alicia Keys',
                albums: ['Here', 'Girl On Fire']
            }, {
                name: "AWOLNATION",
                albums: ["Run", "Windows"]
            }
        ];

        function publishedAfter(year, interpret, album) {
            if (interpret.name == album.interpret && album.published > year) {
                console.log(album.published + " : " + interpret.albums + " : " + album.title);
                console.log(album['title'])
                console.log(album.published > 2008)
                return album.title;
            }
            return false;
        }

        function publishedAfter2008(interpret) {
            albums.forEach(function (album) {
                if (interpret.name == album.interpret && album.published > 2008) {
                    return album.title;
                }
            });
            return false;
        }

        interprets.forEach(function (interpret) {
            var test = publishedAfter2008(interpret);
            output(test);
        });


        albums.forEach(function (album) {
            var mydebug = "";
            interprets.forEach(function (interpret) {
                if (publishedAfter(2004, interpret, album))
                    mydebug += publishedAfter(2004, interpret, album) + " : ";
                console.debug(mydebug)
            });

        });


        var albumsCounter = interprets.reduce(function (result, interpret, index, interprets) {
            output(interpret.albums);
            return result + interpret.albums.length;
        }, 0);


        console.log(albumsCounter);
        output(albumsCounter);

        function isAfter2010(album) {
            var test = album.published > 200;
            console.log(test + ": " + album.title);
            return album.published > 215;
        }

        function hasAlbumAfter2010(interpret) {
            var test = interpret.albums.filter(isAfter2010).length > 0;
            console.log(test + " : hasAfter " + interpret.name);
            return interpret.albums.filter(isAfter2010).length > 0;
        }

        function getInterpretName(interpret) {
            console.log(interpret.name);
            return interpret.name;
        }


        interprets.forEach(function (interpret) {

            console.log(hasAlbumAfter2010(interpret))

        });
        var names = ["lisa", "ally", "jessy"];
        var upperNames = names.map(function (value) {
            return value.toUpperCase();
        });
        console.log(upperNames)

        var numbers = [-5, 3, -12, 234, 4];
        var noNeg = numbers.filter(function (value) {
            return value > 4;
        });
        console.log(noNeg)
        var summedNumbers = numbers.reduce(function (sum, value) {
            return sum + value;
        });
        console.log(summedNumbers);

        var myTransformation = numbers.map(function (value) {
            return value + 100;
        });
        console.log(myTransformation);
        myTransformation = myTransformation.filter(function (value) {
            return value > 4;
        });
        console.log(myTransformation);
        myTransformation = myTransformation.reduce(function (sum, value) {
            return sum + value;
        });
        console.log(myTransformation);

        var mySecTransform
            = numbers
            .filter(function (value) {
                return value > 0;
            })
            .map(function (value) {
                return value + 100;
            })
            .forEach(console.log)


        /*    albums.forEach(function(album){
         console.log(album.published);
         console.log(album.title);
         console.log(isAfter2010(album));
         });
         console.log(interprets.filter(function (interpret) {
         console.log(interpret.albums>2008);
         return interpret.albums>2008;
         }));
         interprets.forEach(function (interpret) {
         console.log(albums[0]);
         getInterpretName(interpret);
         });
         albums
         .filter(hasAlbumAfter2010)
         .map(getInterpretName)
         .forEach(console.log);*/

    }

    function myFunctional_3() {
        const users = [
            {name: 'Jessi', id: '12', gender: 'female', friends: [2, 99, 3]},
            {name: 'Nadine', id: '2', gender: 'female', friends: []},
            {name: 'Katja', id: '6', gender: 'female', friends: [1, 23, 3]},
            {name: 'Robert', id: '23', gender: 'male', friends: [99, 12, 2]},
            {name: 'Nico', id: '3', gender: 'male', friends: [23, 2]},
            {name: 'Peter', id: '1', gender: 'male', friends: [6]},
            {name: 'Janina', id: '99', gender: 'female', friends: [23, 12, 1]}
        ]


        const names=[];




   /*  const numbers=['23','1','2342','20','10'];  const actualnums=numbers.map(function(item,index,array){
    return parseInt(item);
    });   expect(numbers).to.include('20');
        expect(numbers).to.not.include(20);

        expect(actualnums).to.include(20);
        expect(actualnums).to.not.include('20');

        console.log(numbers);
        console.log(actualnums);*/







        console.log('SUCCESS YOU WIN!');
    }

})
();