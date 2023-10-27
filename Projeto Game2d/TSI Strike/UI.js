export class UI {
  constructor(game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'sans-serif'
  }
  draw(context){
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.textAlign = 'left'
    context.fillStyle = this.game.fontColor

    //pontos
    context.fillText(`Pontos: ${this.game.score}`, 20, 50)

    //tempo
    context.textAlign = 'right'
    context.fillText(`Tempo: ${Math.floor(this.game.time / 1000)}`, this.game.width - 20, 50)

    //game over
    if (this.game.gameOver){
      context.textAlign = 'center'
      context.font = `${this.fontSize * 2}px ${this.fontFamily}`
      context.fillStyle = '#000b'
      context.fillRect(0, 0, this.game.width, this.game.height)
      context.fillStyle = '#fff'
      if (this.game.score > 25){
        context.fillText('Vitória!', this.game.width / 2, this.game.height / 2)
      } else {
        context.fillText('GameOver!', this.game.width / 2, this.game.height / 2)
      }
      context.font = `${this.fontSize * 0.7}px ${this.fontFamily}`
      context.fillText(`Pontos: ${this.game.score}`, this.game.width / 2, this.game.height / 1.8)
      context.font = `${this.fontSize * 1}px ${this.fontFamily}`
      context.fillText('Pressione espaço para reiniciar', this.game.width / 2, this.game.height / 1.5)
      }
      
  }
}