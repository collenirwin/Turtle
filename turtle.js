const turtleCommands = "";

class Turtle {
    constructor(canvas, x, y) {
        this.canvas = canvas;

        // default to the center of the canvas
        this.x = x || canvas.width / 2;
        this.y = y || canvas.height / 2;
        this.angle = 0;
    }

    interpret(code) {
        console.log(code);
    }

    left(degrees) {
        this.angle -= degrees;

        // wrap around
        while (this.angle < 0) {
            this.angle = 360 + this.angle;
        }
    }

    right(degrees) {
        this.angle += degrees;

        // wrap around
        while (this.angle > 360) {
            this.angle = Math.abs(360 - this.angle);
        }
    }

    forward(amount, draw) {
        const context = this.canvas.getContext("2d");

        // move to our point in the canvas
        context.moveTo(this.x, this.y);

        // convert angle from degrees to radians
        const angleRadians = this.angle * Math.PI / 180.0;

        // set x and y to the next point based on the amount and the angle
        this.x += amount * Math.cos(angleRadians);
        this.y += amount * Math.sin(angleRadians);

        // draw our line if told to do so
        if (draw) {
            context.lineTo(this.x, this.y);
            context.stroke();
        }
    }

    back(amount, draw) {
        this.forward(-amount, draw);
    }

    reset() {
        // clear canvas
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);

        // go back to the center of the canvas
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;
        this.angle = 0;
    }
}