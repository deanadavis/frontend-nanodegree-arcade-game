// Enemies (bugs) our player must avoid
// There are 4 enemies racing across the screen at random speeds
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random() * (1.0 - 0.1) + 0.1;
};

// Our player (boy)
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;  //initial starting point
    this.y = 400;  //initial starting point
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// If there is a collision with an enemy the enemies will stop
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if( collisionFree ) {
        if( this.x < 500 ) {
            this.x = this.x + this.speed * 600 * dt;
        } else {
            this.x = -2;
            this.speed = Math.random() * (1.0 - 0.1) + 0.1;
        };
    };
};

// Update the player's position using key inputs.
// If the player is hit or makes it to the water freeze out user input
// other than the space bar which resets the game.
Player.prototype.update = function(dt) {
    if(collisionFree && !reachedWater) {
        if(this.keyPress === 'left' && this.x > 0) {
            this.x = this.x - 100;
        } else if(this.keyPress === 'right' && this.x < 400) {
            this.x = this.x + 100;
        } else if(this.keyPress === 'up' && this.y > 0) {
            this.y = this.y - 82;
        } else if(this.keyPress === 'down' && this.y < 400) {
            this.y = this.y + 82;
        };
    } else if(this.keyPress === 'space') {
        this.reset();
        collisionFree = true;
        reachedWater = false;
    } else {
    }
    this.keyPress = null;
};

// Bring the player back to the initial starting point
Player.prototype.reset = function() {
    this.x = 200;  //reset to initial starting point
    this.y = 400;  //reset to initial starting point
};

// Draw the enemy on the screen, required method for game.
// Add text if collision and freeze out user inputs other than space bar
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var collisionX = Math.abs(player.x - this.x);
    var collisionY = Math.abs(player.y - this.y);
    if( collisionX < 30 && collisionY < 30) {
        collisionFree = false;
        ctx.fillText("OUCH!", 505/2, 120);
        ctx.fillText("YOU LOSE", 505/2, 200);
    };
};

// Draw the player on the screen
// Bedazzle player for a win
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(this.y < 70 && collisionFree) {  //made it to the water - you win
        ctx.fillText("YOU WIN", 505/2, 200);
        reachedWater = true;
        ctx.drawImage(Resources.get('images/Star.png'), this.x - 100, this.y + 15, 91, 154);
        ctx.drawImage(Resources.get('images/Star.png'), this.x + 100, this.y + 15, 91, 154);
    }
};

// Monitor user inputs
Player.prototype.handleInput = function(e) {
  this.keyPress = e;
};

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

// Add in the enemies when needed
function addEnemies() {
  allEnemies.push(new Enemy(-2, 60));
  allEnemies.push(new Enemy(-2, 117));
  allEnemies.push(new Enemy(-2,173));
  allEnemies.push(new Enemy(-2,230));
};

if ( allEnemies.length === 0) {
    addEnemies();
};













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
