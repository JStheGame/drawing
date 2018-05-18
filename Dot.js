class Dot {
	constructor(x, y, colour) {
		this.x = x;
		this.y = y;
		this.startX = x;
		this.startY = y;
		this.colour = colour;
		this.highlighted = false;
	}

	highlight() {
		this.highlighted = true;
	}

	unhighlight() {
		this.highlighted = false;
	}

	move(offsetX, offsetY) {
		this.x += offsetX;
		this.y += offsetY;
	}

	render(offsetX = 0, offsetY = 0) {
		push();
		strokeWeight(10);
		stroke(160);
		point(this.startX, this.startY);
		pop();

		push();
		strokeWeight(5);
		stroke(this.colour);
		line(this.startX, this.startY, this.x + offsetX, this.y + offsetY);
		pop();

		push();
		strokeWeight(this.highlighted ? 40 : 10);
		stroke(this.colour);
		point(this.x + offsetX, this.y + offsetY);
		pop();
	}
}