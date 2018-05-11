const wave = n => 100 + 100 * sin(5 * frameCount / n);

class Rectangle {
	constructor(x, y, width, height, colour) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.colour = colour;
		this.highlighted = false;
	}

	render() {
		push();
		stroke(this.colour);
		strokeWeight(5);

		if(this.highlighted) fill(
			wave(13), 
			wave(17), 
			wave(19), 
			50
		);
		else noFill();

		rect(this.x, this.y, this.width, this.height);
		pop();
	}
}