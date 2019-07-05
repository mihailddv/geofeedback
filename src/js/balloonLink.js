import { openModal } from './openModal';

export function balloonLink(obj, address, pagePixels, myMap, clusterer, placemarks) {
    document.addEventListener('click', function(e) {
        const ballonLinks = document.querySelector('.balloon__link');

        let currentElem = e.target;        

        if (currentElem == ballonLinks) {
            openModal(obj, address, pagePixels, myMap, clusterer, placemarks);
        }
    })

}