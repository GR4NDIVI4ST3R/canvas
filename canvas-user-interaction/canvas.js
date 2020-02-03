var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

//* Resize Canvas to Screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//* Developer's Choice Constants
var maxRadius = 50;
var colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9'
]

//* mouse Positioning
var mouse = {x: undefined, y: undefined}
var mouseLeave = false;

window.addEventListener('mousemove', function(e) {
    if (!mouseLeave) {
        mouse.x = e.x;
        mouse.y = e.y;
    }
})

//* Check If mouse Leaves/Enters Screen
canvas.addEventListener('mouseleave', e => {
    mouseLeave = true;
    console.log('mouseleave');
})

canvas.addEventListener('mouseenter', e => {
    mouseLeave = false;
    console.log('mouseenter');
})

//* Screen Resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gen();
})

//* Circle Object
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[ Math.floor( Math.random() * colorArray.length ) ];

    // Draw a circle with canvas
    this.draw = function() {
        c.strokeStyle = 'rgba(0, 0, 0, 0)';
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.stroke();
        c.fillStyle = this.color;
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

        if (!mouseLeave) {
            
            // Grow circle if near mouse
            if ( (this.radius < maxRadius) && (mouse.x - this.x < 60 && mouse.x - this.x > -60) && (mouse.y - this.y < 60 && mouse.y - this.y > -50) ) {
                
                this.radius += 2;
    
            } else if (this.radius > this.minRadius) {
    
                this.radius += -1;
            }

        }

        this.draw();
    }
}

//* Generate Circles
var circleArray = [];

function gen() {

    // Clear All Circles
    circleArray = [];

    // Fill circleArray with a ton of new circle objects
    for (var i = 0; i < 500; i++) {
        var radius = (Math.random() * 9) + 3;
        var x = Math.random() * (canvas.width - 2*radius) + radius;
        var y = Math.random() * (canvas.height- 2*radius) + radius;
        var dx = 3 * (Math.random() - 0.5);
        var dy = 3 * (Math.random() - 0.5);
        
        circleArray.push( new Circle(x, y, dx, dy, radius) );
    }

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

gen();
animate();
