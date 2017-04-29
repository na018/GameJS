(function () {

    document.addEventListener('DOMContentLoaded', startGame, false);

    var myGamePiece;
    var myObstacles = [];
    var myBackground;
    var cache;
    var myScore={
        getScore:null,
        createComponent:function () {
            if(this.getScore==null){
                console.log("created Score Object");
                this.getScore=new component("30px", "Consolas", "black", 280, 40, "text");
            }
        },
        init:function(){
            this.createComponent();
        },
        points: 0,
        increment:function (i) { this.points+=i; },
        update: function () {
            this.getScore.update();
        }
    };



    function startGame() {
        console.log("init");
        myScore.init();
        myGamePiece = new component(50, 50, "img/druplicon.png", 10, 30, "image");


        myBackground = new component(myGameArea.width * 2, myGameArea.height, document.getElementsByClassName("game-bg")[0].src, 0, 0, "background");
        // myObstacle = new component(10, 200, "green", 300, 10);
        myGameArea.start();
    }


    var myGameArea = {
        canvas: document.createElement("canvas"),
        height: 500, width: 1000,
        playerImageMove:"img/druplicon-catwoman.png",
        playerImage: "img/druplicon.png",
        me:this,
        start: function () {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            // this.canvas.style.cursor = "none"; //hide the original cursor
            this.context = this.canvas.getContext("2d");
            this.canvas.classList.add('bg-blue-3', 'bg-shadow-3');
            var controllCanvas = document.getElementsByClassName('controllCanvas');

            for (var i = 0; i < controllCanvas.length; i++) {
                controllCanvas[i].parentNode.insertBefore(this.canvas, controllCanvas[i]);
            }
            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 20);

            window.addEventListener('keydown', function (e) {
                myGamePiece.image.src = myGameArea.playerImageMove;
                myGameArea.keys = (myGameArea.keys || []);
                myGameArea.keys[e.keyCode] = (e.type == "keydown");
            });
            window.addEventListener('keyup', function (e) {
                // myGameArea.key = false;
                myGamePiece.image.src =myGameArea.playerImage;
                myGameArea.keys[e.keyCode] = (e.type == "keydown");
            });
            window.addEventListener('mousemove', function (e) {
                myGameArea.x = e.pageX;
                myGameArea.y = e.pageY;
            });
            window.addEventListener('touchmove', function (e) {
                myGameArea.x = e.touches[0].screenX;
                myGameArea.y = e.touches[0].screenY;
            });
        },
        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop: function () {
            if(myScore.points<500)
                    alert("GAME OVER\n\n What happend? Did you fall asleep? \n\nYou scored "+myScore.points +" Points");
            else if(myScore.points<1500) alert("GAME OVER\n\nThat's not so bad. My grandma reached the same result. \nYou scored "+myScore.points +" Points");
                else if(myScore.points<2000) alert("GAME OVER\n\nCongratulations you scored "+myScore.points +" Points");
                else  if(myScore.points<3000)alert("GAME OVER\nWow I'm pretty impressed!\nYou scored "+myScore.points +" Points");
                else alert("GAME OVER\nWow you reached Minis Score our prefessional 'zocker-'Woman "+myScore.points +" Points");
                    resetMove();
        }
    };

    function component(width, height, color, x, y, type) {
        this.type = type;
        if (type == "image" || type == "background") {
            this.image = new Image();
            this.image.src = color;
        }
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.update = function () {
            ctx = myGameArea.context;

            if (this.type == "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            } else if (type == "image" || type == "background") {
                ctx.drawImage(this.image,
                    this.x,
                    this.y,
                    this.width, this.height);
                if (type == "background") {
                    ctx.drawImage(this.image,
                        this.x + this.width, this.y, this.width, this.height);
                }
            } else {
              /*  var grd=ctx.createRadialGradient(1,1,2,5,5,5);
                grd.addColorStop(0,"red");
                grd.addColorStop(1,"white");

// Fill with gradient
                ctx.fillStyle = grd;*/
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);

                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        };
        this.newPos = function () {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.type == "background") {
                if (this.x == -(this.width)) {
                    this.x = 0;
                }
            }
        };
        this.crashWith = function (otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            if ((mybottom < othertop) ||
                (mytop > otherbottom) ||
                (myright < otherleft) ||
                (myleft > otherright)) {
                crash = false;
            }
            return crash;
        }

    }

    function updateGameArea() {

        var x, height, gap, minHeight, maxHeight, minGap, maxGap;
        for (i = 0; i < myObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myObstacles[i])) {
                myGameArea.stop();
                return;
            }
        }
        myGameArea.clear();
        myGameArea.frameNo += 1;
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;
            minHeight = 50;
            maxHeight = 200;
            height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
            minGap = 50;
            maxGap = 200;
            gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
            myObstacles.push(new component(10, height, "rgba(0,0,255,.4)", x, 0));
            myObstacles.push(new component(10, x - height - gap,  "rgba(0,0,255,.4)", x, height + gap)); //bottom
            if(myObstacles[0].x<0){
                myObstacles.shift();//Remove first top Obstacle
                myObstacles.shift();//Remove first bottom Obstacle
            }
        }


        myScore.increment(1);
        myScore.getScore.text = "SCORE: " + myScore.points;
        myScore.getScore.update();

        myGamePiece.speedX = 0;  //allow to just go one direction and do not take the previous one with you
        myGamePiece.speedY = 0;
        if (myGameArea.keys && myGameArea.keys[37]) {
            moveLeft();
        }
        if (myGameArea.keys && myGameArea.keys[39]) {
            moveRight();
        }
        if (myGameArea.keys && myGameArea.keys[38]) {
            moveUp();
        }
        if (myGameArea.keys && myGameArea.keys[40]) {
            moveDown();
        }
        if (myGameArea.keys && myGameArea.keys[32]) {
            stopMove();
        }
        if (myGameArea.keys && myGameArea.keys[27]) {
            resetMove();
        }
        if (myGameArea.mouseDown && myGamePiece.move==8) {
            moveUp();
        }
        if (myGameArea.mouseDown && myGamePiece.move==2) {
            moveDown();
        }
        if (myGameArea.mouseDown && myGamePiece.move==4) {
            moveLeft();
        }
        if (myGameArea.mouseDown && myGamePiece.move==6) {
            moveRight();
        }

        myBackground.speedX = -1;
        myBackground.newPos();
        myBackground.update();
        myGamePiece.newPos();
        myGamePiece.update();

        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].speedX = -1;
            myObstacles[i].newPos();
            myObstacles[i].update();
        }
        myScore.update();

    }

    function moveUp() {
        myGamePiece.speedY = -1;
    }

    function moveDown() {
        myGamePiece.speedY = 1;
    }

    function moveLeft() {
        myGamePiece.speedX = -1;
    }

    function moveRight() {
        myGamePiece.speedX = 1;
    }

    function stopMove() {
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].speedX = 0;
        }
        myBackground.speedX=0;
        myBackground.x=0;
        clearInterval(myGameArea.interval);
        for (var i = 0; i < document.getElementsByClassName('movePlay').length; i++) {
            document.getElementsByClassName('movePlay')[i].classList.remove('hidden');
            document.getElementsByClassName('moveStop')[i].classList.add('hidden');
        }

        console.log("stopMove");
    }

    function resetMove() {
        myGamePiece.x = 30;
        myGamePiece.y = 30;
        myGamePiece.speedX=0;
        myGamePiece.speedY=0;

        myGameArea.clear();
        myScore.points=0;

        myBackground.speedX=0;
        myBackground.x=0;
        clearInterval(myGameArea.interval);
        myObstacles = [];
        myBackground.update();
        for (var i = 0; i < document.getElementsByClassName('movePlay').length; i++) {
            document.getElementsByClassName('movePlay')[i].classList.remove('hidden');
            document.getElementsByClassName('moveStop')[i].classList.add('hidden');
        }
        console.log("resetMove");
        }
    function movePlay(){
        console.log("movePlay");
        myGameArea.interval=setInterval(updateGameArea,20);
        for (var i = 0; i < document.getElementsByClassName('movePlay').length; i++) {
            document.getElementsByClassName('movePlay')[i].classList.add('hidden');
            document.getElementsByClassName('moveStop')[i].classList.remove('hidden');
            document.getElementsByClassName('moveReset')[i].classList.remove('hidden');
        }

    }

    function everyinterval(n) {
        if ((myGameArea.frameNo / n) % 1 == 0) {
            return true;
        }
        return false;
    }

    moveListener(document.getElementsByClassName('moveUp'), 'moveUp');
    moveListener(document.getElementsByClassName('moveDown'), 'moveDown');
    moveListener(document.getElementsByClassName('moveLeft'), 'moveLeft');
    moveListener(document.getElementsByClassName('moveRight'), 'moveRight');
    moveListener(document.getElementsByClassName('moveStop'), 'moveStop');
    moveListener(document.getElementsByClassName('moveReset'), 'moveReset');
    moveListener(document.getElementsByClassName('movePlay'), 'movePlay');

    function counter(name) {
        var i=0;
        return function () {
            i++;
            console.log(name+' : '+i);
        }
    }
    function changeElement(me) {

        var z=0;


        return function () {
            z++;
            console.debug(z);
            console.log('cache: '+cache)
            var visibleText=  cache;
            var text=me.getAttribute("text")+"-text";
            console.log(text);
            var showTextContainer=document.getElementById(text);

            showTextContainer.classList.remove('hidden');
            showTextContainer.classList.add('visible');

            console.log(visibleText.classList);
            visibleText.classList.remove("visible");
            visibleText.classList.add("hidden");
            console.log(visibleText.classList);
            console.log('showTextContainer: '+showTextContainer);

            cache=showTextContainer;
            console.info(cache);
            myGameArea.playerImage=me.src;
            myGamePiece.image.src =myGameArea.playerImage;
            myGameArea.playerImageMove=me.nextSibling.nextSibling.src;
            myGamePiece.update();
            myScore.increment(-1);
            updateGameArea();

        }

    }
    var jessi=counter('jessi');

    var playerContainer = document.getElementsByClassName('playerContainer');
    cache=playerContainer[0].getElementsByClassName('text-container')[0].getElementsByClassName('visible')[0];  //initialized with first visible element
    (function () {
        for (var i = 0; i < playerContainer.length; i++) {
            var playerImg = playerContainer[i].getElementsByTagName('img');

            for (var j = 0; j < playerImg.length; j++) {
                playerImg[j].addEventListener('click', function () {
                    var me=this;


                    jessi();
                    var changeActivator=changeElement(me);
                    changeActivator();



                });
            }

        }
    })();



    function moveListener(arr, directionClass) {

        for (var i = 0; i < arr.length; i++) {
            arr[i].addEventListener('mousedown', function () {
                myGameArea.mouseDown=true;

                switch (directionClass) {
                    case 'moveUp':
                        myGamePiece.move=8;

                        break;
                    case 'moveDown':
                        myGamePiece.move=2;
                        break;
                    case 'moveLeft':
                        myGamePiece.move=4;
                        break;
                    case 'moveRight':
                        myGamePiece.move=6;
                        break;
                    case 'moveStop':
                        stopMove();
                       this.classList.add("hidden");
                        document.getElementsByClassName('movePlay')[0].classList.remove("hidden");
                        break;
                    case 'moveReset':
                        resetMove();
                        this.classList.add("hidden");
                        document.getElementsByClassName('movePlay')[0].classList.remove("hidden");
                        break;
                    case 'movePlay':
                        movePlay();

                }
                myGamePiece.newPos();
                myGamePiece.update();

            });
            arr[i].addEventListener('mouseUp', function () {
                myGameArea.mouseDown=false;
                myGamePiece.speedX = 0;  //allow to just go one direction and do not take the previous one with you
                myGamePiece.speedY = 0;
            });
        }
    }


})();



