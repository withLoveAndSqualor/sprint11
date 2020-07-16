export class UserInfo{
  constructor(nameString, jobString, photoElement, nameInput, jobInput){
    this.nameString = nameString;
    this.jobString = jobString;
    this.nameInput = nameInput;
    this.jobInput = jobInput;
    this.photoElement = photoElement;
  }

  setUserInfo = (name, job)=>{
    this.nameInput.value = name;
    this.jobInput.value = job;
  }
  
  renderInitialUser = (res) => {
    this.nameString.textContent = res.name;
    this.jobString.textContent = res.about;
    this.photoElement.setAttribute('style', `background-image: url(${res.avatar})`);
  }

  updateUserInfo = () => {
    this.nameString.textContent = this.nameInput.value;
    this.jobString.textContent = this.jobInput.value;
  }
}