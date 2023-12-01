import { loadImage, loadAudio } from './loadAsset.js'
import { Player } from './player.js'
import { InputHandler } from './input.js'
import { Background } from './background.js'
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from './enemies.js'
import { UI } from './UI.js'

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 800
  canvas.height = 793

  const selectionScreen = document.getElementById('selectionScreen')
  // const characterSelect = document.getElementById('characterSelect')
  const characterSelect = document.querySelectorAll('input[name="player"]')
  const backgroundSelect = document.querySelectorAll('input[name="background"]')
  const startButton = document.getElementById('startButton')

  let game
  let selectedCharacter
  let selectedBackground

  startButton.addEventListener('click', () => {
    characterSelect.forEach(input => {
      if (input.checked) {
        selectedCharacter = input.id
      }
    })
    backgroundSelect.forEach(input => {
      if (input.checked) {
        selectedBackground = input.id
      }
    })

    // const selectedCharacter = characterSelect.value
    // const selectedBackground = backgroundSelect.value

    selectionScreen.style.display = 'none'

    game = new Game(
      canvas.width,
      canvas.height,
      selectedCharacter,
      selectedBackground
    )
    animate(0)
  })

  // Promise.all([

  // background forest1
  for (let i = 1; i < 13; i++) {
    loadImage('./background/forest1/layer' + i + '.png')
  }

  // background forest2
  for (let i = 1; i < 7; i++) {
    loadImage('./background/forest2/layer' + i + '.png')
  }

  // background desert
  for (let i = 1; i < 6; i++) {
    loadImage('./background/desert/layer' + i + '.png')
  }

  // background gardens
  for (let i = 1; i < 8; i++) {
    loadImage('./background/gardens/layer' + i + '.png')
  }

  // enemies
  loadImage('./enemies/enemy_fly2.png')
  loadImage('./enemies/enemy_plant2.png')
  loadImage('./enemies/enemy_spider.png')

  // player
  loadImage('./player.png')
  loadImage('./player2.png')

  // sounds
  loadAudio('./sounds/theme.mp3')
  loadAudio('./sounds/hurt.mp3')
  loadAudio('./sounds/loss.mp3')
  loadAudio('./sounds/win.mp3')
  loadAudio('./sounds/enemy.mp3')

  class Game {
    constructor(width, height, selectedCharacter, selectedBackground) {
      this.width = width
      this.height = height
      this.selectedCharacter = selectedCharacter
      this.selectedBackground = selectedBackground
      this.groundMargin = 80
      this.speed = 0
      this.maxSpeed = 2
      this.background = new Background(this)
      this.player = new Player(this)
      this.input = new InputHandler(this)
      this.ui = new UI(this)
      this.enemies = []
      this.enemyTimer = 0
      this.enemyInterval = 1000
      this.debug = false
      this.score = 0
      this.fontColor = 'white'
      this.player.currentState = this.player.states[0]
      this.player.currentState.enter()
      this.time = 0
      this.maxTime = 33000
      this.lifes = 3
      this.gameOver = false
      this.sound = {
        theme: new Audio('./sounds/theme.mp3'),
        hurt: new Audio('./sounds/hurt.mp3'),
        loss: new Audio('./sounds/loss.mp3'),
        win: new Audio('./sounds/win.mp3'),
        enemy: new Audio('./sounds/enemy.mp3')
      }
      this.sound.theme.loop = true
      this.sound.theme.volume = 0.25
      this.sound.theme.play()
      this.dif = 0
      this.scoreDif = 5
    }
    update(deltaTime) {
      this.time += deltaTime
      //console.log(this.time)
      if (this.time > this.maxTime || this.lifes == 0) {
        this.gameOver = true
      }
      this.background.update()
      this.player.update(this.input.keys, deltaTime)

      // inimigos
      if (this.time > 3000) {
        if (this.enemyTimer > this.enemyInterval) {
          this.enemyTimer = 0
          this.addEnemy()
        } else {
          this.enemyTimer += deltaTime
        }
        this.enemies.forEach(enemy => {
          enemy.update(deltaTime)
          if (enemy.markedForDeletion) {
            this.enemies.splice(this.enemies.indexOf(enemy), 1)
          }
        })
      }

      if (this.score == this.scoreDif){
        this.scoreDif += 5 
        this.dif++
      }
    }
    draw(context) {
      this.background.draw(context)
      this.player.draw(context)
      this.enemies.forEach(enemy => enemy.draw(context))
      this.ui.draw(context)
    }
    addEnemy(enemy) {
      if (this.speed > 0 && Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this))
      } else if (this.speed > 0) {
        this.enemies.push(new ClimbingEnemy(this))
      }
      this.enemies.push(new FlyingEnemy(this))
    }
  }

  // const game = new Game(canvas.width, canvas.height)
  // console.log(game)
  let lastTime = 0
  let sumFrame = 10

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp

    sumFrame += deltaTime
    if (sumFrame > deltaTime * 2.4) {
      //console.log(sumFrame)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      game.update(deltaTime)
      game.draw(ctx)
    }

    if (!game.gameOver) {
      requestAnimationFrame(animate)
    } else {
      window.addEventListener('keydown', function (e) {
        console.log(e.code)
        if (e.code === 'Enter') {
          window.location.reload()
        }
      })
    }
    // setTimeout(requestAnimationFrame(animate), 1000)
  }
  // animate(0)
})
