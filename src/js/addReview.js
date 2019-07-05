import { clearForm } from './clearform';

export function addReview(obj) {

    const reviewList = document.querySelector('.review__list'),
        reviewItem = document.createElement('div'),
        reviewInputName = document.querySelector('.review__input-name'),
        reviewInputPlace = document.querySelector('.review__input-place'),
        reviewInputText = document.querySelector('.review__input-text');

    reviewList.appendChild(reviewItem);

    reviewItem.classList.add('review__item');

    reviewItem.innerHTML = '<div class="review__item-header"><div class="review__item-user"></div><div class="review__item-position"></div><div class="review__item-date"></div></div><div class="review__item-text"></div>';

    let lastReview = reviewList.lastChild;

    const reviewName = lastReview.querySelector('.review__item-user'),
        reviewPlace = lastReview.querySelector('.review__item-position'),
        reviewText = lastReview.querySelector('.review__item-text');

    reviewName.innerHTML = reviewInputName.value;
    reviewPlace.innerHTML = reviewInputPlace.value;
    reviewText.innerHTML = reviewInputText.value;
    
    obj.name = reviewInputName.value;
    obj.place = reviewInputPlace.value;
    obj.text = reviewInputText.value;
    
    clearForm();

}