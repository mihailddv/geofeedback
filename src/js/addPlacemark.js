export function addPlacemark() {
    let reviewName = document.querySelector('.review__input-name'),
        reviewPlace = document.querySelector('.review__input-place'),
        reviewText = document.querySelector('.review__input-text');

    let newReview = {
        name: reviewName.value,
        place: reviewPlace.value,
        text: reviewText.value
    }
}