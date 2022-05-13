const params = {
	minWidth: 50,
	maxWidth: 120,
	distance: 0,
	borderX: 100,
	borderY: 100,
	speed: 0
};

const pane = new Tweakpane.Pane();
const f = pane.addFolder({
  title: 'Interface',
});

f.addInput(params, "minWidth", {
	min: 20,
	max: 100
});
f.addInput(params, "maxWidth", {
	min: 100,
	max: 250
});
f.addInput(params, "distance", {
	min: -40,
	max: 40
});
f.addInput(params, "borderX", {
	min: 100,
	max: 500
});
f.addInput(params, "borderY", {
	min: 100,
	max: 500
});
f.addInput(params, "speed", {
	min: 0,
	max: 4
});
f.addSeparator();
const regen = f.addButton({
	title: 'Regenerate',
});
// const stop = f.addButton({
// 	title: 'Stop',
// });
const gravityBtn = f.addButton({
	title: 'Turn Gravity ON',
});
const saveBtn = f.addButton({
	title: 'Save',
});

regen.on('click', () => {
	for (let i = 0; i < name.length; i++) {
		imagers[i].reset()
	}
});
// stop.on('click', () => {
// 	stop.title = moveYes ? 'Start' : 'Stop';
// 	moveYes = !moveYes
// });
saveBtn.on('click', () => {
	saveYes = true
});
gravityBtn.on('click', () => {
	gravityBtn.title = gravity ? 'Turn Gravity ON' : 'Turn Gravity OFF';
	gravity = !gravity
	gravityTime = frameCount + 60
});

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}