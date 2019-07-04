export function openBalloon(clusterer, obj, myMap) {

    let reviewMain = document.querySelector('.review-main');

    clusterer.events.add('click', () => {
        reviewMain.style.display = 'none';
    })
}