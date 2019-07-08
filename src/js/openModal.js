import reviewForm from '../templates/review-form.hbs';
import { addReview } from './addReview';
import { formval } from './formval';
import { createPlacemark } from './createPlacemark';

export function openModal(obj, pagePixels, myMap, clusterer, placemarks, myPlacemark) {
    let reviewMain = document.querySelector('.review-main');

    reviewMain.innerHTML = reviewForm();

    reviewMain.style.display = 'block';
    
    if (obj.name != undefined) {
        const reviewList = document.querySelector('.review__list'),
            reviewItem = document.createElement('div');

        reviewItem.classList.add('review__item');

        reviewItem.innerHTML = '<div class="review__item-header"><div class="review__item-user"></div><div class="review__item-position"></div><div class="review__item-date"></div></div><div class="review__item-text"></div>';
        
        reviewList.appendChild(reviewItem);

        const reviewName = document.querySelector('.review__item-user'),
            reviewPlace = document.querySelector('.review__item-position'),
            reviewText = document.querySelector('.review__item-text');

        reviewName.innerHTML = obj.name;
        reviewPlace.innerHTML = obj.place;
        reviewText.innerHTML = obj.text;

    }

    console.log(myPlacemark);

    // адрес
    let reviewAddress = document.querySelector('.review__location');

    reviewAddress.innerText = obj.address;

    // показывает модалку рядом с кликом
    reviewMain.style.left = pagePixels[0] + 'px';
    reviewMain.style.top = pagePixels[1] + 'px';

    // добавить отзыв
    let buttonAdd = document.querySelector('.review-form__button');

    buttonAdd.addEventListener('click', function (e) {
        e.preventDefault();

        if (formval()) {

            addReview(obj, placemarks);

            createPlacemark(myMap, obj, clusterer, pagePixels, placemarks);
            
        }

    });

}