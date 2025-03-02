// console.log("wellcome to clint side");
// const locations = JSON.parse(document.getElementById('map').dataset.locations);
// console.log(locations);

// mapboxgl.accessToken = 'pk.eyJ1IjoiZmFybWFuY3MyMDI0IiwiYSI6ImNtN2x5N3BsNzBoNzcyaXNkaGg1cTV3aTkifQ.ZkdHSHSNrpFR0Ii3RV6aQg';
// const map = new mapboxgl.Map({
//    container: 'map',
//    style: 'mapbox://styles/farmancs2024/cm7ls402a00c901sb05h03kn7',
//    center: [-112.987418, 37.198125],
//    zoom: 9 // starting zoom
// });


// const mapboxgl = require('mapbox-gl')
console.log("Welcome to client side");
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
   'pk.eyJ1IjoiZmFybWFuY3MyMDI0IiwiYSI6ImNtN2x5N3BsNzBoNzcyaXNkaGg1cTV3aTkifQ.ZkdHSHSNrpFR0Ii3RV6aQg';

//pk.eyJ1IjoiZmFybWFuY3MyMDI0IiwiYSI6ImNtN2x5N3BsNzBoNzcyaXNkaGg1cTV3aTkifQ.ZkdHSHSNrpFR0Ii3RV6aQg
const map = new mapboxgl.Map({
   container: 'map', // container ID
   style: 'mapbox://styles/mapbox/streets-v12', // style URL
   center: [-74.5, 40], // starting position [lng, lat]
   zoom: 9, // starting zoom
});

// mapboxgl.accessToken = 'pk.eyJ1IjoiZmFybWFuY3MyMDI0IiwiYSI6ImNtN2x5N3BsNzBoNzcyaXNkaGg1cTV3aTkifQ.ZkdHSHSNrpFR0Ii3RV6aQg';

// const map = new mapboxgl.Map({
//    container: 'map',
//    style: 'mapbox://styles/farmancs2024/cm7ls402a00c901sb05h03kn7',
//    center: [-112.987418, 37.198125],
//    zoom: 9
// });
