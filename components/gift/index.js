'use strict'

// Заранее подготовленный ответ сервера
const response = {
  res: true,
  giftId: 1
}

export default class Gift {
  constructor (options) {
    this.$el = document.getElementById(options.$el.replace('#', ''))

    this.$close = document.querySelector('.gift__close', this.$el)
    this.$title = document.querySelector('.gift__title', this.$el)
    this.$button = document.querySelector('.gift__action', this.$el)
    this.$desc = document.querySelector('.gift__description', this.$el)
    this.$image = document.querySelector('.gift__image', this.$el)

    this.$button.onclick = () => this.open()
    this.$close.onclick = () => this.close()
  }

  /**
   * Загрузка подарка
   *
   * @return {Promise.<void>}
   */
  async loading () {
    this.$button.innerText = 'Загрузка...'
    this.$button.classList.add('animated', 'bounce')

    const timer = setInterval(() => {
      this.$button.classList.remove('bounce')
      setInterval(() => this.$button.classList.add('bounce'), 100)
    }, 1000)

    await this.send()
    clearInterval(timer)
  }

  /**
   * Отправка запроса на получение подарка
   *
   * @return {Promise.<void>}
   */
  async send () {
    try {
      this.isLoading = true

      // Эмуляция запроса
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Получаем ответ запроса
          this.giftId = response.giftId
          resolve()
        }, 3500)
      })
      this.display()

    } catch (e) {
      alert(e)
    } finally {
      this.isLoading = false
    }
  }

  /**
   * Открывает подарок
   */
  open () {
    if (this.isLoading) return

    if (this.giftId) this.close()
    else this.loading()
  }

  /**
   * Закрывает подарок
   */
  close () {
    this.$el.remove()
  }

  /**
   * Показываем полученный подарок
   */
  display () {
    this.$image.setAttribute('src', `/images/gift${this.giftId}.png`)
    this.$image.classList.add('animated', 'bounceIn')
    this.$title.classList.add('hidden')
    this.$desc.innerText = 'Теперь подарок Ваш!'
    this.$button.innerText = 'Спасибо'
  }
}
