import { mapInit, createPlacemark } from './js/ymaps';
import { closePopup } from './js/closepopup';

window.onload = mapInit();

let allReviews = {
    review: [
        {
            name: 'Тест',
            place: 'Тест2',
            date: '01.01.01',
            comment: 'Тест3',
            coords: ''
        }
    ] 
};

closePopup();
