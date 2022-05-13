let name = ["Hydroponic vegetables","Drones","404","Lock","CCTV","map","camp","Chinese Medicine","Carrots","Iron pot","Horn","Flashing Spirit","TelephoneBooths","cube2","cube3","Body Bag","Violin","sheep","TongJiUniversity","Constitution","Pets","Yin","Iron mesh","Potatoes","SHSpring","zeroCovid","yellow code","greenCode","redCode","dabai","cube"]
let img = []
let imagers = []
let moveYes = true,
	gravity = false,
	gravityTime, saveYes = false

function preload() {
	for (let i = 0; i < name.length; i++) {
		img[i] = loadImage(name[i] + ".jpg")
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);

	for (let i = 0; i < name.length; i++) {
		imagers.push(new Imager(i, img[i], name[i]))
	}
}

function draw() {
	if (saveYes) {
		pixelDensity(2)
	} else {
		pixelDensity(2)
	}
	background(255)
	textSize(20);
	text("SH_LOCKDOWN_APRIL",100,80);
	textSize(8);
	text("All images are from the internet, \nif there are any copyright issues, please contact me for removal",100,700);

	for (let i = 0; i < imagers.length; i++) {
		imagers[i].tweak();
		for (let j = 0; j < i; j++) {
			imagers[i].collide(imagers[j]);
		}
	}

	for (let i = 0; i < imagers.length; i++) {
		imagers[i].move();
		imagers[i].draw();
	}

	if (saveYes) {
		save('SHLD_Poster_' + hour() + minute() + second() + '.jpg')
		saveYes = false
	}
}

class Imager {
	constructor(num, img, name) {
		this.num = num
		this.img = img
		this.name = name
		this.pos = createVector(random(width / 5 * 4), random(height / 5 * 4))
		this.vel = p5.Vector.random2D().mult(random(3));
		this.w = random(50, 120)
		this.r = this.img.height / this.img.width
		this.h = this.w * this.r
		this.r = (this.w >= this.h) ? this.w : this.h
		this.pr = this.r
	}

	tweak() {
		this.r = (this.pr + params.distance + 20) / 2
	}

	draw() {
		push()
		translate(this.pos.x, this.pos.y)

		textSize(8)
		image(this.img, -this.w / 2, -this.h / 2, this.w, this.h)
		text("[ "+this.num+" ]  "+this.name, -this.w / 2, this.h/2 + 8)
		// text("APRIL  "+this.name, -this.w / 2, this.h/2 +18)
		noFill()
		rectMode(CORNER)
		// circle(0, 0, this.r * 2)
		// line(-this.w/2,this.h/2-8,this.w,this.h/2-8);
		
		pop()
	}

	collide(other) {
		if (moveYes) {
			if (other == this) {
				return;
			}
			let relative = p5.Vector.sub(other.pos, this.pos);
			let bdist = relative.mag() - (this.r + other.r);
			if (bdist < 0) {
				let movement, approachSpeed
				movement = relative.copy().setMag(abs(bdist / (5 - params.speed)));
				this.pos.sub(movement);
				other.pos.add(movement);

				let thisToOtherNormal = relative.copy().normalize();
				approachSpeed = this.vel.dot(thisToOtherNormal) + -other.vel.dot(thisToOtherNormal);

				let approachVector = thisToOtherNormal.copy().setMag(approachSpeed);
				this.vel.sub(approachVector);
				other.vel.add(approachVector);
			}
		}
	}

	reset() {
		this.w = random(params.minWidth, params.maxWidth)
		this.r = this.img.height / this.img.width
		this.h = this.w * this.r
		this.r = (this.w >= this.h) ? this.w : this.h
		this.pr = this.r
		this.pos = createVector(random(width / 5 * 4), random(height / 5 * 4))
	}

	move() {
		if (moveYes) {
			if (this.pos.x - this.w < params.borderX) {
				this.pos.x = params.borderX + this.w;
				this.vel.x = -this.vel.x * 0.2;
			}
			if (this.pos.x > width - this.w - params.borderX) {
				this.pos.x = width - this.w - params.borderX;
				this.vel.x = -this.vel.x * 0.2;
			}
			if (this.pos.y - this.h < params.borderY) {
				this.pos.y = params.borderY + this.h;
				this.vel.y = -this.vel.y * 0.2;
			}
			if (this.pos.y > height - this.h - params.borderY) {
				this.pos.y = height - this.h - params.borderY;
				this.vel.y = -this.vel.y * 0.2;
			}

			this.pos.x += this.vel.x
			this.pos.y += this.vel.y
		}

		if (gravity) {
			this.vel.x = 0

			if (frameCount < gravityTime) {
				this.pos.y += 1
				this.vel.y += 0.1
			}
		}
	}
	
}