class Tool {
	constructor(id, type, func) {
		this.id = id;
		this.eventType = type;
		this.eventFunction = func;
	}
}

const toolBox = [
	new Tool("colourPicker", "change", 
		event => {
			const selectedColour = event.target.value;
			colour = selectedColour;
		}
	),
	new Tool("dotTool", "click", () => {changeTool("dot");}),
	new Tool("rectTool", "click", () => {changeTool("rectangle");}),
	new Tool("handTool", "click", () => {changeTool("hand");}),
	new Tool("clearTool", "click", () => {
		dots.clear();
		rectangles.clear();
	})
];