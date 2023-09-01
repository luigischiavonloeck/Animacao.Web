var ctImg = document.getElementById('ctImg')
var trImg = document.getElementById('trImg')
var ctSquare = document.getElementById('ctArea')
var trSquare = document.getElementById('trArea')
var ctInput = ctSquare.querySelector('input')
var trInput = trSquare.querySelector('input')
var imgUrls = []

ctSquare.addEventListener('click', function () {
  ctInput.value = true
  trInput.value = false
})

trSquare.addEventListener('click', function () {
  ctInput.value = false
  trInput.value = true
})

for (let index = 0; index < 8; index++) {
  imgUrls.push('./sprites/CT/png/1/idle/1_police_Idle_00' + index + '.png')
}
for (let index = 0; index < 8; index++) {
  imgUrls.push('./sprites/TR/png/1/idle/1_terrorist_1_Idle_00' + index + '.png')
}
for (let index = 0; index < 6; index++) {
  imgUrls.push(
    './sprites/CT/png/1/attack/1_police_attack_Attack_000_00' + index + '.png'
  )
}
for (let index = 0; index < 4; index++) {
  imgUrls.push(
    './sprites/TR/png/1/Attack2/1_terrorist_1_Attack2_00' + index + '.png'
  )
}
for (let index = 0; index < 6; index++) {
  imgUrls.push('./sprites/TR/png/1/run/1_terrorist_1_Run_00' + index + '.png')
}
for (let index = 0; index < 6; index++) {
  imgUrls.push('./sprites/CT/png/1/run/1_police_Run_00' + index + '.png')
}

// load sprites images
let loaded = 0
imgUrls.forEach(url => {
  var img = new Image()
  img.src = url
  img.onload = function () {
    loaded++
    if (loaded === imgUrls.length) {
      console.log('loaded')
    }
  }
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
