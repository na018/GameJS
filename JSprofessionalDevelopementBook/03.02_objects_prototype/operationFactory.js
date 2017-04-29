(function () {
    //jedes Objekt basiert auf einem Prototyp bis auf Object oder wenn der Prototyp explizit auf null gesetzt wird
    //jedes Objekt kann selbst als Prototyp also als Vorlage für ein anderes Objekt dienen (Eigenschaften/ Methoden)
    //Prototyp ist in Eigenschaft _proto_ hinterlegt

    // objectLiteral();
    prototypConstructor();
    function objectLiteral(){
        var max={
            name:'Max',
            nachname: 'Mustermann'
        }
        console.log(max.__proto__);
        console.log(Object.getPrototypeOf(max)); //--> immer Basisobjekt Object {}, es lässt sich kein eigener Prototyp angeben

        var nadin=Object.create(max);
        nadin.name='Nadin';
        console.log(nadin.__proto__);
        console.log(Object.getPrototypeOf(nadin));
        console.log(nadin.name);
        console.log(nadin.nachname);
    };
    function prototypConstructor() {
        function Film(title,publishedYear){
            if(!(this instanceof Film))
                return new Film(title,publishedYear);

            this.title=title;
            this.publishedYear=publishedYear;
        }
        var spiderman=new Film('Spiderman',2002);
        var starwars=new Film('Star Wars',1977);
        var spiderman2=Object.create(spiderman);
        var spiderman3=Object.create(spiderman2);
        console.log(spiderman3.publishedYear);
        console.log(spiderman.__proto__);           //beschreibt Prototyp als Objekt
        console.log(spiderman3.__proto__);
        console.log(starwars.__proto__);
        console.log(Object.getPrototypeOf(spiderman3));
        console.log(Object.getPrototypeOf(starwars));       //beschreibt Prototyp als Objektinstanz
        console.log(spiderman.constructor);
        console.log(starwars.constructor);
    }



})();