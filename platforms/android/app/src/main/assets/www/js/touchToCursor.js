function TouchToCursor(canvas) {
    const canv = canvas;
    function canvTouchStart(e) {
        const mouseEvent = new MouseEvent("mousedown", {
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY
        });
        canv.dispatchEvent(mouseEvent);
    }

    function canvTouchEnd(e) {
        const mouseEvent = new MouseEvent("mouseup", {});
        canv.dispatchEvent(mouseEvent);
    }

    function canvTouchMove(e) {
        const mouseEvent = new MouseEvent("mousemove", {
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY
        });
        canv.dispatchEvent(mouseEvent);
        e.preventDefault();
    }
    
    canvas.addEventListener('touchstart', canvTouchStart);
    canvas.addEventListener('touchend', canvTouchEnd);
    canvas.addEventListener('touchmove', canvTouchMove);
}

