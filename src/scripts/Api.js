class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }
 
  getCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
    /*
      Можно лучше: проверка ответа сервера и преобразование из json
      дублируется во всех методах класса Api, лучше вынести в отдельный метод:
        _getResponseData(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
        }
      Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
      не используется вне класса Api   
    */
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status)
        }
      })
  }

  getUserData() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })    
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status)
        }
      })
  }

  serverUpdateUser = (userName, userJob) => {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: userName.value,
        about: userJob.value
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status)
        }
      })
  }

  createCard(name, link) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name.value,
        link: link.value
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status)
        }
      })
  }
}