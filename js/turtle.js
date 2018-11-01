class Turtle {

    constructor(canvas) {
        this.canvas = canvas;

        // initialize all properties to their defaults
        this.reset();
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
        while (this.angle > 359) {
            this.angle = Math.abs(360 - this.angle);
        }
    }

    forward(amount) {
        const context = this.canvas.getContext("2d");

        context.beginPath();

        // move to our point in the canvas
        context.moveTo(this.x, this.y);

        // convert angle from degrees to radians
        const angleRadians = this.angle * Math.PI / 180.0;

        // set x and y to the next point based on the amount and the angle
        this.x += amount * Math.cos(angleRadians);
        this.y += amount * Math.sin(angleRadians);

        // draw our line if our pen is down
        if (this.penDown) {
            context.strokeStyle = this.color;
            context.lineWidth = this.penWidth;
            context.lineTo(this.x, this.y);
            context.stroke();
        }
    }

    back(amount) {
        this.forward(-amount);
    }

    reset() {
        // clear canvas
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);

        // default to the center of the canvas
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;

        this.angle = 0;

        this.color = "#333";

        this.penWidth = 2;
        this.penDown = true;
    }
}
