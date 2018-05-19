// flashing colour function
const wave = n => 125 + 125 * sin(7 * frameCount / n);

class Rectangle {
	constructor(x, y, width, height, colour) {
		this.x = x;
		this.y = y;
		this.startX = x;
		this.startY = y;
		this.width = width;
		this.height = height;
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
		stroke(startColour);
		strokeWeight(5);
		noFill();
		rect(this.startX, this.startY, this.width, this.height);
		pop();



		push();
		stroke(this.colour);
		strokeWeight(5);
		
		for(let i = 0; i < parts; i++) {
			stroke(lerpColor(startColour, endColour , (i) / parts));
			
			for(const [dx, dy] of [[0, 0], [0, 1], [1, 0], [1, 1]]) {
				const startX = x1 + dx * this.width + (i / parts) * xDiff;
				const endX = x1 + dx * this.width + ((i + 1) / parts) * xDiff;
				const startY = y1 + dy * this.height + (i / parts) * yDiff;
				const endY = y1 + dy * this.height + ((i + 1) / parts) * yDiff;
				line(startX, startY, endX, endY);
			}
		}
		
		pop();


		push();
		stroke(this.colour);
		strokeWeight(5);

		if(this.highlighted) fill(
			wave(13), 
			wave(17), 
			wave(19), 
			30
		);
		else noFill();

		rect(this.x + offsetX, this.y + offsetY, this.width, this.height);
		pop();
	}
}