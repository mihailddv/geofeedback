export function closePopup() {
    document.addEventListener('click', function(e) {
        const reviewMain = document.querySelector('.review-main');

        let reviewClose = document.querySelector('.review__close'),
            currentElem = e.target;        

        if (currentElem == reviewClose) {
            reviewMain.style.display = 'none';
        }
    })
}