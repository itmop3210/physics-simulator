const TOP_ALLIGN = 100;
let lambda, hole_height, screen_width, source_width;

// TODO: is it necessary to support changable n?

window.onload = function() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) 
        var ctx = canvas.getContext('2d');

    updateCanvasSize();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 400, 300);
}


function updateValues(){
    lambda = document.getElementById("lambda").value;
    hole_height = document.getElementById("hole_height").value;
    source_width = document.getElementById("source_width").value;
    screen_width = document.getElementById("screen_width").value;
}


function updateCanvasSize() {
    const canvas = document.getElementById('canvas');

    let size = Math.min(window.innerWidth, (window.innerHeight - TOP_ALLIGN) * 4 / 3  );
    canvas.style.width = size + 'px';
    canvas.style.height = size * 3 / 4  + 'px';
}




		
