"use strict"


const c = document.getElementById("ball");
const ctx = c.getContext('2d');
let num_object = 0;
let object = [];
const restart = document.getElementById('btn-reset');


function collision(x1, y1, x2, y2) { /// Function check collision /// Проверка на столкновение
    let equalX,
        equalY;
    if (x1 > x2) {
        equalX = x1 - x2;
    } else if (x1 < x2) {
        equalX = x2 - x1;
    } else {
        equalX = 0;
    }
    if (y1 > y2) {
        equalY = y1 - y2;
    } else if (y1 < y2) {
        equalY = y2 - y1;
    } else {
        equalY = 0;
    }

    let equal = Math.sqrt(equalX * equalX + equalY * equalY);
    return equal;

}

// function random
function random(max, min, notUse) {

    let digit = Math.floor(Math.random() * (max - min) + min);
    if (digit === notUse) {
        return random(max, min, notUse);
    }
    return digit;
}


// Class Draw element
function Draw(x, y) { // create new object
    this.num = num_object++;
    this.x = x; ///event.layerX; // Inital coordinate for Spawn
    this.y = y; ///event.layerY;
    this.color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")"; // color ball
    this.Ox = random(2, -1, 0); // speed ball by Axis Ox
    this.Oy = random(2, -1, 0);
    this.r = 15; // radius ball
}

Draw.prototype.collisionWall = function () {
    if (this.y + this.r >= c.height) {
        this.Oy *= -1;
    }
    if (this.y + this.r <= this.r * 2) {
        this.Oy *= -1;
    }
    if ((this.x + this.r) >= c.width) {
        this.Ox *= -1;
    }
    if ((this.x + this.r) <= this.r * 2) {
        this.Ox *= -1;
    }
}
Draw.prototype.collision = function () {
    for (let i = this.num; i < object.length; i++) {
        if (object.length !== 1) {
            if (i !== this.num) {
                let equal = collision(this.x, this.y, object[i].x, object[i].y) // send coordinate for check collision
                if (equal < (this.r * 2)) { // столкновение


                    /////////// Oy collision
                    if (this.Oy > 0 && object[i].Oy < 0) {
                        this.Oy *= -1;
                        object[i].Oy *= -1;
                    } else if (this.Oy < 0 && object[i].Oy > 0) {
                        this.Oy *= -1;
                        object[i].Oy *= -1;
                    } else if (this.Oy > 0 && object[i].Oy > 0 && this.Oy > object[i].Oy) {
                        this.Oy *= -1;
                    } else if (this.Oy < 0 && object[i].Oy < 0 && this.Oy > object[i].Oy) {
                        this.Oy *= -1;
                    } else if (this.Oy < 0 && object[i].Oy < 0 && this.Oy < object[i].Oy) {
                        object[i].Oy *= -1;
                    } else if (this.Oy > 0 && object[i].Oy > 0 && this.Oy > object[i].Oy) {
                        object[i].Oy *= -1;
                    }


                    /////////// Ox collision
                    if (this.Ox > 0 && object[i].Ox < 0) {
                        this.Ox *= -1;
                        object[i].Ox *= -1;
                    } else if (this.Ox < 0 && object[i].Ox > 0) {
                        this.Ox *= -1;
                        object[i].Ox *= -1;
                    } else if (this.Ox > 0 && object[i].Ox > 0 && this.Ox > object[i].Ox) {
                        this.Ox *= -1;
                    } else if (this.Ox < 0 && object[i].Ox < 0 && this.Ox > object[i].Ox) {
                        this.Ox *= -1;
                    } else if (this.Ox < 0 && object[i].Ox < 0 && this.Ox < object[i].Ox) {
                        object[i].Ox *= -1;
                    } else if (this.Ox > 0 && object[i].Ox > 0 && this.Ox > object[i].Ox) {
                        object[i].Ox *= -1;
                    }

                    this.color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";

                }
            }
        }
    }
}

// move element
Draw.prototype.move = function () {

    ctx.fillStyle = this.color;
    this.collisionWall();
    ctx.beginPath();
    ctx.arc(this.x += this.Ox, this.y += this.Oy, this.r, 0, 2 * Math.PI);
    ctx.fill();

}

c.addEventListener("click", function (event) {
    if (object.length > 1) { /// If 
        for (let i = 0; i < object.length; i++) {
            if (collision(object[i].x, object[i].y, event.layerX, event.layerY) < object[i].r * 2) {
                return 0;
            }
        }
        object.push(new Draw(event.layerX, event.layerY));
    } else {
        object.push(new Draw(event.layerX, event.layerY));
    }

})

// update list 

function update() {
    ctx.fillStyle = "#eeeeee";
    ctx.fillRect(0, 0, c.width, c.height);

    for (let i = 0; i < object.length; i++) {
        object[i].collision();
    }
    for (let i = 0; i < object.length; i++) {
        object[i].move();
    }

}


setInterval(update, 1);



restart.addEventListener('click', restartGame);


function restartGame() {
    num_object = 0;
    object = [];
}

