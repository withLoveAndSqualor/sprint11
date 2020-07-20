export class CardList {

  constructor(container, cardsRender) {
    this.container = container; 
    this.cardsRender = cardsRender; 
  }

  addCard(data) {
    const card = this.cardsRender(data);
    this.container.append(card);
  }

  

  saveCard = (data, api) => {
    api.createCard(data.name, data.link)
      .then(() => {
        this.addCard(data)
      })
      .catch(err=> console.log(err))
  }

  render(res) {
    res.forEach(place => this.addCard(place));
  }
}