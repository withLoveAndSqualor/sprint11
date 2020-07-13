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

  const config = {
    url: 'https://praktikum.tk/cohort11',
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

  const zoomElement = function (){
    const newZoom = new ImageZoom();
    return newZoom.createZoom();
  }

  

  const imagePopup = new PopupImage(zoomElement(), placesList);
  function setImagePopup (link){
    imagePopup.open(link);
  }  

  api.getUserData()
    .then( res =>
      userInfo.renderInitialUser(res)
    )
    .catch(err => console.log(err))
  
  api.getCards()
    .then( res => {
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
   console.log(userName,userJob)
    api.serverUpdateUser(userName, userJob)
    .then((res)=> {
      /*
        Можно лучше: сервер возвращает обновленные данные, нужно использовать их и метод renderInitialUser
      */
      api.getUserData();
      userInfo.updateUserInfo();
      userPopup.close();     
    })
    .catch(err => console.log(err));       
  })

  placeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newPlaceData = {name: placeName.value, link: placeLink.value };
    const newPlaceCard = function () {
      const newPlace = new Card(newPlaceData, setImagePopup);
      return newPlace.create();
    }
    const updatePlacesList = new CardList(placesList, newPlaceCard);
    updatePlacesList.saveCard({name: placeName, link: placeLink}, api);
    placeAddPopupClose();
    placeName.value = '';
    placeLink.value = '';
  })

  userFormCheck.setEventListeners();
  placeFormCheck.setEventListeners();
})();

/*

  Неплохая работа, класс Api создан, запросы отправляются и данные пользователя сохраняются на сервере
  Но к организации обмена есть несколько замечаний:

  Надо исправить:
  + в классе Api сделать отдельные методы для каждого запроса
  + в конструктор класса Api передавать только базовый адрес сервера, а
    адрес ендпоинта добавлять в самом методе запроса
  + не нужно создавать несколько экземпляров класса Api, если исправить предыдущие замечания можно обойтись одним экземпляром
  + класс Api не должен заниматься отрисовкой на странице, его задача только
    отправка запросов на сервер и возврат ответа сервера
  + за обновление данных пользователя на странице отвечает класс UserInfo
    для этого необходимо сделать в этом классе соответсвующий метод
  + не нужно создавать экземпляр класса CardList каждый раз когда нужно им воспользоваться, создавать
    его один раз, а данные карточек передавать не в конструктор, а в метод render
  + все изменения на странице должны происходить, только после того, как сервер ответил подтверждением
  + если файл script copy.js больше не требуется в проекте, следует его удалить

  Можно лучше: 
  - проверка ответа сервера и преобразование из json дублируется во всех методах 
    класса Api, лучше вынести в отдельный метод

*/

/*
  Отлично, все замечания исправлены

  Можно лучше: сервер возвращает обновленные данные, нужно использовать их и метод renderInitialUser

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/



