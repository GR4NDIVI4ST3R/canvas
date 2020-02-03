var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

//* Resize Canvas to Screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//* Circle Object
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    // Draw a circle with canvas
    this.draw = function() {
        c.strokeStyle = '#33FAE7';
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.stroke();
        c.fillStyle = 'rgba(0, 255, 0, 0.1)'
        c.fill();
    }

    // Update the position and size of the circle per frame
    this.update = function() {

        // Reverse direction of the circle if its pos is > canvas size
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        // Add the velocity of the circle (this happens per one frame)
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

//* Generate Circles
var circleArray = [];

for (var i = 0; i < 100; i++) {
    var radius = 50;
    var x = Math.random() * (canvas.width - 2*radius) + radius;
    var y = Math.random() * (canvas.height- 2*radius) + radius;
    var dx = 8 * (Math.random() - 0.5);
    var dy = 8 * (Math.random() - 0.5);
    
    circleArray.push( new Circle(x, y, dx, dy, radius) );
}

//* Update Circles For Animation
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Animate one frame of every circle in circleArray
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();