const ls = localStorage
const form = document.forms[0]
const formEls = form.elements

formEls.iframe.checked = !(ls.getItem('site360.iframe') === 'false')
formEls.wallTexture.checked = !(ls.getItem('site360.wallTexture') === 'false')
formEls.roofTexture.checked = !(ls.getItem('site360.roofTexture') === 'false')
formEls.floorTexture.checked = !(ls.getItem('site360.floorTexture') === 'false')
formEls.carpet.checked = !(ls.getItem('site360.carpet') === 'false')
formEls.photo.checked = !(ls.getItem('site360.photo') === 'false')
formEls.shadows.checked = !(ls.getItem('site360.shadows') === 'false')
formEls.texts.checked = !(ls.getItem('site360.texts') === 'false')
formEls.dice.checked = !(ls.getItem('site360.dice') === 'false')
formEls.diceTexture.checked = !(ls.getItem('site360.diceTexture') === 'false')

document.forms[0].addEventListener('submit', function (e) {
	e.preventDefault()
	const elems = this.elements

	ls.setItem('site360.iframe', elems.iframe.checked)
	ls.setItem('site360.wallTexture', elems.wallTexture.checked)
	ls.setItem('site360.roofTexture', elems.roofTexture.checked)
	ls.setItem('site360.floorTexture', elems.floorTexture.checked)
	ls.setItem('site360.carpet', elems.carpet.checked)
	ls.setItem('site360.photo', elems.photo.checked)
	ls.setItem('site360.shadows', elems.shadows.checked)
	ls.setItem('site360.texts', elems.texts.checked)
	ls.setItem('site360.dice', elems.dice.checked)
	ls.setItem('site360.diceTexture', elems.diceTexture.checked)

	location.href = 'room.html'
})