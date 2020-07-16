export class Card {

  static markup = `
  <div class="place-card">
    <div class="place-card__image" style="background-image: url()">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name"></h3>
      <button class="place-card__like-icon"></button>
    </div>
  </div>
  `;  

  constructor(data, openZoomCallback) {
    this.data = data;
    this.openZoomCallback = openZoomCallback;
  }

  openZoom = () =>{
    this.openZoomCallback(this.data.link);
  }

  create() {
    const element = document.createElement('div');
    element.insertAdjacentHTML('beforeend', Card.markup);
    element.querySelector('.place-card__name').textContent = this.data.name;
    element.querySelector('.place-card__image').style.backgroundImage = `url(${this.data.link})`;
    this.card = element.firstElementChild;
    const likeIcon = element.querySelector('.place-card__like-icon');
    this.likeIcon = likeIcon;
    const deleteIcon = element.querySelector('.place-card__delete-icon');
    this.deleteIcon = deleteIcon;
    const placeImage = element.querySelector('.place-card__image');
    this.placeImage = placeImage;
    this.addEventListeners();
    return this.card;
  }

  addEventListeners() {
    this.likeIcon.addEventListener('click', this.like);
    this.deleteIcon.addEventListener('click', this.remove);
    this.placeImage.addEventListener('click', this.openZoom);
  }

  removeEventListeners(){
    this.likeIcon.removeEventListener('click', this.like);
    this.deleteIcon.removeEventListener('click', this.remove);
    this.placeImage.removeEventListener('click', this.openZoom);
  }


  like = () => {
    this.likeIcon.classList.toggle('place-card__like-icon_liked');
  }

  remove = () => {
    this.card.remove();
    this.removeEventListeners();
  }

}