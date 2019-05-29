const TOP_ALLIGN = 100, HEIGHT = 300, WIDTH = 400, OFFSET=30, MOFFSET = 3;
let lambda = 500, ds=2, l = 1000, x = 3, n = 1;
let canvas, ctx;
let scr_l, scr_x, s1, s2;
let k;

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
    ctx.fillStyle = "#E4E4E4";
    ctx.fillRect(0, 0, 410, 350);
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

    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#000000";
    ctx.fill();
}
function drawHorizontalDoubleArrow(fromx, fromy, tox, toy){
    drawArrow(fromx, fromy, tox, toy);
    drawArrow(fromx + 1, fromy, fromx, toy);
}
function drawVerticalDoubleArrow(fromx, fromy, tox, toy){
    drawArrow(fromx, fromy, tox, toy);
    drawArrow(fromx, fromy - 1, fromx, fromy);
}

function drawFilter(){
    drawLine(OFFSET, MOFFSET, OFFSET, s1 - 4);
    drawLine(OFFSET, s1 + 4, OFFSET, s2 - 4);
    drawLine(OFFSET, s2 + 4, OFFSET, HEIGHT - MOFFSET);
}

function drawScreen(){
    drawLine(WIDTH - OFFSET, MOFFSET, WIDTH - OFFSET, HEIGHT - MOFFSET);
}

function drawSpecial(){
    for (let i = 25; i < 300; i+=50){
        drawArrow(MOFFSET, i, OFFSET - MOFFSET, i);
    }
    drawHorizontalDoubleArrow(OFFSET, HEIGHT - MOFFSET, WIDTH-OFFSET, HEIGHT - MOFFSET);
    drawDashedLine(MOFFSET, HEIGHT/2, WIDTH - MOFFSET, HEIGHT/2, [10,10]);

    let xtop = HEIGHT/2 - scr_x, xbot = HEIGHT/2 + scr_x;
    drawDashedLine(OFFSET, s1, WIDTH - OFFSET, xtop, [5,5]);
    drawDashedLine(OFFSET, s2, WIDTH - OFFSET, xtop, [5,5]);

    drawDashedLine(OFFSET, s2, WIDTH - OFFSET, xbot, [5,5]);
    drawDashedLine(OFFSET, s1, WIDTH - OFFSET, xbot, [5,5]);

    drawVerticalDoubleArrow(OFFSET + 2* MOFFSET, s2 - MOFFSET, OFFSET + 2*MOFFSET, s1 + MOFFSET);
    drawVerticalDoubleArrow(WIDTH - OFFSET + 2*MOFFSET, HEIGHT/2  , WIDTH - OFFSET + 2*MOFFSET, xtop);
    
    ctx.font = "16px Times New Roman";
    ctx.fillStyle = "red";
    ctx.fillText('h', OFFSET + 4*MOFFSET, HEIGHT/2 - 2*MOFFSET); 
    ctx.fillText('x', WIDTH - OFFSET + 2.4*MOFFSET, HEIGHT/2 - scr_x/2); 
    ctx.fillText('l', WIDTH/2, HEIGHT-2*MOFFSET); 
    ctx.fillText('S1', 2*MOFFSET, s1    );
    ctx.fillText('S2', 2*MOFFSET, s2);

    ctx.fillStyle = "black";
    ctx.fillText('n = ', OFFSET, HEIGHT + OFFSET);
    ctx.fillText(n, 2*OFFSET - 2*MOFFSET, HEIGHT + OFFSET);

    ctx.fillText('λ = ', 3*OFFSET, HEIGHT + OFFSET);
    ctx.fillText(lambda, 4*OFFSET - MOFFSET, HEIGHT + OFFSET);
    ctx.fillText('нм', 5*OFFSET - MOFFSET, HEIGHT + OFFSET);
}

function updateValues(){
    lambda = parseFloat(document.getElementById("lambda").value);
    ds = parseFloat(document.getElementById("hole_height").value);
    n = parseFloat(document.getElementById("n").value);
    x = parseFloat(document.getElementById("screen_height").value);
    l = parseFloat(document.getElementById("screen_width").value);
    calculateValues();
}

function calculateValues(){
    if (x > (ds/2))
        k = (HEIGHT/2 - OFFSET) / x;
    else
        k = (HEIGHT/2 - OFFSET) / (ds/2)

    s1 = (HEIGHT / 2) - (ds / 2) * k;
    s2 = (HEIGHT / 2) + (ds / 2) * k;
    scr_x = x * k;
    

    redrawCanvas();
    
    ctx.fillStyle = "blue";
    ctx.fillRect(WIDTH-5*MOFFSET, HEIGHT/2-scr_x, 14, 2*scr_x);
    
    let dx = lambda * l / ds / 1000000 * k, start = WIDTH-5*MOFFSET+2, w = 10;
    ctx.fillStyle = "white";
    ctx.fillRect(start, HEIGHT/2 - dx/2, w, dx);
    for(let i = dx/2, white = true; i < scr_x; i+=dx){
        if (white == true)
            ctx.fillStyle = "black";
        else   
            ctx.fillStyle = "white";

        white = !white;

        ctx.fillRect(start, HEIGHT/2 - i - dx, w, dx);
        ctx.fillRect(start, HEIGHT/2 + i, w, dx);

    }


}