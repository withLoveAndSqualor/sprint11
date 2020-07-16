export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }
 
  getCards() {
    return fetch(`${this.url}/cards`, {
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