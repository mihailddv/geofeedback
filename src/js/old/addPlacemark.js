// import { mapInit } from './ymaps';

export function addPlacemark(obj) {

    let reviewName = document.querySelector('.review__input-name'),
        reviewPlace = document.querySelector('.review__input-place'),
        reviewText = document.querySelector('.review__input-text');

    let review = {}

    review.name = reviewName.value;

    review.place = reviewPlace.value;

    review.comment = reviewText.value;

    obj.comments.list.push(review);

    // console.log(review);
    
    // comBox.innerHTML = render(obj.comments);

    // createPlacemark(myMap, obj, clusterer);
}