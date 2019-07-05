import reviewForm from '../templates/review-form.hbs';

export function openModal(obj, address, pagePixels) {
    let reviewMain = document.querySelector('.review-main');
      
    reviewMain.innerHTML = reviewForm();

    reviewMain.style.display = 'block';
    
    // адрес
    let reviewAddress = document.querySelector('.review__location');

    reviewAddress.innerText = address;

    // показывает модалку рядом с кликом
    reviewMain.style.left = pagePixels[0] + 'px';
    reviewMain.style.top = pagePixels[1] + 'px';
}