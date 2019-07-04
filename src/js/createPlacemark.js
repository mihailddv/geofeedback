export function createPlacemark(myMap, obj, clusterer) {
    var myPlacemark = new ymaps.Placemark(obj.coords, {
        hintContent: obj.coords,
        balloonContentHeader: [obj.name, obj.place],
        balloonContentBody: obj.text,
        balloonContentFooter: obj.address,
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false,
        openHintOnHover: false,
        hasBalloon: false
    });

    clusterer.add(myPlacemark);

    myMap.geoObjects.add(clusterer);
}