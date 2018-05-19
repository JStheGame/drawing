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
		const [x1, y1, x2, y2] = [this.startX, this.startY, 
								  this.x + offsetX, this.y + offsetY];
		const parts = 20;
		const [xDiff, yDiff] = [x2 - x1, y2 - y1];
		const startColour = color(160);
		const endColour = color(this.colour);

		push();
		strokeWeight(10);
		stroke(startColour);
		point(this.startX, this.startY);
		pop();

		push();
		strokeWeight(5);
		stroke(this.colour);

		for(let i = 0; i < parts; i++) {
			stroke(lerpColor(startColour, endColour , (i) / parts));
			const startX = x1 + (i / parts) * xDiff;
			const endX = x1 + ((i + 1) / parts) * xDiff;
			const startY = y1 + (i / parts) * yDiff;
			const endY = y1 + ((i + 1) / parts) * yDiff;
			line(startX, startY, endX, endY);
		}

		pop();

		push();
		strokeWeight(this.highlighted ? 40 : 10);
		stroke(this.colour);
		point(this.x + offsetX, this.y + offsetY);
		pop();
	}
}