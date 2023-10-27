export class InputHandler {
  constructor() {
    this.keys = []
    window.addEventListener('keydown', event => {
      if (
        (event.key === 's' ||
          event.key === 'w' ||
          event.key === 'a' ||
          event.key === 'd' ||
          event.key === 'c') &&
        this.keys.indexOf(event.key) === -1
      ) {
        this.keys.push(event.key)
      }
      console.log(event.key, this.keys)
    })
    window.addEventListener('keyup', event => {
      const index = this.keys.indexOf(event.key)
      if (index !== -1) {
        this.keys.splice(index, 1)
      }
    })
  }
}
