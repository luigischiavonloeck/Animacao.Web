export class UI {
  constructor(game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'sans-serif'
  }
  draw(context){
    console.log(this.game.time)
    if (this.game.time < 3000){
      context.textAlign = 'center'
      context.font = `${this.fontSize * 2}px ${this.fontFamily}`
      context.fillStyle = '#000b'
      context.fillRect(0, 0, this.game.width, this.game.height)
      context.fillStyle = '#fff'
      context.fillText('Goal: 25 points', this.game.width / 2, this.game.height / 2)
    }
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.textAlign = 'left'
    context.fillStyle = this.game.fontColor

    //pontos
    context.fillText(`Score: ${this.game.score}`, 20, 50)
    context.fillText(`Lives: ${this.game.lifes}`, 20, 100)
    
    //tempo
    context.textAlign = 'right'
    context.fillText(`Game Time: ${23 - Math.floor(this.game.time / 1000)}`, this.game.width - 20, 50)

    //game over
    if (this.game.gameOver){
      this.game.sound.theme.pause()
      context.textAlign = 'center'
      context.font = `${this.fontSize * 2}px ${this.fontFamily}`
      context.fillStyle = '#000b'
      context.fillRect(0, 0, this.game.width, this.game.height)
      context.fillStyle = '#fff'
      if (this.game.score > 25){
        context.fillText('Victory!', this.game.width / 2, this.game.height / 2)
        this.game.sound.win.play()
      } else {
        if (this.game.lifes == 0){
          context.fillText('You are dead!', this.game.width / 2, this.game.height / 2)
        } else {
          context.fillText('Time is over!', this.game.width / 2, this.game.height / 2)
        }
        this.game.sound.loss.play()
      }
      context.font = `${this.fontSize * 0.7}px ${this.fontFamily}`
      context.fillText(`Score: ${this.game.score}`, this.game.width / 2, this.game.height / 1.8)
      context.fillText(`Lives: ${this.game.lifes}`, this.game.width / 2, this.game.height / 1.7)
      context.font = `${this.fontSize * 1}px ${this.fontFamily}`
      context.fillText('Press enter to restart', this.game.width / 2, this.game.height / 1.5)
      }
      
  }
}