class Dot {
	constructor(x, y, colour) {
		this.x = x;
		this.y = y;
		this.colour = colour;
	}

	render() {
		push();
		strokeWeight(10);
		stroke(this.colour);
		point(this.x, this.y);
		pop();
	}
}