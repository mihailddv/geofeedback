import reviewForm from '../templates/review-form.hbs';
import { addReview } from './addReview';
import { formval } from './formval';
import { createPlacemark } from './createPlacemark';

export function openModal(obj, address, pagePixels, myMap, clusterer) {
    let reviewMain = document.querySelector('.review-main');
      
    reviewMain.innerHTML = reviewForm();

    reviewMain.style.display = 'block';
    
    // адрес
    let reviewAddress = document.querySelector('.review__location');

    reviewAddress.innerText = address;

    // показывает модалку рядом с кликом
    reviewMain.style.left = pagePixels[0] + 'px';
    reviewMain.style.top = pagePixels[1] + 'px';

    // добавить отзыв
    let buttonAdd = document.querySelector('.review-form__button');

    buttonAdd.addEventListener('click', function (e) {
        e.preventDefault();

        if (formval()) {

            addReview(obj);

            createPlacemark(myMap, obj, clusterer, address, pagePixels);
            
        }

    });
    
}