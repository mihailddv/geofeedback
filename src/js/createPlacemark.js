import { openModal } from './openModal';

export function createPlacemark(myMap, obj, clusterer, pagePixels) {

    var myPlacemark = new ymaps.Placemark(obj.coords, {
        hintContent: myPlacemark,
        balloonContentHeader: [obj.name, obj.place],
        balloonContentBody: obj.text,
        balloonContentFooter: '<span class="balloon__link">' + obj.address + '</span>',
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false,
        openHintOnHover: false,
        hasBalloon: false
    });

    // placemarks.push(myPlacemark);

    clusterer.add(myPlacemark);

    myMap.geoObjects.add(clusterer);

    myPlacemark.events.add('click', () => {

        openModal(obj, pagePixels, myMap, clusterer, myPlacemark.properties._data.hintContent);
        
    })
}