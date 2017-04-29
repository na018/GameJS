(function () {

    document.addEventListener('DOMContentLoaded', startGame, false);



    var myGameArea = {
        canvas: document.createElement("canvas"),
        start: function () {
            this.canvas.width = 1000;
            this.canvas.height = 800;
            this.context = this.canvas.getContext("2d");
            this.canvas.classList.add('bg-blue-3', 'bg-shadow-3');
            this.canvas.setAttribute('draggable','true');
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
            window.addEventListener('keydown', function (e) {
                myGameArea.key = e.keyCode;

            });
            window.addEventListener('keyup', function (e) {
                myGameArea.key = false;
            });
        },
        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };
    var myGamePiece;
    var mygreeenGamePiece;
    var myblueGamePiece;

    function startGame() {
        myGameArea.start();
        myGamePiece = new component(30, 30, "red", 10, 120);
        mygreeenGamePiece = new component(30, 30, "green", 0, 20);
        myblueGamePiece = new component(50, 30, "white", 10, 500);
    }

    function component(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.speedX=0;
        this.speedY=0;
        this.x = x;
        this.y = y;
        this.update = function () {
            ctx = myGameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        this.newPos=function(){
            this.x+=this.speedX;
            this.y+=this.speedY;
        }

    }

    function updateGameArea() {
        // myGameArea.clear();
        myGamePiece.newPos();
        if (myGameArea.key && myGameArea.key == 37) {moveLeft(); }
        if (myGameArea.key && myGameArea.key == 39) {moveRight(); }
        if (myGameArea.key && myGameArea.key == 38) {moveUp(); }
        if (myGameArea.key && myGameArea.key == 40) {moveDown();}
        if (myGameArea.key && myGameArea.key == 32) {stopMove();}
        if (myGameArea.key && myGameArea.key == 27) {resetMove(); }
        myGamePiece.update();
    }

    function moveUp(){
        myGamePiece.speedY=-1;
        myGamePiece.speedX=0;
    }
    function moveDown(){
        myGamePiece.speedY=1;
        myGamePiece.speedX=0;
    }
    function moveLeft(){
        myGamePiece.speedX=-1;
        myGamePiece.speedY=0;
    }
    function moveRight(){
        myGamePiece.speedX=1;
        myGamePiece.speedY=0;
    }
    function stopMove() {
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
    }

    function resetMove(){
        myGamePiece.x=30;
        myGamePiece.y=30;
    }
    moveListener(document.getElementsByClassName('moveUp'),'moveUp');
    moveListener(document.getElementsByClassName('moveDown'),'moveDown');
    moveListener(document.getElementsByClassName('moveLeft'),'moveLeft');
    moveListener(document.getElementsByClassName('moveRight'),'moveRight');
    moveListener(document.getElementsByClassName('moveStop'),'moveStop');
    moveListener(document.getElementsByClassName('moveReset'),'moveReset');


    function moveListener(arr,directionClass){
        for(var i =0;i<arr.length;i++){
            arr[i].addEventListener('click',function(){
                switch(directionClass) {
                    case 'moveUp':
                        moveUp();
                        break;
                    case 'moveDown':
                        moveDown();
                        break;
                    case 'moveLeft':
                        moveLeft();
                        break;
                    case 'moveRight':
                        moveRight();
                        break;
                    case 'moveStop':
                        stopMove();
                        break;
                    case 'moveReset':
                        resetMove();
                        break;
                }
            });
        }
    }


})();



