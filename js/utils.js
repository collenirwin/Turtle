const isNumber = (number) => {
    return !isNaN(parseFloat(number)) && isFinite(number);
};

const sizeCanvasToWindow = (canvas) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
