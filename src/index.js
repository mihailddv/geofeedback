import { mapInit, createPlacemark } from './js/ymaps';
import { addReview } from './js/addReview';
import { closePopup } from './js/closepopup';

window.onload = mapInit();

// let review = document.querySelector('.review'),
//     reviewClose = document.querySelector('.review__close');

// reviewClose.addEventListener('click', function () {
//     review.style.display = 'none';
// });

export let allReviews = {
    reviews: [] 
};


closePopup();