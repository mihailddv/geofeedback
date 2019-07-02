import reviewForm from '../templates/review-form.hbs';
import { addReview } from './addReview';
// import { clearForm } from './clearform';
// import { openPopup } from './openpopup.js';
import { formval } from './formval';

function mapInit() {

    ymaps.ready(() => {
        let myMap = new ymaps.Map('map', {
            center: [55.75, 37.59], // Moscow
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        });

        var placemarks = [];

        myMap.events.add('click', function (e) {
            var coords = e.get('coords');
            var geoCoords = ymaps.geocode(coords);
            var position = e.get('position');

            let pagePixels = e.get('pagePixels'),
                reviewMain = document.querySelector('.review-main');

            geoCoords.then(res => {
                var obj = {};
                var myPlacemark;

                var firstGeoObject = res.geoObjects.get(0);
                var address = firstGeoObject.properties.get('name') + ", " + firstGeoObject.properties.get('description');

                obj.coords = coords; // записываем координаты клика в объект
                obj.address = res.geoObjects.get(0).properties.get('text'); // получаем адрес

                // const htmlReview = reviewForm();

                reviewMain.innerHTML = reviewForm();

                reviewMain.style.display = 'block';

                // показывает модалку рядом с кликом
                reviewMain.style.left = pagePixels[0] + 'px';
                reviewMain.style.top = pagePixels[1] + 'px';

                // адрес
                let reviewAddress = document.querySelector('.review__location');

                reviewAddress.innerText = address;

                // добавить отзыв
                let buttonAdd = document.querySelector('.review-form__button');

                buttonAdd.addEventListener('click', function (e) {
                    e.preventDefault();

                    if (formval()) {
                        myPlacemark = createPlacemark(coords);
                        myMap.geoObjects.add(myPlacemark);
                        // clusterer.add(placemarks);
                        // myMap.geoObjects.add(clusterer);

                        addReview();
                    }

                });

            });
        });

    });

}

function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
        // iconCaption: 'поиск...'
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: true
    });
}

export {
    mapInit,
    createPlacemark
}
