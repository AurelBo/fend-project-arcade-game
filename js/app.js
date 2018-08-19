let score = 0;
// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    constructor(x, y, speed){
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = speed;
        
    }

    // Parameter: dt, a time delta between ticks
    update(dt){
        this.x += this.speed * dt;
        if (this.x >= 500) {
            this.x = -100;
        }

        if (player.x < this.x + this.width && 
            player.x + player.width > this.x && 
            player.y < this.y + this.height && 
            player.y + player.height > this.y) {
                player.resetPosition();
        }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    }

    // Draw the enemy on the screen, required method for game
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.sprite = 'images/char-boy.png';
    }

    update(dt){
        
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key){
            if (key === 'left') {
                this.x -= 100;
            } else if (key === 'right') {
                this.x += 100;
            } else if (key === 'up') {
                this.y -= 82;
            } else if (key === 'down') {
                this.y += 82;
            }
// Prevent player to go outside of the frame : 

            if(this.x < 0) {
                this.x += 100;
            } else if(this.x > 400){
                this.x -= 100;
            } else if(this.y < -100) {
                this.y += 82;
            } else if(this.y > 400) {
                this.y -= 82;
            } else if(this.y < 0){
                this.resetPositionWin();
            }

        }
    
    resetPositionWin(){
            this.x = 200;
            this.y = 375;
            score += 1;
            enemy1.speed += 10;
            enemy2.speed += 10;
            enemy3.speed += 10;
            enemy4.speed += 10;
            addEnemy();
        }

    resetPosition(){
        this.x = 200;
        this.y = 375;
    }
};

function addEnemy(){
    if(score === 10){
        allEnemies.push(enemy4);
    }
}

// ENEMIES POPING
// Self note: Enemies Y location = Top lane : 50, Middle lane : 130, Bottom lane : 220
const enemy1 = new Enemy(60, 50, Math.floor(Math.random() * 100) + 100);
const enemy2 = new Enemy(210, 130, Math.floor(Math.random() * 100) + 100);
const enemy3 = new Enemy(80, 220, Math.floor(Math.random() * 100) + 100);
const enemy4 = new Enemy(75, 50, Math.floor(Math.random() * 100) + 100)
const allEnemies = [enemy1, enemy2, enemy3];
// Self note: Player start location : 200, 375
const player = new Player(200,375);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
