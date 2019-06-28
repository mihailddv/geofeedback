import reviewForm from '../templates/review-form.hbs';
// import { openPopup } from './openpopup.js';

function mapInit() {
  
    ymaps.ready(() => {
        let myMap = new ymaps.Map('map', {
            center: [55.75, 37.59], // Moscow
            zoom: 12
        })

        var placemarks = [];

        // Создаем собственный макет с информацией о выбранном геообъекте.
        var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
            // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
            '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
            '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
            '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
        );
        
        var clusterer = new ymaps.Clusterer({
            clusterDisableClickZoom: true,
            clusterOpenBalloonOnClick: true,
            // Устанавливаем стандартный макет балуна кластера "Аккордеон".
            clusterBalloonContentLayout: 'cluster#balloonAccordion',
            // Устанавливаем собственный макет.
            clusterBalloonItemContentLayout: customItemContentLayout,
            // Устанавливаем режим открытия балуна. 
            // В данном примере балун никогда не будет открываться в режиме панели.
            clusterBalloonPanelMaxMapArea: 0,
            // Устанавливаем размеры макета контента балуна (в пикселях).
            clusterBalloonContentLayoutWidth: 250,
            clusterBalloonContentLayoutHeight: 200,
            // Можно отключить отображение иконок геообъектов в списке. 
            // В браузере Internet Explorer ниже 9й версии иконки никогда не будут отображаться.
            // clusterBalloonAccordionShowIcons: false
        });

        clusterer.add(placemarks);
        myMap.geoObjects.add(clusterer);
        
        myMap.events.add('click', function(e) {
            var coords = e.get('coords');
            var geoCoords = ymaps.geocode(coords);
            var position = e.get('position');

            let pagePixels = e.get('pagePixels'),
                reviewMain = document.querySelector('.review-main');            
        
            geoCoords.then(res => {
                var obj = {};
                
                var firstGeoObject = res.geoObjects.get(0);
                var address = firstGeoObject.properties.get('name')+", "+firstGeoObject.properties.get('description');
                

                obj.coords = coords; // записываем координаты клика в объект
                obj.address = res.geoObjects.get(0).properties.get('text'); // получаем адрес

                // const htmlReview = reviewForm();
    
                reviewMain.innerHTML = reviewForm();

                reviewMain.style.display = 'block';

                // показывает модалку рядом с кликом
                reviewMain.style.left = pagePixels[0]+'px';
                reviewMain.style.top = pagePixels[1]+'px';
                
                // адрес
                let reviewAddress = document.querySelector('.review__location');
                
                reviewAddress.innerText = address;
                        
                // openPopup(obj, myMap, position, clusterer, ''); // передаешь в функцию открытия модалки объект, карту, кластер (который сам создашь выше), позицию и hintContent (пока он пустой)
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
