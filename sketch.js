// constants
const screenWidth = 600;
const screenHeight = 600;

let picker;
let colour;

let currentTool = "rectangle";
const dots = new Set();
const rectangles = new Set();

let rectangleStarted = false;
let [rectX, rectY] = [0, 0];

function randColour() {
	// generate a random colour
	const colour = `#${Math.random().toString(16).slice(2, 8)}`;

	// update the colour picker
	document.getElementById("colourPicker").value = colour;

	return colour;
}


// add a new shape
function mousePressed() {
	if(0 <= mouseX && mouseX <= screenWidth 
		&& 0 <= mouseY && mouseY <= screenHeight) {
		if(currentTool === "dot") {
			dots.add(new Dot(mouseX, mouseY, colour));

			colour = randColour();
		}

		if(currentTool === "rectangle") {
			rectangleStarted = true;
			[rectX, rectY] = [mouseX, mouseY];
		}
	}
}

function mouseReleased() {
	if(0 <= mouseX && mouseX <= screenWidth 
		&& 0 <= mouseY && mouseY <= screenHeight 
		&& currentTool === "rectangle"
		&& rectangleStarted) {
		// this is where we wanna actually create the rectangle
		const rectWidth = abs(rectX - mouseX);
		const rectHeight = abs(rectY - mouseY);
		const tempX = min(rectX, mouseX);
		const tempY = min(rectY, mouseY);

		rectangles.add(new Rectangle(tempX, tempY, rectWidth, rectHeight, colour));

		// change the colour to something else random
		colour = randColour();
	}

	rectangleStarted = false;
}

function mouseMoved() {
	let hoveringRectangle = false;

	if(currentTool === "hand") {
		for(const rectangle of rectangles) {
			const {x, y, width, height} = rectangle;

			if(x <= mouseX && mouseX <= x + width 
				&& y <= mouseY && mouseY <= y + height) {
				rectangle.highlighted = true;
				hoveringRectangle = true;
			} else {
				rectangle.highlighted = false;
			}
		}
	}

	cursor(hoveringRectangle ? MOVE : CROSS);
}


// this function runs once, before the first draw
function setup() {
	// make the canvas
	createCanvas(screenWidth, screenHeight);

	colour = randColour();

	// get the colour picker ready
	document.getElementById("colourPicker")
	.addEventListener("change", event => {
		const selectedColour = event.target.value;
		colour = selectedColour;
	});

	document.getElementById("dotTool").addEventListener("click", event => {
		currentTool = "dot";
	});

	document.getElementById("rectTool").addEventListener("click", event => {
		currentTool = "rectangle";
	});

	document.getElementById("handTool").addEventListener("click", event => {
		currentTool = "hand";
	});

	document.getElementById("clearTool").addEventListener("click", event => {
		dots.clear();
		rectangles.clear();
	});
}

// this function runs every frame
function draw() {
	background("white");

	for(const rectangle of rectangles) {
		rectangle.render();
	}

	for(const dot of dots) {
		dot.render();
	}

	// show the temporary rectangle on screen
	if(rectangleStarted) {
		const rectWidth = abs(rectX - mouseX);
		const rectHeight = abs(rectY - mouseY);
		const tempX = min(rectX, mouseX);
		const tempY = min(rectY, mouseY);

		push();
		stroke(160, 160, 160);
		strokeWeight(1);
		noFill();
		rect(tempX, tempY, rectWidth, rectHeight);
		pop();
	}
}