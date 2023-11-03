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

  class Game {
    constructor(width, height) {
      this.width = width
      this.height = height
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
      this.maxTime = 20000
      this.gameOver = false
    }
    update(deltaTime) {
      this.time += deltaTime
      if (this.time > this.maxTime) {
        this.gameOver = true
      }
      this.background.update()
      this.player.update(this.input.keys, deltaTime)

      // inimigos
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

  const game = new Game(canvas.width, canvas.height)
  console.log(game)
  let lastTime = 0
  let sumFrame = 10

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp

    sumFrame += deltaTime
    if (sumFrame > deltaTime * 2.4) {
      // console.log(deltaTime)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      game.update(deltaTime)
      game.draw(ctx)
    }

    if (!game.gameOver) {
      requestAnimationFrame(animate)
    } else {
      window.addEventListener('keydown', function (e) {
        if (e.code === 'Space') {
          window.location.reload()
        }
      })
    }
    // setTimeout(requestAnimationFrame(animate), 1000)
  }
  animate(0)
})
