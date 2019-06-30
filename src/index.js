import { mapInit, createPlacemark } from './js/ymaps';
import { closePopup } from './js/closepopup';

window.onload = mapInit();

export let allReviews = {
    items: [] 
};

closePopup();
