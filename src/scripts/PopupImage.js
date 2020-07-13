class PopupImage {
  constructor (elem, placesList){
    this.elem = elem;
    this.placesList = placesList;
  }

  open (link) {
    const imageZoom = this.elem;
    const imageZoomPic = imageZoom.querySelector('.image-zoom__picture');
    imageZoomPic.setAttribute('src', link);
    this.placesList.append(this.elem);
  }
}