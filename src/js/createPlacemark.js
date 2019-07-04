export function createPlacemark(myMap, obj, clusterer) {
    var myPlacemark = new ymaps.Placemark(obj.coords, {
        hintContent: obj.coords,
        balloonContentHeader: obj.address,
        balloonContentBody: obj.address,
        balloonContentFooter: obj.address
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false,
        openHintOnHover: false,
        hasBalloon: false
    });

    // placemarks.push(myPlacemark);

    clusterer.add(myPlacemark);

    myMap.geoObjects.add(clusterer);

    // clusterer.events.add('click', () => {
        
        // let reviewMain = document.querySelector('.review-main');
        // reviewMain.style.display = 'none';
    // })
}