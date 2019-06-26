import reviewForm from '../templates/review-form.hbs';
// import { openPopup } from './openpopup.js';

function mapInit() {
  
    ymaps.ready(() => {
        let myMap = new ymaps.Map('map', {
            center: [55.75, 37.59], // Moscow
            zoom: 12
        })
        
        myMap.events.add('click', function(e) {
            var coords = e.get('coords');
            var geoCoords = ymaps.geocode(coords);
            var position = e.get('position');
        
            geoCoords.then(res => {
                var obj = {};
          
                obj.coords = coords; // записываем координаты клика в объект
                obj.address = res.geoObjects.get(0).properties.get('text'); // получаем адрес

                // console.log(obj.coords);
                // console.log(obj.address);

                // let review = document.querySelector('.review');
                // review.style.display = 'block';
          
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
