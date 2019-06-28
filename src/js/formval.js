import { clearForm } from './clearform';

export function formval(confirm) {
    let reviewName = document.querySelector('.review__input-name'),
        reviewPlace = document.querySelector('.review__input-place'),
        reviewText = document.querySelector('.review__input-text');

    if (reviewName.value === '' || reviewPlace.value === '' || reviewText.value === '') {
        alert('Не все поля заполнены')
    } else {
        confirm = true;
        clearForm();
    }

    return confirm;
}