import reviewForm from '../templates/review-form.hbs';
import { addReview } from './addReview';
// import { clearForm } from './clearform';
// import { openPopup } from './openpopup.js';
import { formval } from './formval';
import { addPlacemark } from './addPlacemark';
// import { placemarks } from './placemarks';

function mapInit() {

    ymaps.ready(() => {
        let myMap = new ymaps.Map('map', {
                center: [55.75, 37.59], // Moscow
                zoom: 16
            }, {
                searchControlProvider: 'yandex#search'
            }),
            // Метка, содержимое балуна которой загружается с помощью AJAX.
            placemark = new ymaps.Placemark([55.8, 37.72], {
                iconContent: "Узнать адрес",
                hintContent: "Перетащите метку и кликните, чтобы узнать адрес"
            }, {
                // Запретим замену обычного балуна на балун-панель.
                balloonPanelMaxMapArea: 0,
                draggable: "true",
                preset: "islands#blueStretchyIcon",
                // Заставляем балун открываться даже если в нем нет содержимого.
                openEmptyBalloon: true
            }),
            /**
             * Создадим кластеризатор, вызвав функцию-конструктор.
             * Список всех опций доступен в документации.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#constructor-summary
             */
            clusterer = new ymaps.Clusterer({
                /**
                 * Через кластеризатор можно указать только стили кластеров,
                 * стили для меток нужно назначать каждой метке отдельно.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
                 */
                preset: 'islands#invertedVioletClusterIcons',
                /**
                 * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
                 */
                groupByCoordinates: false,
                /**
                 * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
                 */
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
            }),
            /**
             * Функция возвращает объект, содержащий данные метки.
             * Поле данных clusterCaption будет отображено в списке геообъектов в балуне кластера.
             * Поле balloonContentBody - источник данных для контента балуна.
             * Оба поля поддерживают HTML-разметку.
             * Список полей данных, которые используют стандартные макеты содержимого иконки метки
             * и балуна геообъектов, можно посмотреть в документации.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
             */
            getPointData = function (index) {
                return {
                    balloonContentHeader: '<font size=3><b><a target="_blank" href="https://yandex.ru">Здесь может быть ваша ссылка</a></b></font>',
                    balloonContentBody: '<p>Ваше имя: <input name="login"></p><p>Телефон в формате 2xxx-xxx:  <input></p><p><input type="submit" value="Отправить"></p>',
                    balloonContentFooter: '<font size=1>Информация предоставлена: </font> балуном <strong>метки ' + index + '</strong>',
                    clusterCaption: 'метка <strong>' + index + '</strong>'
                };
            },
            /**
             * Функция возвращает объект, содержащий опции метки.
             * Все опции, которые поддерживают геообъекты, можно посмотреть в документации.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
             */
            getPointOptions = function () {
                return {
                    preset: 'islands#violetIcon'
                };
            },
            points = [],
            geoObjects = [];

        /**
         * Данные передаются вторым параметром в конструктор метки, опции - третьим.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
         */
        for (var i = 0, len = points.length; i < len; i++) {
            geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), getPointOptions());
        }

        /**
         * Можно менять опции кластеризатора после создания.
         */
        clusterer.options.set({
            gridSize: 80,
            clusterDisableClickZoom: true
        });
        
        var obj = {};
        
        obj.comments = {
            list: []
        };

        var myPlacemark = new ymaps.Placemark(obj.coords, {
            hintContent: obj,
            // balloonContentHeader: obj.comments.list[obj.comments.list.length - 1].place,
            // balloonContentBody: [obj.adress, obj.comments.list[obj.comments.list.length - 1].comment],
            // balloonContentFooter: obj.comments.list[obj.comments.list.length - 1].date
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: false,
            openHintOnHover: false,
            hasBalloon: false
        });

        myMap.events.add('click', function (e) {
            var coords = e.get('coords');
            var geoCoords = ymaps.geocode(coords);
            var position = e.get('position');

            let pagePixels = e.get('pagePixels'),
                reviewMain = document.querySelector('.review-main');

            geoCoords.then(res => {

                var firstGeoObject = res.geoObjects.get(0);
                var address = firstGeoObject.properties.get('name') + ", " + firstGeoObject.properties.get('description');

                obj.coords = coords; // записываем координаты клика в объект
                obj.address = res.geoObjects.get(0).properties.get('text'); // получаем адрес

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
                        // clusterer.add(myPlacemark);
                        // myMap.geoObjects.add(clusterer);

                        addReview();

                        addPlacemark(obj);

                        // placemarks(obj, myMap, position, clusterer);

                        console.log(myPlacemark);                        
                        
                    }

                });

            });
        });

        // Обрабатываем событие открытия балуна на геообъекте:
        // начинаем загрузку данных, затем обновляем его содержимое.
        placemark.events.add('balloonopen', function (e) {
            placemark.properties.set('balloonContent', "Идет загрузка данных...");

            // Имитация задержки при загрузке данных (для демонстрации примера).
            setTimeout(function () {
                ymaps.geocode(placemark.geometry.getCoordinates(), {
                    results: 1
                }).then(function (res) {
                    var newContent = res.geoObjects.get(0) ?
                        res.geoObjects.get(0).properties.get('name') :
                        'Не удалось определить адрес.';

                    // Задаем новое содержимое балуна в соответствующее свойство метки.
                    placemark.properties.set('balloonContent', newContent);
                });
            }, 1500);
        });

        myMap.geoObjects.add(placemark);

    });

}

// function createPlacemark(myMap, obj, clusterer) {
//     var myPlacemark = new ymaps.Placemark(obj.coords, {
//         hintContent: obj,
//         // balloonContentHeader: obj.comments.list[obj.comments.list.length - 1].place,
//         // balloonContentBody: [obj.adress, obj.comments.list[obj.comments.list.length - 1].comment],
//         // balloonContentFooter: obj.comments.list[obj.comments.list.length - 1].timestamp
//     }, {
//         preset: 'islands#violetDotIconWithCaption',
//         draggable: false,
//         openHintOnHover: false,
//         hasBalloon: false
//     });

//     // placemarks.push(myPlacemark);

//     clusterer.add(myPlacemark);

//     myMap.geoObjects.add(clusterer);

//     clusterer.events.add('click', e => {
//         console.log('test');
        
//         // pop.style = "display: none"
//     })
// }

function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
        // iconCaption: 'поиск...'
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false
    });
}

export {
    mapInit,
    createPlacemark
}
