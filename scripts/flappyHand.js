/*
    Motivated to utilize revealing module pattern
*/

var controlModule = (function(){
    let _move;

    function _controlScheme(event){
        var code;
        if (event.key !== undefined) {
            code = event.key;
        } else if (event.keyIdentifier !== undefined) {
            code = event.keyIdentifier;
        } else if (event.keyCode !== undefined) {
            code = event.keyCode;
        }
        if(code==="ArrowUp"){
            _move();
        }
    }
    function _init(){
        document.addEventListener("keydown",function(event){_controlScheme(event)});
    }

    function init(move){
        _move=move;
        _init();
    }
    return{
        init: init
    };
}());

var animateModule = (function(){
    
    'use strict';

    var _fpsInterval;
    var _now;
    var _then;
    var _elapsed;
    var _draw;

    function animate(draw, fps = 60){
        _fpsInterval = 1000/fps;
        _then = Date.now();
        _draw = draw;
        _animate();
    }

    function _animate(){
        requestAnimationFrame(_animate);
        _now = Date.now();
        _elapsed = _now - _then;
        if(_elapsed>_fpsInterval){
            _then = _now - (_elapsed%_fpsInterval);
            _draw();
        }
    }

    return{
        animate: animate
    };
}());

var gameModule = (function(){

    'use strict';

    let _cvs;
    let _ctx;
    let _landscape;
    let _hand;
    let _pipe;
    let _score;
    let _gravity;
    let _constant;
    let _gap;
    let _load;
    let _toLoad;
    let _animate;
    
    function _move(){
        _hand.pos.y -= 30;
        if(_hand.handOr){
            _hand.hand=_hand.handUp;
        }
        else{
            _hand.hand=_hand.handDwn;
        }
        _hand.handOr=!_hand.handOr;
    }
    function _initEventListener(){
        document.addEventListener("keydown",_move);
    }
    function _initControl(){
        _initEventListener();
    }
    function _initLandscape(){
        let bg = new Image();
        var fg = new Image();
        return{
            bg: bg,
            fg: fg
        };
    }
    function _initHand(){
        let handUp = new Image();
        let handDwn = new Image();
        let pos = {};
        let handOrientation = true;
        return{
            handOr: handOrientation,
            hand: handUp,
            handUp: handUp,
            handDwn: handDwn,
            pos: pos
        };
    }
    function _initPipe(){
        let pipeNorth = new Image();
        let pipeSouth = new Image();
        let pos = [];
        return{
            pipeNorth: pipeNorth,
            pipeSouth: pipeSouth,
            pos: pos
        };
    }
    function _partialLoad(){
        _load++;
        if(_load===_toLoad){
            _constant = _pipe.pipeNorth.height+_gap;
            _animate();
        }
    }
    function _loadThenAnimate(){
        //should be a cleaner way to do this
        _landscape.bg.onload = function(){
            _partialLoad();
        };
        _landscape.fg.onload = function(){
            _partialLoad();
        };
        _hand.handUp.onload = function(){
            _partialLoad();
        };
        _hand.handDwn.onload = function(){
            _partialLoad();
        };
        _pipe.pipeNorth.onload = function(){
            _partialLoad();
        };
        _pipe.pipeSouth.onload = function(){
            _partialLoad();
        };
        _landscape.bg.src = "../images/cyberBg.png";
        _landscape.fg.src = "../images/fg.png";
        _hand.handUp.src = "../images/handUp.png";
        _hand.handDwn.src = "../images/handDown.png";
        _pipe.pipeNorth.src = "../images/pipeNorth.png";
        _pipe.pipeSouth.src = "../images/pipeSouth.png";
    }
    function _init(){
        _cvs = document.getElementById("flappyHandCanvas");
        _ctx = _cvs.getContext("2d");
        _gap = 85;
        _score = 0;
        _gravity = 1.2;
        //careful, images load asynchronously
        _landscape=_initLandscape();
        _hand=_initHand();
        _pipe=_initPipe();
        _load=0;
        _toLoad=6;
        _hand.pos.x = 10;
        _hand.pos.y = 150;
        _pipe.pos[0] = {
            x: _cvs.width,
            y: 0
        };
        _loadThenAnimate();
    }
    function _gameOver(){
        reset();
        //_start();
        //_animate();
    }
    function _draw(){
        _ctx.drawImage(_landscape.bg,0,0);
        _pipe.pos.forEach(function(pPos){
            _ctx.drawImage(_pipe.pipeNorth,pPos.x,pPos.y);
            _ctx.drawImage(_pipe.pipeSouth,pPos.x,pPos.y+_constant);
            pPos.x--;
            if(pPos.x===125){
                _pipe.pos.push({
                    x: _cvs.width,
                    y: Math.floor(Math.random()*_pipe.pipeNorth.height)-_pipe.pipeNorth.height
                });
            }
            //collision detection, looks jumbled
            if( _hand.pos.x+_hand.hand.width >= pPos.x && _hand.pos.x <= pPos.x+_pipe.pipeNorth.width &&
                ( _hand.pos.y <= pPos.y+_pipe.pipeNorth.height || _hand.pos.y+_hand.hand.height >= pPos.y+_constant ) ||
                _hand.pos.y+_hand.hand.height >= _cvs.height-_landscape.fg.height){
                    _gameOver();
                    //break;
            }
            if(pPos.x==5){
                _score++;
            }
        });
        _ctx.drawImage(_landscape.fg,0,_cvs.height-_landscape.fg.height);
        _ctx.drawImage(_hand.hand,_hand.pos.x,_hand.pos.y);
        _hand.pos.y+=_gravity;
        //not good practice to hardcode css in here
        _ctx.fillStyle = "#66FCF1";
        _ctx.font = "30px Arial";
        _ctx.fillText("Score :"+_score,10,_cvs.height-20);
    }

    function init(toAnimate=draw, initControl=_initControl){
        _animate=toAnimate;
        initControl();
        _init();
    }
    //this part seems dumb
    function draw(){
        _draw();
    }
    function move(){
        _move();
    }
    function reset(){
        _pipe.pos = [];
        _pipe.pos[0] = {
            x: _cvs.width,
            y: 0
        };
        _hand.pos.x = 10;
        _hand.pos.y = 150;
        _score = 0;
        _gravity = 1.2;
    }

    return{
        init: init,
        draw: draw,
        reset: reset,
        move: move
    };
}());

//wrap the draw into some animation rule, in this case
//we wrapped it in fps lock scheme
//wrap the move into a custom control scheme to initialize
//or initialize our own control
gameModule.init(function(){
    return animateModule.animate(gameModule.draw,60);
},
function(){
    return controlModule.init(gameModule.move);
});
