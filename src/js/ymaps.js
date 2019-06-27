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

            let pagePixels = e.get('pagePixels'),
                reviewMain = document.querySelector('.review-main');            
        
            geoCoords.then(res => {
                var obj = {};
                
                var firstGeoObject = res.geoObjects.get(0);
                var address = firstGeoObject.properties.get('name')+", "+firstGeoObject.properties.get('description');
                
                let reviewAddress = document.querySelector('.review__location');

                obj.coords = coords; // записываем координаты клика в объект
                obj.address = res.geoObjects.get(0).properties.get('text'); // получаем адрес

                const htmlReview = reviewForm();

                reviewMain.style.display = 'block';
    
                reviewMain.innerHTML = htmlReview;

                // показывает модалку рядом с кликом
                reviewMain.style.left = pagePixels[0]+'px';
                reviewMain.style.top = pagePixels[1]+'px';

                console.log(obj);                

                // адрес в заголовок формы       
                // reviewAddress.innerText = address;
                        
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
