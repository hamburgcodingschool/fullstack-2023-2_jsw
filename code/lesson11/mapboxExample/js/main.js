// This key does not work and is here only for an example
// Get your own key with a free account at MapBox (No Credit Card required)
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsZGVyaGNzIiwiYSI6ImNsangzNjN3dTAwaWszZG4ydfoigjdfoigjhgihjQ.Zo10zzwEUM7NghjRG6Am3w';

const map = new mapboxgl.Map({
    container: 'myMapBox',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-8.62002, 41.11271],
    zoom: 10,
});

const popup1 = new mapboxgl.Popup({ offset: 25 }).setHTML(
    `<h2>PORTO</h2><a href="./porto.html">Goto Page</a>`
);

const marker1 = new mapboxgl.Marker();
marker1.setLngLat([-8.62002, 41.11271]);
marker1.setPopup(popup1);

marker1.addTo(map);

// marker1.getElement().addEventListener('click', () => {
//     window.location = "./porto.html";
// });

const marker2 = new mapboxgl.Marker({
    color: 'black',
    rotation: 45,
    draggable: true
});
marker2.setLngLat([-8.7, 41.11271]);
marker2.addTo(map);;