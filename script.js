const ls = localStorage
const options = {
	iframe: !(ls['site360.iframe'] === 'false'),
	wallTexture: !(ls['site360.wallTexture'] === 'false'),
	roofTexture: !(ls['site360.roofTexture'] === 'false'),
	floorTexture: !(ls['site360.floorTexture'] === 'false'),
	carpet: !(ls['site360.carpet'] === 'false'),
	photo: !(ls['site360.photo'] === 'false'),
	texts: !(ls['site360.texts'] === 'false'),
	dice: !(ls['site360.dice'] === 'false'),
	diceTexture: !(ls['site360.diceTexture'] === 'false')
}

if (!options.iframe) document.querySelector('iframe').remove()
if (!options.carpet) document.querySelector('.carpet').remove()
if (!options.photo) document.querySelector('.photo').remove()
if (!options.texts) document.querySelectorAll('.text').forEach(e => e.remove())
if (!options.dice) document.querySelectorAll('.cube-face.sm').forEach(e => e.remove())
if (options.wallTexture) document.body.classList.add('wall-texture')
if (options.roofTexture) document.body.classList.add('roof-texture')
if (options.floorTexture) document.body.classList.add('floor-texture')
if (options.diceTexture) document.body.classList.add('dice-texture')
if (options.shadows) document.body.classList.add('shadows')

const imagesCount = [
	options.carpet,
	options.photo,
	options.wallTexture,
	options.roofTexture,
	options.floorTexture,
	options.diceTexture,
	options.diceTexture,
	options.diceTexture,
	options.diceTexture,
	options.diceTexture,
	options.diceTexture
].filter(e => e).length

console.log(imagesCount)

document.querySelector('.loading-total').innerText = imagesCount
let loadingProgress = 0
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const $image = document.createElement('img')
		$image.addEventListener('load', () => {
			loadingProgress += 1
			document.querySelector('.loading-progress').innerText = loadingProgress
			resolve()
		})
		$image.addEventListener('error', () => {
			loadingProgress += 1
			document.querySelector('.loading-progress').innerText = loadingProgress
			resolve()
		})
		$image.src = src
	})
}

const imagePromises = []
if (options.carpet) imagePromises.push(loadImage('img/carpet.png'))
if (options.photo) imagePromises.push(loadImage('img/photo.png'))
if (options.wallTexture) imagePromises.push(loadImage('img/wall.jpg'))
if (options.roofTexture) imagePromises.push(loadImage('img/roof.jpg'))
if (options.floorTexture) imagePromises.push(loadImage('img/floor.jpg'))
if (options.diceTexture) {
	imagePromises.push(loadImage('img/dice1.svg'))
	imagePromises.push(loadImage('img/dice2.svg'))
	imagePromises.push(loadImage('img/dice3.svg'))
	imagePromises.push(loadImage('img/dice4.svg'))
	imagePromises.push(loadImage('img/dice5.svg'))
	imagePromises.push(loadImage('img/dice6.svg'))
}
Promise.all(imagePromises).then(() => {
	document.querySelector('.loading').remove()
	document.querySelector('.scene').classList.remove('hidden')
})


let deltaX = 0
let deltaY = 0
let deltaZ = 0
let beta = 0
let gamma = 0
let alpha = 0
window.addEventListener('deviceorientation', rotate)
document.addEventListener('contextmenu', (e) => {
	e.preventDefault()
	return false
})

let SENSITIVITY = -0.2
const $cube = document.querySelector('.cube')
function rotate(e = {}, sensitivity = -0.2) {
	beta = e.beta || beta
	gamma = e.gamma || gamma
	alpha = e.alpha || alpha
	$cube.style.transform = 
		`rotateX(${(e.beta || beta) + (deltaY * sensitivity)}deg) ` +
		`rotate(${(e.gamma || gamma) + (deltaX * sensitivity)}deg) ` +
		`rotateZ(${(e.alpha || alpha) + (deltaZ * sensitivity)}deg)`
}

const $canvas = document.querySelector('canvas')
document.addEventListener('click', () => {
	if (document.pointerLockElement) {
		document.exitPointerLock()
	} else {
		$canvas.requestPointerLock()
	}
})

document.addEventListener('mousemove', (e) => {
	deltaX += e.movementX
	deltaY += e.movementY
	rotate(undefined, SENSITIVITY)
})

let lastTouchX = 0
let lastTouchY = 0
document.addEventListener('touchstart', (e) => {
	lastTouchX = e.changedTouches[0].clientX
	lastTouchY = e.changedTouches[0].clientY
})

let TOUCH_SENSITIVITY = 0.5
document.addEventListener('touchmove', (e) => {
	e.preventDefault()
	const _deltaX = e.changedTouches[0].clientX - lastTouchX
	const _deltaY = e.changedTouches[0].clientY - lastTouchY
	deltaZ += _deltaX
	deltaY += _deltaY
	lastTouchX = e.changedTouches[0].clientX
	lastTouchY = e.changedTouches[0].clientY
	rotate(undefined, TOUCH_SENSITIVITY)
})

document.addEventListener('click', () => {
	document.documentElement.requestFullscreen()
})