
var ctSquare = document.getElementById('ctArea')
var trSquare = document.getElementById('trArea')
var ctInput = ctSquare.getElementById('inputsteam')
var trInput = trSquare.querySelector('inputgrave')

ctSquare.addEventListener('click', function () {
  ctInput.value = true
  trInput.value = false
})

trSquare.addEventListener('click', function () {
  ctInput.value = false
  trInput.value = true
})

var textWrapper = document.querySelector('.ml6 .letters')
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g,"<span class='letter'>$&</span>")

textWrapper.addEventListener('mousedown', function () {
  document.getElementById("play").style
})

textWrapper.addEventListener('mouseover', function () {
  letterjump.play()
})

const letterjump = anime.timeline({ loop: false }).add({
  targets: '.ml6 .letter',
  translateY: [0, '-0.5em', 0],
  translateZ: 0,
  duration: 550,
  easing: 'cubicBezier(0.25, 1, 0.5, 1)',
  delay: (el, i) => (30 * i)-30
})
letterjump.pause()


