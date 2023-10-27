export class InputHandler {
  constructor(game) {
    this.game = game
    this.keys = []
    window.addEventListener('keydown', event => {
      console.log(event.key)
      if (
        (event.key === 's' ||
          event.key === 'w' ||
          event.key === 'a' ||
          event.key === 'd' ||
          event.key === ' ') &&
        this.keys.indexOf(event.key) === -1
      ) {
        this.keys.push(event.key)
      } else if (event.key === 'h') {
        this.game.debug = !this.game.debug
      }
    })
    window.addEventListener('keyup', event => {
      const index = this.keys.indexOf(event.key)
      if (index !== -1) {
        this.keys.splice(index, 1)
      }
    })
  }
}
