const previewImages = document.getElementsByClassName("preview");
const bigImageWrapper = document.querySelector(".central-slide");
const previewImagesWrapper = document.querySelector(".preview-slides");

const slideImageLeft = document.querySelector(".slide-left");//left
const slideImageRight = document.querySelector(".slide-right");//right

slideImageLeft.addEventListener("click", (event) => {//предыдущая картинка
  setNewImageRelativelyCurrent(-1);

});

slideImageRight.addEventListener("click", (event) => {//следующая картинка
  setNewImageRelativelyCurrent(1);
});


function setNewImageRelativelyCurrent(direction){
  var previewActiveImage = document.querySelector(".active");
  
  if(direction > 0){//следующая картинка
    var newActivePreviewDiv;
    var newActivePreviewImageSrc;

    if(previewActiveImage.nextElementSibling == null){//если уперлись в край берем первый от родителя
      newActivePreviewImageSrc = previewActiveImage.parentElement.firstElementChild.firstElementChild.src;
      newActivePreviewDiv = previewActiveImage.parentElement.firstElementChild;
    }
    else{
      newActivePreviewImageSrc = previewActiveImage.nextElementSibling.firstElementChild.src;
      newActivePreviewDiv = previewActiveImage.nextElementSibling;
    }
  }
  else{//предыдущая картинка    
    if(previewActiveImage.previousElementSibling == null){//если уперлись в край берем последний от родителя
      newActivePreviewImageSrc = previewActiveImage.parentElement.lastElementChild.firstElementChild.src
      newActivePreviewDiv = previewActiveImage.parentElement.lastElementChild;
    }
    else{
      newActivePreviewImageSrc = previewActiveImage.previousElementSibling.firstElementChild.src;
      newActivePreviewDiv = previewActiveImage.previousElementSibling;
    }
  }

  console.log("newActivePreviewImageSrc", newActivePreviewImageSrc);

  previewActiveImage.classList.remove("active");
  newActivePreviewDiv.classList.add("active");

  setUpNewBigImages(newActivePreviewImageSrc);
}


const setUpNewBigImages = (smallImageSrc) => {
  const bigImageSrc = smallImageSrc.replace("_small.jpg", "_big.jpg");
  console.log(smallImageSrc + " -> " + bigImageSrc);

  const newBigImage = document.createElement("img");
  newBigImage.src = bigImageSrc;

  newBigImage.onload = function () {
    console.log("requested picture exist. " + bigImageSrc);
    
    bigImageWrapper.innerHTML = "";
    bigImageWrapper.appendChild(newBigImage);
    };

  newBigImage.onerror = function () {
    console.log("Fail! requested picture not exist. " + bigImageSrc);
    bigImageWrapper.innerHTML = "Sorry, <br />this image not found";
  };

};

const setUpNewActivePreviewImage = (event) => {
  const activePreviewImage = document.querySelector(".preview-slides .active");
  activePreviewImage.classList.remove("active");

  event.target.parentElement.classList.add("active");
};

const galleryHandler = (event) => {
  if (event.target === event.currentTarget) return;

  setUpNewBigImages(event.target.src);
  setUpNewActivePreviewImage(event);
};

previewImagesWrapper.addEventListener("click", galleryHandler);
