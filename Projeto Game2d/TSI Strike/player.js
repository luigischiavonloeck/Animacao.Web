import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Attacking,
  Hit
} from './playerStates.js'

export class Player {
  constructor(game) {
    this.game = game
    this.width = 176
    this.height = 182.6
    this.x = 0
    this.y = this.game.height - this.height - this.game.groundMargin
    this.vy = 0
    this.weight = 1
    this.image = document.getElementById('player')
    this.frameX = 0
    this.frameY = 0
    this.maxFrame
    this.fps = 10
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0
    this.speed = 0
    this.maxSpeed = 5
    this.states = [
      new Sitting(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
      new Attacking(this),
      new Hit(this)
    ]
    this.currentState = this.states[0]
    this.currentState.enter()
    this.isAttacking = false
    this.attackCounter = 0
    this.maxAttackCounter = 3
  }
  update(input, deltaTime) {
    this.checkCollision()
    this.currentState.handleInput(input)
    // movimento horizontal
    this.x += this.speed
    if (input.includes('d') && this.currentState !== this.states[5]) {
      this.speed = this.maxSpeed
    } else if (input.includes('a') && this.currentState !== this.states[5]) {
      this.speed = -this.maxSpeed
    } else {
      this.speed = 0
    }

    // limites horizontais
    if (this.x < 0) {
      this.x = 0
    }
    if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width
    }

    // movimento vertical
    this.y += this.vy
    if (!this.onGround()) {
      this.vy += this.weight
    } else {
      this.vy = 0
    }

    //sprites
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame) {
        this.frameX++
      } else {
        if (this.currentState === this.states[4]) {
          this.setState(states.RUNNING, 1)
        } else {
          this.frameX = 0
        }
      }
    } else {
      this.frameTimer += deltaTime
    }
  }
  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
    }
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin
  }
  setState(state, speed) {
    this.currentState = this.states[state]
    this.game.speed = this.game.maxSpeed * speed
    this.currentState.enter()
  }
  checkCollision() {
    this.game.enemies.forEach(enemy => {
      if (
        this.x + this.width > enemy.x &&
        this.x < enemy.x + enemy.width &&
        this.y + this.height > enemy.y &&
        this.y < enemy.y + enemy.height
      ) {
        enemy.markedForDeletion = true
        if (this.currentState === this.states[4]) {
          this.game.score++
        } else {
          this.setState(5, 0)
        }
      }
    })
  }
}
