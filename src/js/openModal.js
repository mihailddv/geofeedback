import reviewForm from '../templates/review-form.hbs';
import { addReview } from './addReview';
import { formval } from './formval';
import { createPlacemark } from './createPlacemark';

export function openModal(obj, address, pagePixels, myMap, clusterer) {
    let reviewMain = document.querySelector('.review-main');
      
    reviewMain.innerHTML = reviewForm();

    reviewMain.style.display = 'block';
    
    const reviewList = document.querySelector('.review__list'),
        reviewItem = document.createElement('div');

    reviewList.innerHTML = '';

    reviewList.appendChild(reviewItem);

    reviewItem.classList.add('review__item');

    reviewItem.innerHTML = '<div class="review__item-header"><div class="review__item-user"></div><div class="review__item-position"></div><div class="review__item-date"></div></div><div class="review__item-text"></div>';
    
    const reviewName = document.querySelector('.review__item-user'),
        reviewPlace = document.querySelector('.review__item-position'),
        reviewText = document.querySelector('.review__item-text');

    if (obj.name != undefined) {
        reviewName.innerHTML = obj.name;
    }
    if (obj.place != undefined) {
        reviewPlace.innerHTML = obj.place;
    }
    if (obj.text != undefined) {
        reviewText.innerHTML = obj.text;
    }
    
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