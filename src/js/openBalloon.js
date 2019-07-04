export function openBalloon(clusterer, obj, myMap, coords) {

    let reviewMain = document.querySelector('.review-main');

    clusterer.events.add('click', () => {
        reviewMain.style.display = 'none';
    })
    
}