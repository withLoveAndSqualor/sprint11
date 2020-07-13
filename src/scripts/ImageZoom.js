class ImageZoom {

  static markupZoom = `
  <div class="image-zoom">
      <div class="image-zoom__content">
        <img src="./images/close.svg" alt="" class="image-zoom__close">
        <img alt="" class="image-zoom__picture">
      </div>
    </div>
  </div>
  `;

  constructor(){
  }

  createZoom = () => {
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', ImageZoom.markupZoom);
    this.zoom = element.firstElementChild;
    const zoomCross = element.querySelector('.image-zoom__close');
    zoomCross.addEventListener('click', this.closeZoom);
    return this.zoom;
  }

  /*openZoom = (link) => {
    const newZoom = this.createZoom();
    this.container.append(newZoom);
    const imageZoomPic = newZoom.querySelector('.image-zoom__picture');
    imageZoomPic.setAttribute('src', link);
  }*/

  closeZoom = () => {
    this.zoom.remove();
  }
}