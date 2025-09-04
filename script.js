// Get canvas and context
const mycanvas = document.getElementById('board');
const ctx = mycanvas.getContext('2d');

// Drawing state and brush settings
let drawing = false;
let brushColor = '#000000';
let lastX = 0;
let lastY = 0;

// Set canvas size
mycanvas.clientWidth = 800;
mycanvas.clientHeight = 500;
mycanvas.width = mycanvas.clientWidth;
mycanvas.height = mycanvas.clientHeight;

console.log(mycanvas.width, mycanvas.height);

// Change brush color when color picker changes
document.getElementById('colorPicker').addEventListener('change', function() {
    brushColor = this.value;
});

// Change brush size when range input changes
const brushSize = document.getElementById('brushSize').addEventListener('input', function() {
    ctx.lineWidth = this.value;
});

// Clear canvas when clear button is clicked
document.getElementById('clearBtn').addEventListener('click', function() {
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
});

// Download canvas as image when download button is clicked
document.getElementById('downloadBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'justDraw.png';
    link.href = mycanvas.toDataURL('image/png');
    link.click();
});

// Start drawing when mouse is pressed
function startPosition(e) {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    draw(e);
}

// Stop drawing when mouse is released or leaves canvas
function finishedPosition() {
    drawing = false;
    ctx.beginPath();
}

// Draw on canvas as mouse moves
function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

// Mouse event listeners for drawing
mycanvas.addEventListener('mousedown', startPosition);
mycanvas.addEventListener('mouseup', finishedPosition);
mycanvas.addEventListener('mouseout', finishedPosition);
mycanvas.addEventListener('mousemove', draw);