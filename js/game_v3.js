(function () {

    document.addEventListener('DOMContentLoaded', startGame, false);


    var myGameArea = {
        canvas: document.createElement("canvas"),
        height:500,width:1000,
        start: function () {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            // this.canvas.style.cursor = "none"; //hide the original cursor
            this.context = this.canvas.getContext("2d");
            this.canvas.classList.add('bg-blue-3', 'bg-shadow-3');
            this.canvas.setAttribute('draggable', 'true');
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 20);
            window.addEventListener('keydown', function (e) {
                myGamePiece.image.src = "img/druplicon-catwoman.png";
                myGameArea.keys = (myGameArea.keys || []);
                myGameArea.keys[e.keyCode] = (e.type == "keydown");

            });
            window.addEventListener('keyup', function (e) {
                // myGameArea.key = false;
                myGamePiece.image.src = "img/druplicon.png";
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
            // clearInterval(this.interval);
            resetMove();
        }
    };

    var myGamePiece;
    var myObstacles = [];
    var myBackground;

    function startGame() {
        myGamePiece = new component(30, 30, "img/druplicon.png", 10, 30, "image");
        myScore = new component("30px", "Consolas", "black", 280, 40, "text");
        myScore.points=0;
        myBackground = new component(myGameArea.width*2, myGameArea.height, "img/beach2.png", 0, 0, "background");
        // myObstacle = new component(10, 200, "green", 300, 10);
        myGameArea.start();
    }

    function component(width, height, color, x, y, type) {
        this.type = type;
        if (type == "image"|| type == "background") {
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
            } else if (type == "image"|| type == "background") {
                ctx.drawImage(this.image,
                    this.x,
                    this.y,
                    this.width, this.height);
                if (type == "background") {
                    ctx.drawImage(this.image,
                        this.x + this.width, this.y, this.width, this.height);
                }
            } else {
                ctx.fillStyle = color;
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
                myScore.points-=500;
                console.log('hit');
                return;
            }
        }
        myGameArea.clear();
        myGameArea.frameNo += 1;
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;
            minHeight = 20;
            maxHeight = 200;
            height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
            minGap = 50;
            maxGap = 200;
            gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
            myObstacles.push(new component(10, height, "green", x, 0));
            myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
        }

        myScore.points+=1;
        myScore.text = "SCORE: " +  myScore.points;
        myScore.update();

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
        myBackground.speedX=-1;
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

        /*  if (myGamePiece.crashWith(myObstacle)) {
         myGameArea.stop();
         } else {
         myGameArea.clear();
         myObstacle.x-=1;
         myObstacle.update();
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

         // if (myGameArea.x && myGameArea.y) {
         //     myGamePiece.x = myGameArea.x;
         //     myGamePiece.y = myGameArea.y;
         // }
         if (myGameArea.touchX && myGameArea.touchY) {
         myGamePiece.x = myGameArea.x;
         myGamePiece.y = myGameArea.y;
         }
         var x, y;
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
         y = myGameArea.canvas.height - 200
         myObstacles.push(new component(10, 200, "green", x, y));
         }
         for (i = 0; i < myObstacles.length; i += 1) {
         myObstacles[i].x += -1;
         myObstacles[i].update();
         }
         myGamePiece.newPos();
         myGamePiece.update();*/
        //}
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
    }

    function resetMove() {
        myGamePiece.x = 30;
        myGamePiece.y = 30;
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


    function moveListener(arr, directionClass) {

        for (var i = 0; i < arr.length; i++) {
            arr[i].addEventListener('click', function () {
                myGamePiece.speedX = 0;  //allow to just go one direction and do not take the previous one with you
                myGamePiece.speedY = 0;
                switch (directionClass) {
                    case 'moveUp':
                        moveUp();
                        console.log(23);
                        myGamePiece.newPos();
                        myGamePiece.update();
                        break;
                    case 'moveDown':
                        moveDown();
                        myGamePiece.newPos();
                        myGamePiece.update();
                        break;
                    case 'moveLeft':
                        moveLeft();
                        myGamePiece.newPos();
                        myGamePiece.update();
                        break;
                    case 'moveRight':
                        moveRight();
                        myGamePiece.newPos();
                        myGamePiece.update();
                        break;
                    case 'moveStop':
                        stopMove();
                        myGamePiece.newPos();
                        myGamePiece.update();
                        break;
                    case 'moveReset':
                        resetMove();
                        myGamePiece.newPos();
                        myGamePiece.update();
                        break;
                }

            });
        }
    }


})();



