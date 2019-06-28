// очищаем форму
export function clearForm() {

    let reviewName = document.querySelector('.review__input-name'),
        reviewPlace = document.querySelector('.review__input-place'),
        reviewText = document.querySelector('.review__input-text');

    reviewName.value = '';
    reviewPlace.value = '';
    reviewText.value = '';
}