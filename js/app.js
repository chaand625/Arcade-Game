//  creating score and setTimeout time variable
var score = 0;
var called = 0;

// creating Enemy class
var Enemy = function (x, y, speed) {

    // x, y, speed and image(sprite) for the enemies 
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function (dt) {

    this.x = this.x + this.speed;
    if (this.x > 505) {
        this.x = 0;
    }
    this.checkCollisons();
};

// checking the collions of enemies with the player
Enemy.prototype.checkCollisons = function () {

    let delx = this.x - player.x;
    let dely = this.y - player.y;
    let distance = Math.sqrt(delx * delx + dely * dely);
    if (distance < 70) {
        player.x = 200;
        player.y = 410;
        score = 0;
        let sc = document.querySelector("#scoreValue");
        sc.innerHTML = score;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Creating the player 
var Player = function (x, y) {

    // x, y coordinates and the image for the player
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png";
}

// update function for the player
Player.prototype.update = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y == -10 && !called) {
        called = setTimeout(() => {
            this.x = 200;
            this.y = 410;
            score = score + 1;
            called = 0;
            let sc = document.querySelector("#scoreValue");
            sc.innerHTML = score;
        }, 1000);
    }
};

// reder function for the player
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handling input for the player
Player.prototype.handleInput = function (inp) {
    if (inp == 'left' && this.x > 10)
        this.x -= 100;
    else if (inp == 'right' && this.x < 400)
        this.x += 100;
    else if (inp == 'up' && this.y > 0)
        this.y -= 84;
    else if (inp == 'down' && this.y < 410)
        this.y += 84;
};


// instantiating Enemies by storing in an array
allEnemies = [new Enemy(0, 60, 10 * Math.random()),
    new Enemy(0, 144, 10 * Math.random()),
    new Enemy(0, 230, 10 * Math.random())
];

// instantiating the player
player = new Player(200, 410);



// keyListener for the handleinput function
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

