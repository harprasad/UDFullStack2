var map;
var mapcetner;
var service;
var placesArray = [];
var markerArray = [];
function initMap() {
    mapcetner = new google.maps.LatLng(-33.8665433,151.1956316);
    map = new google.maps.Map(document.getElementById('map'),{
    center:mapcetner,
    zoom: 13
  });
  GetPlaces();
}

var GetPlaces = function () {
  var request = {
    location: mapcetner,
    radius: '500',
  };
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      placesArray.push(place);
      vm.locationList.push(new Location(place));
      createMarker(results[i]);
    }
  }
}

function createMarker (place){
  var marker = new google.maps.Marker({
    position:place.geometry.location,
    map:map,
    title:place.name,
    markerid:place.id,
  });
  markerArray.push(marker);
}

function ToggleMarker(markerid,val)
{
  markerArray.forEach(element => {
    if(element.markerid == markerid){
      if(!val){
        element.setMap(null);
      }
      else{
        element.setMap(map);
      }
    }
  });
}

function AnimateMarker(markerid)
{
  markerArray.forEach(element => {
    if(element.markerid == markerid){
      element.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        element.setAnimation(null);
      }, 3000);
    }
  });
}

function CreateInfoWindow(markerid)
{
  
}

