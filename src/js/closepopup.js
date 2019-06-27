export function closePopup() {
    document.addEventListener('click', function(e) {
        const reviewMain = document.querySelector('.review-main'),
            reviewClose = document.querySelector('.review__close');

        let currentElem = e.target;        

        if (currentElem == reviewClose) {
            reviewMain.style.display = 'none';
        }
    })
}