import { mapInit, createPlacemark } from './js/ymaps';

window.onload = mapInit();

let review = document.querySelector('.review'),
    reviewClose = document.querySelector('.review__close');

reviewClose.addEventListener('click', function () {
    review.style.display = 'none';
});

