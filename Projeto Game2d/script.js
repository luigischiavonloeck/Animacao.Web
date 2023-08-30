var ctImg = document.getElementById('ctImg')
var trImg = document.getElementById('trImg')
var ctSquare = document.getElementById('ctArea')
var trSquare = document.getElementById('trArea')
var ctInput = ctSquare.querySelector('input')
var trInput = trSquare.querySelector('input')

ctSquare.addEventListener('click', function () {
  ctInput.value = true
  trInput.value = false
})

trSquare.addEventListener('click', function () {
  ctInput.value = false
  trInput.value = true
})

