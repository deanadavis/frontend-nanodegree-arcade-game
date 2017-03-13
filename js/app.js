// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random() * (1.0 - 0.1) + 0.1;
};

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;  //initial starting point
    this.y = 400;  //initial starting point
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if( this.x < 500 ) {
        this.x = this.x + this.speed * 600 * dt;
    } else {
        this.x = -2;
        this.speed = Math.random() * (1.0 - 0.1) + 0.1;
    }
};

Player.prototype.update = function(dt) {
    if(this.keyPress === 'left' && this.x > 0) {
        this.x = this.x - 100;
    } else if(this.keyPress === 'right' && this.x < 400) {
        this.x = this.x + 100;
    } else if(this.keyPress === 'up' && this.y > 0) {
        this.y = this.y - 82;
    } else if(this.keyPress === 'down' && this.y < 400) {
        this.y = this.y + 82;
    } else if(this.keyPress === 'space') {
        this.reset();
    } else {
    }
    this.keyPress = null;
};

Player.prototype.reset = function() {
    this.x = 200;  //reset to initial starting point
    this.y = 400;  //reset to initial starting point
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var collisionX = Math.abs(player.x - this.x);
    var collisionY = Math.abs(player.y - this.y);
    if( collisionX < 25 && collisionY < 25) {
        ctx.fillText("OUCH!", 505/2, 200);
        player.reset();
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(this.y < 70) {  //made it to the water - you win
        ctx.fillText("YOU WIN", 505/2, 200);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.handleInput = function(e) {
  this.keyPress = e;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


function addEnemies() {
  allEnemies.push(new Enemy(-2, 60));
  allEnemies.push(new Enemy(-2, 117));
  allEnemies.push(new Enemy(-2,173));
  allEnemies.push(new Enemy(-2,230));
};

if ( allEnemies.length === 0) {
    addEnemies();
}













/*    for (i=0; i<4; ++i) {
        if( allEnemies[i].x > 500 || null) {


        }
    }*/

/*(function addEnemies () {
  allEnemies.push(new Enemy(-2, 60));
  allEnemies.push(new Enemy(-2, 100));
  allEnemies.push(new Enemy(-2,150));
  allEnemies.push(new Enemy(-2,220));
})();*/
