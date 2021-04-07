import galleryItems from "./gallery-items.js";

const galleryContainerRef = document.querySelector('.js-gallery');
const modalWindowRef = document.querySelector('.js-lightbox');
const lightboxImageRef = modalWindowRef.querySelector('.lightbox__image');
const galleryMarkup = createGalleryCardsMarkup(galleryItems);

galleryContainerRef.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainerRef.addEventListener('click', onGalleryContainerClick);

function createGalleryCardsMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
                <li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
            <img
            loading="lazy"
            class="gallery__image lazyload"
            data-src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
        </li>
        `;
    })
    .join('');
}

function onGalleryContainerClick(event) {
  event.preventDefault();

    if (!event.target.classList.contains('gallery__image')) {
        return;
    }
  const galleryImage = event.target;
 
  return galleryImage.dataset.source;
}

const galleryElementsRef = document.querySelectorAll('.gallery__item');
galleryElementsRef.forEach(element => {
  element.addEventListener('click', onGalleryElementClick);
})

function onGalleryElementClick() {
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onRightArrorKeyClick); 
  window.addEventListener('keydown', onLeftArrowKeyClick);
  modalWindowRef.classList.add('is-open');
  lightboxImageRef.src = onGalleryContainerClick(event);

}

const modalCloseBtnRef = document.querySelector('[data-action="close-lightbox"]');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');

modalCloseBtnRef.addEventListener('click', onCloseModal);
lightboxOverlayRef.addEventListener('click', onLightboxOverlayClick);

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onRightArrorKeyClick);
  window.removeEventListener('keydown', onLeftArrowKeyClick);
  modalWindowRef.classList.remove('is-open');
  lightboxImageRef.src = '';
}

function onLightboxOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal()
  }
}

function onEscKeyPress(evt) {
  if (evt.code === "Escape") {
    onCloseModal()
  }
}

/*Slider (it doesn't work properly, the slides jump randomly. I can't get how to fix it :(( ) */

const nextSlideBtnRef = document.querySelector('.next-slide');
const prevSlideBtnRef = document.querySelector('.prev-slide');
const allImagesRef = document.querySelectorAll('.gallery__image');
let index = 0;

nextSlideBtnRef.addEventListener('click', onNextSlideBtnClick);
prevSlideBtnRef.addEventListener('click', onPrevSlideBtnClick);

function onRightArrorKeyClick(evt) {
  if (evt.code === "ArrowRight") {
    onNextSlideBtnClick()
  }
}

function onLeftArrowKeyClick(evt) {
  if (evt.code === "ArrowLeft") {
    onPrevSlideBtnClick()
  }
}

function onNextSlideBtnClick() {
  if (index === allImagesRef.length - 1) {
    index = 0;
  } else {
    index++;
  }
  changeSlide();

}

function onPrevSlideBtnClick() {
  if (index === 0) {
    index = allImagesRef.length - 1;
  } else {
    index--;
  }
  changeSlide();
}

function changeSlide() {
  
  lightboxImageRef.src = allImagesRef[index].dataset.source;
}


/* Lazy loading (Sorry for the preview images quality, didn't know how to get them from pixabay with width of 340px, so used 150px :) ) */

if ('loading' in HTMLImageElement.prototype) {
  addSrcAttrToLazyImages();
} else {
  addLazySizesScript();
}
function addLazySizesScript() {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  script.integrity = 'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
  script.crossOrigin = 'anonymous';

  document.body.appendChild(script);
}

function addSrcAttrToLazyImages() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  lazyImages.forEach(img => {
    img.src = img.dataset.src;
  });
}