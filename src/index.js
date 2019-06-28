import { mapInit, createPlacemark } from './js/ymaps';
import { addReview } from './js/addReview';
import { closePopup } from './js/closepopup';

window.onload = mapInit();

export let allReviews = {
    reviews: [] 
};

closePopup();