import { openModal } from './openModal';

export function createPlacemark(myMap, obj, clusterer, pagePixels, popup) {

    var myPlacemark = new ymaps.Placemark(obj.coords, {
        // hintContent: obj.coords,
        hintContent: popup.children[1].lastChild.innerHTML,
        balloonContent: obj.address + popup.children[1].lastChild.innerHTML
        // balloonContentHeader: [obj.name, obj.place],
        // balloonContentBody: obj.text,
        // balloonContentFooter: '<span class="balloon__link">' + obj.address + '</span>',
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false,
        openHintOnHover: false,
        hasBalloon: false
    });

    clusterer.add(myPlacemark);

    myMap.geoObjects.add(clusterer);

    myPlacemark.events.add('click', () => {

        openModal(obj, myMap, clusterer, pagePixels, myPlacemark.properties._data.hintContent);
        
    })    

    // console.log(myPlacemark.properties._data.hintContent);
}