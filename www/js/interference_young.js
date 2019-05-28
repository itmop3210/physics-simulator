const TOP_ALLIGN = 100, WIDTH = 334;
let lambda, hole_height=0.5, screen_width = 4, source_width = 3;
let canvas, ctx;
let d, l, s1, s2, delta, x;
// TODO: is it necessary to support changable n?

window.onload = function() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext) 
        ctx = canvas.getContext('2d');

    updateCanvasSize();
    calculateValues();

}

function updateCanvasSize() {
    const canvas = document.getElementById('canvas');

    let size = Math.min(window.innerWidth, (window.innerHeight - TOP_ALLIGN) * 4 / 3  );
    canvas.style.width = size + 'px';
    canvas.style.height = size * 3 / 4  + 'px';
}

function redrawCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 300);
    drawSource();
    drawFilter();
    drawScreen();
    drawSpecial();
}

function drawLine(fromx, fromy, tox, toy){
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();
    ctx.closePath();
}
function drawDashedLine(fromx, fromy, tox, toy, pattern){
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.setLineDash(pattern);
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();
    ctx.closePath();
    ctx.setLineDash([1, 0]);

}
function drawArrow(fromx, fromy, tox, toy){
    var headlen = 6;
    var angle = Math.atan2(toy-fromy,tox-fromx);

    //starting path of the arrow from the start square to the end square and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.strokeStyle = "#black";
    ctx.lineWidth = 1;
    ctx.stroke();

    //starting a new path from the head of the arrow to one of the sides of the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //draws the paths created above
    ctx.strokeStyle = "#black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#black";
    ctx.fill();
}
function drawHorizontalDoubleArrow(fromx, fromy, tox, toy){
    drawArrow(fromx, fromy, tox, toy);
    drawArrow(fromx + 1, fromy, fromx, toy);
}

function drawSource(){
    drawLine(33, 100, 33, 145);
    drawLine(33, 155, 33, 200);

    drawArrow(0, 120, 32, 120);
    drawArrow(0, 150, 32, 150);
    drawArrow(0, 180, 32, 180);
}

function drawFilter(){
    drawLine(d + 33, 50, d + 33, s2 - 3);
    drawLine(d + 33, s2 + 3, d + 33, s1 - 3);
    drawLine(d + 33, s1 + 3, d + 33, 250);
}

function drawScreen(){
    drawLine(370, 30, 370, 270);
}

function drawSpecial(){
    drawHorizontalDoubleArrow(33, 270, d + 33, 270);
    drawHorizontalDoubleArrow(d + 33, 270, d + l + 33, 270);
    let tempx = x  * WIDTH / (source_width + screen_width);
    let xtop = 150 - tempx, xbot = 150 + tempx;
    drawDashedLine(33, 150, 370, xtop, [5, 5]);
    drawDashedLine(33, 150, 370, xbot, [5, 5]);
    // drawDashedLine(d + 33, 150, 370, 150, [5, 5]);
    drawDashedLine(d + 33, s1, 370, xtop, [5, 5]);
    drawDashedLine(d + 33, s2, 370, xbot, [5, 5]);

    drawArrow(d + 40, s2 + 4, d + 40, s1 - 4);
    drawArrow(d + 40, s2 + 4, d + 40, s2 + 3);

    ctx.font = "16px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText('d', d / 2 + 33, 285); 
    ctx.fillText('l', l / 2 + 33 + d, 285); 
    ctx.fillText('S', d + 45, 150+5); 
}

function updateValues(){
    lambda = parseInt(document.getElementById("lambda").value);
    hole_height = parseFloat(document.getElementById("hole_height").value);
    source_width = parseInt(document.getElementById("source_width").value);
    screen_width = parseInt(document.getElementById("screen_width").value);
    calculateValues();
}

function calculateValues(){
    delta = screen_width / hole_height * lambda;
    d = WIDTH * source_width / (source_width + screen_width);
    l = WIDTH * screen_width / (source_width + screen_width);
    s1 = 150 + (hole_height / 2) * WIDTH / (source_width + screen_width);
    s2 = 150 - (hole_height / 2) * WIDTH / (source_width + screen_width);
    x = (hole_height * (source_width + screen_width))/(2 * source_width);
    //TODO: cycle to draw interferation image
    // or setLineDash()
    redrawCanvas();
}