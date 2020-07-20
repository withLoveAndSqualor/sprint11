import {Api} from './Api.js';
import {Card} from './Card.js';
import {CardList} from './CardList.js';
//import {initialCards} from './cards.js';
import {FormValidator} from './FormValidator.js';
import {ImageZoom} from './ImageZoom.js';
import {Popup} from './Popup.js';
import {PopupImage} from './PopupImage.js';
import {UserInfo} from './UserInfo.js';
import '../pages/index.css';
(function () {
  const placesList = document.querySelector('.places-list');

  const userPopupButton = document.querySelector('.user-info__data-button');
  const placePopupButton = document.querySelector('.user-info__button');
  const userPopup = new Popup(document.querySelector('#user-popup'));
  const placeAddPopup = new Popup(document.querySelector('#place-popup'));
  const userPopupCross = document.querySelector('#user-popup__close');
  const placePopupCross = document.querySelector('#place-popup__close');
  const userAddInfoButton = document.querySelector('.popup__button_user');
  const newPlaceButton = document.querySelector('.popup__button_place');

  const userInfoForm = document.forms.user;
  const userName = userInfoForm.elements.uName;
  const userJob = userInfoForm.elements.job;

  const nameString = document.querySelector('.user-info__name');
  const jobString = document.querySelector('.user-info__job');
  const photoElement = document.querySelector('.user-info__photo');

  const userInfo = new UserInfo(nameString, jobString, photoElement, userName, userJob);

  const placeForm = document.forms.new;
  const placeName = document.querySelector('#place');
  const placeLink = document.querySelector('#link');


  const userFormCheck = new FormValidator(userInfoForm);
  const placeFormCheck = new FormValidator(placeForm);

  const apiUrl = NODE_ENV==='production'? 'https://praktikum.tk/cohort11' : 'http://praktikum.tk/cohort11';
  const config = {
    url: apiUrl,
    headers: {
      authorization: '3d954387-3e55-47f5-bcd4-a5901c9c182b',
      'Content-Type': 'application/json'
    }
  };
  const api = new Api(config);

  function cardsRender(dataForElement) {
    const card = new Card(dataForElement, setImagePopup);
    return card.create();
  }

  const cardList = new CardList(placesList, cardsRender);

  const zoomElement = function () {
    const newZoom = new ImageZoom();
    return newZoom.createZoom();
  }



  const imagePopup = new PopupImage(zoomElement(), placesList);
  function setImagePopup(link) {
    imagePopup.open(link);
  }

  api.getUserData()
    .then(res =>
      userInfo.renderInitialUser(res)
    )
    .catch(err => console.log(err))

  api.getCards()
    .then(res => {
      cardList.render(res);
    })
    .catch(err => console.log(err))

  userPopupButton.addEventListener('click', () => {
    userPopup.open();
    userInfo.setUserInfo(nameString.textContent, jobString.textContent);
  })
  placePopupButton.addEventListener('click', () => {
    placeAddPopup.open();
  })

  userPopupCross.addEventListener('click', () => {
    userPopup.close();
    userInfoForm.querySelectorAll('.error').forEach(function (error) {
      if (error.textContent.length > 0) {
        error.textContent = '';
      }
    });

    userFormCheck.setSubmitButton(userAddInfoButton, true);
  })

  function placeAddPopupClose() {
    placeAddPopup.close();
    placeFormCheck.setSubmitButton(newPlaceButton, false);
  }

  placePopupCross.addEventListener('click', () => {
    placeAddPopupClose();
  })

  userInfoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(userName, userJob)
    api.serverUpdateUser(userName, userJob)
      .then((res) => {

        api.getUserData();
        userInfo.updateUserInfo();
        userPopup.close();
      })
      .catch(err => console.log(err));
  })

  placeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newPlaceData = { name: placeName.value, link: placeLink.value };
    const newPlaceCard = function () {
      const newPlace = new Card(newPlaceData, setImagePopup);
      return newPlace.create();
    }
    const updatePlacesList = new CardList(placesList, newPlaceCard);
    updatePlacesList.saveCard({ name: placeName, link: placeLink }, api);
    placeAddPopupClose();
    placeName.value = '';
    placeLink.value = '';
  })

  userFormCheck.setEventListeners();
  placeFormCheck.setEventListeners();
})();