var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

// Resize Canvas to Screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Rectangles
c.fillStyle = 'rgba(255, 0, 0, 0.3)';
c.fillRect(40, 100, 50, 50);
c.fillStyle = 'rgba(0, 255, 0, 0.3)';
c.fillRect(100, 100, 50, 50);
c.fillStyle = 'rgba(0, 0, 255, 0.2)';
c.fillRect(160, 100, 50, 50);

// Lines
c.strokeStyle = '#33E7FA';
c.beginPath();
c.moveTo(275, 150); // Initial point
c.lineTo(400, 75); // Draw line from initial pos to this pos
c.lineTo(500, 200);
c.lineTo(500, 100);
c.stroke();

// Arc
c.strokeStyle = 'rgba(0, 255, 0, 0.8)';
c.beginPath();
c.arc(215, 240, 50, 0, Math.PI, false);
c.stroke();

// Circle
c.strokeStyle = 'rgba(200, 200, 200, 1)';
c.beginPath();
c.arc(90, 240, 50, 0, 2 * Math.PI, false);
c.stroke();

// Arc w/ Line
c.strokeStyle = 'rgba(0, 0, 255, 0.3)';
c.beginPath();
c.arc(335, 240, 50, Math.PI/4, 7*Math.PI/4, false);
c.lineTo(335, 240);
c.lineTo(285, 240);
c.stroke();