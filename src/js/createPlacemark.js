import { openModal } from './openModal';

export function createPlacemark(myMap, obj, clusterer, address, pagePixels) {
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

    myPlacemark.events.add('click', () => {
        openModal(obj, address, pagePixels, myMap, clusterer);
    })
}