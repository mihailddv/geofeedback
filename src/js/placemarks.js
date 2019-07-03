import { mapInit } from './ymaps';

export function placemarks(obj, myMap, position, clusterer, popup) {
    var placemark = new ymaps.Placemark(obj.coords, {
        hintContent: popup.children[1].lastChild.innerHTML,
        balloonContent: obj.address + popup.children[1].lastChild.innerHTML // тут берем комментарии из innerHTML моей модалки и привязываем их к метке в ballonContent
    }, {
        preset: 'islands#darkOrangeDotIcon',
        openHintOnHover: false
    });

    myMap.geoObjects.add(placemark); // добавляем в геообъекты метку
    clusterer.add(placemark); // добавляем в кластер

    placemark.events.add('click', () => { // обрабатываем клик и вызываем функцию открытия/рендеринга окна
        openPopup(obj, myMap, position, clusterer, placemark.properties._data.hintContent); // последний аргумент, передаем как раз хитконтент, чтобы по клику на определенную марку, открывались комментарии, которые к ней привязанны. Соответственно в функции добавления комментария я комментарии беру из hintContent, только если это первичное нажатие на карту, то я передаю пустую строку, если это клик на метку, то вон я передаю hintContent
    
    })
}