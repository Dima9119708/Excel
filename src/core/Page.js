export class Page {
  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw new Error('Ошибка метода')
  }

  afterRender() {

  }

  destroy() {

  }
}
