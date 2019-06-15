const TOP_ALLIGN = 100, HEIGHT = 300, WIDTH = 400, OFFSET=30, MOFFSET = 3;
let lambda = 500, ds=2, l = 1000, x = 3, n = 1;
let canvas, ctx;
let scr_l, scr_x, s1, s2;
let k;
let primaryColor, bgColor="#E4E4E4";

window.onload = onLoad;

function onLoad() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext)
        ctx = canvas.getContext('2d');

    updateCanvasSize();
    calculateValues();

}

document.addEventListener("deviceready", onLoad, false);

window.onresize = function(e) {
    updateCanvasSize();
}

function updateCanvasSize() {
    const canvas = document.getElementById('canvas');

    let size = Math.min(window.innerWidth, (window.innerHeight - TOP_ALLIGN) * 4 / 3  );
    canvas.style.width = size + 'px';
    canvas.style.height = (size * 3 / 4)  + 'px';
}

function redrawCanvas(){
    ctx.fillStyle = bgColor;
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
function drawTriangle(x1,y1,x2,y2,x3,y3){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.fill();
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
    let xtop = HEIGHT/2 - scr_x, xbot = HEIGHT/2 + scr_x;
    for (let i = 25; i < 300; i+=50){
        drawArrow(MOFFSET, i, OFFSET - MOFFSET, i);
    }

    if (lambda < 380) primaryColor="Gray";
    if (lambda >=380 && lambda < 440) primaryColor="purple";
    if (lambda >=440 && lambda < 480) primaryColor="blue";
    if (lambda >=480 && lambda < 510) primaryColor="#00BFFF";
    if (lambda >=510 && lambda < 550) primaryColor="green"
    if (lambda >=550 && lambda < 575) primaryColor="YellowGreen"
    if (lambda >=575 && lambda < 585) primaryColor="yellow"
    if (lambda >=585 && lambda < 620) primaryColor="orange"
    if (lambda >=620 && lambda < 790) primaryColor="red"
    if (lambda >= 790) primaryColor="Gray";

    ctx.fillStyle = primaryColor;
    drawTriangle((WIDTH - 2 * OFFSET) * ds / (2*(ds/2 + x)) + OFFSET, HEIGHT/2, WIDTH-OFFSET, HEIGHT/2 - scr_x, WIDTH-OFFSET, HEIGHT/2 + scr_x);

    ctx.fillStyle = "black";
    drawHorizontalDoubleArrow(OFFSET, HEIGHT - MOFFSET, WIDTH-OFFSET, HEIGHT - MOFFSET);
    drawDashedLine(MOFFSET, HEIGHT/2, WIDTH - MOFFSET, HEIGHT/2, [10,10]);
    drawDashedLine(OFFSET, s1, WIDTH - OFFSET, xtop, [5,5]);
    drawDashedLine(OFFSET, s2, WIDTH - OFFSET, xtop, [5,5]);

    drawDashedLine(OFFSET, s2, WIDTH - OFFSET, xbot, [5,5]);
    drawDashedLine(OFFSET, s1, WIDTH - OFFSET, xbot, [5,5]);



    drawVerticalDoubleArrow(OFFSET + 2* MOFFSET, s2 - MOFFSET, OFFSET + 2*MOFFSET, s1 + MOFFSET);
    drawVerticalDoubleArrow(WIDTH - OFFSET + 2*MOFFSET, HEIGHT/2  , WIDTH - OFFSET + 2*MOFFSET, xtop);

    ctx.font = "16px Times New Roman";
    ctx.fillStyle = "red";
    ctx.fillText('d', OFFSET + 4*MOFFSET, HEIGHT/2 - 2*MOFFSET);
    ctx.fillText('x', WIDTH - OFFSET + 2.4*MOFFSET, HEIGHT/2 - scr_x/2);
    ctx.fillText('L', WIDTH/2, HEIGHT-2*MOFFSET);
    ctx.fillText('S1', 2*MOFFSET, s1    );
    ctx.fillText('S2', 2*MOFFSET, s2);

    ctx.fillStyle = "black";
    ctx.fillText('Ответ:', OFFSET, HEIGHT + OFFSET);
    // ctx.fillText(n, 2*OFFSET - 2*MOFFSET, HEIGHT + OFFSET);

}

function updateValues(){
    lambda = parseFloat(document.forms["Inputs"]["lambda"].value);
    ds = parseFloat(document.forms["Inputs"]["hole_height"].value);
    n = 1;
    x = parseFloat(document.forms["Inputs"]["screen_height"].value);
    l = parseFloat(document.forms["Inputs"]["screen_width"].value) * 1000;
    
    //Validation
    if ((lambda >= 380.0 && lambda <=790.0) && (ds >= 1.0 && ds <= 10.0) && (x >= 1.0 && x <= 10.0) && (l >= 1000 && l <= 10000))
    {
        calculateValues();
    }
    else
        alert("Некорректные значения");
        // console.log("Wrong values" + lambda + " " +ds +" " + x +" " + l);
}

function drawDeltaX(deltax){
    ctx.fillStyle = "black";
    ctx.fillText(('Δx ≈ ' + deltax + ' нм'), 2.7*OFFSET, HEIGHT + OFFSET);
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


    let dx = n * lambda * l / ds / 1000000 * k, start = WIDTH-5*MOFFSET+2, w = 10;
    ctx.fillStyle = primaryColor;
    ctx.fillRect(start, HEIGHT/2 - dx/2, w, dx);
    for(let i = dx/2, white = true; i < scr_x; i+=dx){
        if (white == true)
            ctx.fillStyle = "black";
        else
            ctx.fillStyle = primaryColor;

        white = !white;

        ctx.fillRect(start, HEIGHT/2 - i - dx, w, dx);
        ctx.fillRect(start, HEIGHT/2 + i, w, dx);

    }

    // ctx.fillRect(WIDTH-5*MOFFSET, HEIGHT/2-scr_x, 14, 2*scr_x);
    ctx.fillStyle = bgColor;
    ctx.fillRect(start, HEIGHT/2-scr_x, w, -200);
    ctx.fillRect(start, HEIGHT/2-scr_x + 2*scr_x, w, 200);
    
    drawDeltaX(Math.round(dx * 100) / 100);

}
