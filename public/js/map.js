// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
// mapboxgl.accessToken = mapToken;
//   const map = new mapboxgl.Map({
//     style:"mapbox://styles/mapbox/streets-v12",
//       container: 'map',
//       center: [ 79.52860000, 29.22254000], 
//       zoom: 9
//   });

  // console.log(coordinates)
  // const marker1 = new mapboxgl.Marker()
  // .setLngLat([12.554729, 55.70651])
  // .addTo(map);


  mapboxgl.accessToken = mapToken;
let coordinates = listing.geometry.coordinates;

if (coordinates && coordinates.length <= 0) {
  coordinates = [ 77.22445000 , 28.63576000 ];
}
console.log(coordinates);

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

 const marker1 = new mapboxgl.Marker({color:'red'})
  .setLngLat(coordinates)
  setPopup()
  .addTo(map);

  