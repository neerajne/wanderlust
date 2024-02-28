mapboxgl.accessToken = mapToken;
let coordinates = listing.geometry.coordinates;

if (coordinates && coordinates.length <= 0) {
  coordinates = [78.9629, 20.5937];
}

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});


const marker1 = new mapboxgl.Marker({color:'red'})
.setLngLat(coordinates)
.setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h4><p> ${listing.location}</p><i>u will be here after booking</i></h4>`))
.addTo(map);


