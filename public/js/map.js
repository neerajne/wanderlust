// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
    style:"mapbox://styles/mapbox/streets-v12",
      container: 'map',
      center: [ 79.52860000, 29.22254000], 
      zoom: 9
  });

  console.log(coordinates)
  // const marker1 = new mapboxgl.Marker()
  // .setLngLat([12.554729, 55.70651])
  // .addTo(map);
