var LedMatrix = require("node-rpi-rgb-led-matrix");
var noise = require('./perlin').noise;
var matrix = new LedMatrix();

var canvas = {"height":32,"width":32};
noise.seed(Math.random());

var size=25
var offsetX = 0
var offsetY = 0
var t= 0

function draw (){
    t++
    angle=noise.simplex2(t*0.002,0)*6
    offsetX += Math.cos(angle) * 0.1
    offsetY += Math.sin(angle) * 0.1
		for (var x = 0; x < canvas.width; x++) {
			for (var y = 0; y < canvas.height; y++) {
				var value = Math.abs(noise.simplex2((x + (offsetX * 2)) / (size*4), (y + (offsetY*2)) / (size*4)));
				var value2 = Math.abs(noise.simplex2(1000 + (x + offsetX) / size, 2000+ (y + offsetY) / size));
				var value3 = Math.abs(noise.simplex2(2000 + (x + offsetX) / size, 2000+ (y + offsetY) / size));
				value *= 254;
				value2 *= 254;
				value3 *= 254;
				matrix.setPixel(x,y,value,value2,value3)
			}
		}
  setImmediate(draw)
}

setImmediate(draw)
