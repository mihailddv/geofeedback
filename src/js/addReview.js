export function addReview(e) {

    let reviewName = document.querySelector('.review__input-name'),
        reviewPlace = document.querySelector('.review__input-place'),
        reviewText = document.querySelector('.review__input-text'),
        reviewNameValue = reviewName.value,
        reviewPlaceValue = reviewPlace.value, 
        reviewTextValue = reviewText.value;
    
    let buttonAdd = document.querySelector('.review-form__button');

    buttonAdd.addEventListener('click', function(event) {
        event.preventDefault;
    });
}