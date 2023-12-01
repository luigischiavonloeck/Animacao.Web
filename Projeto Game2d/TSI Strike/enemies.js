class Enemy {
  constructor() {
    this.frameX = 0
    this.frameY = 0
    this.fps = 20

    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0
    this.markedForDeletion = false
  }
  update(deltaTime) {
    //movimento
    this.x -= this.speedX + this.game.speed
    this.y += this.speedY
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame) {
        this.frameX++
      } else {
        this.frameX = 0
      }
    } else {
      this.frameTimer += deltaTime
    }

    // tira da tela
    if (this.x + this.width < 0) {
      this.markedForDeletion = true
    }
  }
  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
    }
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game) {
    super()
    this.game = game
    this.width = 96
    this.height = 96
    this.x = this.game.width + Math.random() * this.game.width * 0.5
    this.y = Math.random() * this.game.height * 0.5
    this.speedX = Math.random() + 1 + this.game.dif*5
    //this.speedX = 10
    this.speedY = 0
    this.maxFrame = 3
    // const img = Math.random() > 0.5 ? 'enemy_fly' : 'enemy_bat'
    const img = new Image()
    img.src = './enemies/enemy_fly2.png'
    this.image = img
    this.angle = 0
    this.va = Math.random() * 0.1 + 0.1
  }
  update(deltaTime) {
    super.update(deltaTime)
    this.angle += this.va
    this.y += Math.sin(this.angle)
  }
}

export class GroundEnemy extends Enemy {
  constructor(game) {
    super()
    this.game = game
    this.width = 96
    this.height = 96
    this.x = this.game.width
    this.y = this.game.height - this.height - this.game.groundMargin
    this.speedX = 0
    this.speedY = 0
    this.maxFrame = 3
    const img = new Image()
    img.src = './enemies/enemy_plant2.png'
    this.image = img
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game) {
    super()
    this.game = game
    //this.width = 217.3
    this.width = 97.3
    this.height = 144
    this.x = this.game.width
    this.y = Math.random() * this.game.height * 0.5
    const img = new Image()
    img.src = './enemies/enemy_spider.png'
    this.image = img
    this.speedX = 0
    //this.speedY = Math.random() > 0.5 ? 1 : -1
    this.speedY = Math.random() > 0.5 ? this.game.dif + 3 : -this.game.dif - 3
    //this.speedY = 5
    this.maxFrame = 2
  }
  update(deltaTime) {
    super.update(deltaTime)
    if (this.y > this.game.height - this.height - this.game.groundMargin) {
      this.speedY *= -1
    }
    if (this.y < -this.height) {
      this.markedForDeletion = true
    }
  }
  draw(context) {
    //super.draw(context)
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
    }
    context.drawImage(
      this.image,
      this.frameX * (this.width + 120) + 60,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
    context.beginPath()
    context.moveTo(this.x + this.width / 2, 0)
    context.lineTo(this.x + this.width / 2, this.y + 50)
    context.stroke()
  }
}
