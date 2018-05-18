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
		push();
		stroke(160);
		strokeWeight(5);
		noFill();
		rect(this.startX, this.startY, this.width, this.height);
		pop();



		push();
		stroke(this.colour);
		strokeWeight(5);
		
		// upper left corner
		line(this.startX, this.startY, this.x + offsetX, this.y + offsetY);

		// upper right corner
		line(this.startX + this.width, this.startY, this.x + offsetX + this.width, this.y + offsetY);

		// lower left corner
		line(this.startX, this.startY + this.height, this.x + offsetX, this.y + offsetY + this.height);

		// lower right corner
		line(this.startX + this.width, this.startY + this.height, this.x + offsetX + this.width, this.y + offsetY + this.height);

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