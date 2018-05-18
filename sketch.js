// constants
const screenWidth = 600;
const screenHeight = 600;

let picker;
let colour;

let currentTool;
const dots = new Set();
const rectangles = new Set();

let rectangleStarted = false;
let [rectX, rectY] = [0, 0];

let shapeMoving = false;
let [moveX, moveY] = [0, 0];

function changeTool(toolName) {
	currentTool = toolName;
	document.getElementById("selectedTool").innerHTML = toolName;
}

function randColour() {
	// generate a random colour
	const colour = `#${random().toString(16).slice(2, 8)}`;

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

		if(currentTool === "hand") {
			shapeMoving = true;
			[moveX, moveY] = [mouseX, mouseY];
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

	// check for hand tool, move the rectangles
	if(0 <= mouseX && mouseX <= screenWidth 
		&& 0 <= mouseY && mouseY <= screenHeight 
		&& currentTool === "hand" && shapeMoving) {
		for(const rectangle of rectangles) {
			if(rectangle.highlighted) {
				// actually move it
				rectangle.move(mouseX - moveX, mouseY - moveY);
			}
		}

		for(const dot of dots) {
			if(dot.highlighted) {
				// move the dot
				dot.move(mouseX - moveX, mouseY - moveY);
			}
		}
	}

	shapeMoving = false;
	rectangleStarted = false;
}

function mouseMoved() {
	let hoveringAtLeastOneThing = false;

	if(currentTool === "hand") {
		for(const dot of dots) {
			const {x, y} = dot;
			const [dx, dy] = [mouseX - x, mouseY - y];

			if(Math.sqrt(dx ** 2 + dy ** 2) <= 20) {
				dot.highlight();
				hoveringAtLeastOneThing = true;
			} else {
				dot.unhighlight();
			}

		}

		for(const rectangle of rectangles) {
			const {x, y, width, height} = rectangle;

			if(x <= mouseX && mouseX <= x + width 
				&& y <= mouseY && mouseY <= y + height) {
				rectangle.highlight();
				hoveringAtLeastOneThing = true;
			} else {
				rectangle.unhighlight();
			}
		}
	}

	cursor(hoveringAtLeastOneThing ? MOVE : CROSS);
}


// this function runs once, before the first draw
function setup() {
	// make the canvas
	createCanvas(screenWidth, screenHeight);

	colour = randColour();
	changeTool("rectangle");

	// get all the event listeners ready
	for(const tool of toolBox) {
		document.getElementById(tool.id)
		.addEventListener(tool.eventType, tool.eventFunction);
	}
}

// this function runs every frame
function draw() {
	// clear the background
	background("white");

	let [offsetX, offsetY] = [0, 0];

	if(shapeMoving) {
		[offsetX, offsetY] = [mouseX - moveX, mouseY - moveY];
	}

	// draw all the rectangles
	for(const rectangle of rectangles) {
		if(rectangle.highlighted) {
			rectangle.render(offsetX, offsetY);
		} else {
			rectangle.render();
		}
	}

	// draw all the dots
	for(const dot of dots) {
		if(dot.highlighted) {
			dot.render(offsetX, offsetY);
		} else {
			dot.render();
		}
	}

	// show the temporary rectangle on screen
	if(rectangleStarted) {
		const rectWidth = abs(rectX - mouseX);
		const rectHeight = abs(rectY - mouseY);
		const tempX = min(rectX, mouseX);
		const tempY = min(rectY, mouseY);

		push();
		stroke(160);
		strokeWeight(1);
		noFill();
		rect(tempX, tempY, rectWidth, rectHeight);
		pop();
	}
}