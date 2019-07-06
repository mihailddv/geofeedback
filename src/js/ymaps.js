// import reviewForm from '../templates/review-form.hbs';
// import { openBalloon } from './openBalloon';
import { openModal } from './openModal';
import { balloonLink } from './balloonLink';

function mapInit() {

    ymaps.ready(() => {
        let myMap = new ymaps.Map('map', {
                center: [55.75, 37.59], // Moscow
                zoom: 16
            }, {
                searchControlProvider: 'yandex#search'
            }),
            // Метка, содержимое балуна которой загружается с помощью AJAX.
            placemark = new ymaps.Placemark(myMap.getCenter(), {
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
        
        var obj = {},
            placemarks = {};

        myMap.events.add('click', function (e) {
            var coords = e.get('coords');
            var geoCoords = ymaps.geocode(coords);
            var position = e.get('position');

            let pagePixels = e.get('pagePixels');

            geoCoords.then(res => {

                var firstGeoObject = res.geoObjects.get(0);
                var address = firstGeoObject.properties.get('name') + ", " + firstGeoObject.properties.get('description');

                obj.coords = coords; // записываем координаты клика в объект
                obj.address = address; // получаем адрес
                        
                obj.comments = {
                    list: []
                };

                openModal(obj, pagePixels, myMap, clusterer, placemarks);

                balloonLink(obj, address, pagePixels, myMap, clusterer, placemarks);
                
            });

        });
        
    });

}

export {
    mapInit
}
