const map = new mapboxgl.Map({
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
accessToken: window.mapToken,
container: 'map', // container ID
center: window.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
zoom: 9 // starting zoom
});

const marker1 = new mapboxgl.Marker({color: 'red'})
.setLngLat(window.coordinates)
.setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<p>Exact location will be provided after booking</p>`))
.addTo(map);