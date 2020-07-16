export class FormValidator {

  static errorMessages = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    wrongUrl: 'Здесь должна быть ссылка',
  }

  constructor(form) {
    this.form = form;
  }

  getErrorMessage = () => {
    return this.form.querySelector(`#${this.input.id}-error`);
  }

  checkInputValidity = () => {
    
    if (this.input.validity.valid) {
      this.getErrorMessage().textContent = "";
      return true;
    }

    if (this.input.validity.tooShort || this.input.validity.tooLong) {
      this.getErrorMessage().textContent = FormValidator.errorMessages.wrongLength;
      return false;
    }

    if (this.input.validity.valueMissing) {
      this.getErrorMessage().textContent = FormValidator.errorMessages.empty;
      return false;
    }
    if (this.input.validity.typeMismatch && this.input.type === 'url') {
      this.getErrorMessage().textContent = FormValidator.errorMessages.wrongUrl;
      return false;
    }
    return true;
  }

  setSubmitButton = (button, state) => {
    if (!state) {

      button.setAttribute('disabled', 'true');

    } else {
      button.removeAttribute('disabled');
    }
  }


  sendToValidate = (event) => {
    this.input = event.target;

    this.checkInputValidity();
    const state = this.form.checkValidity();

    this.setSubmitButton(this.form.elements.button, state);
  }

  
  setEventListeners = () => {
    this.form.addEventListener('input', (event) => this.sendToValidate(event))
  }
}