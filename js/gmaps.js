var map;
var mapcetner;
var service;
var markerArray = [];

var foursquare_id = 'XIKQL2ZXQN0VHJJ0NY4PF3GQ4BKTXFK5OCELBIR3TFWSUUI3';
var foursquare_sec  = 'G55D0TZVQFHHNEIXPUEG01ROMSXUQHHCT55F54OVJTW4Y1V1';
function initMap() {
  mapcetner = new google.maps.LatLng(-33.8665433, 151.1956316);
  map = new google.maps.Map(document.getElementById('map'), {
    center: mapcetner,
    zoom: 13
  });
  GetPlaces();
}

var GetPlaces = function () {

  var url = 'https://api.foursquare.com/v2/venues/search';
  var data = {
    client_id: foursquare_id,
    client_secret: foursquare_sec,
    ll: '-33.8665433,151.1956316',
    v: '20170801',
    limit: 15,
  };

  $.getJSON(url, data, callback);
}


function callback(data, status) {
  if (status == "success") {
    for (var i = 0; i < data.response.venues.length; i++) {
      var place = data.response.venues[i];
      vm.locationList.push(new Location(place));
      createMarker(place);
    }
  }
}




function createMarker(place) {
  var marker = new google.maps.Marker({
    position: { lat: place.location.lat, lng: place.location.lng },
    map: map,
    title: place.name,
    markerid: place.id,
    venue: place,
  });
  marker.addListener('click', function(){
    CreateInfoWindow(marker);
  })
  markerArray.push(marker);
}

function ToggleMarker(markerid, val) {
  markerArray.forEach(element => {
    if (element.markerid == markerid) {
      if (!val) {
        element.setMap(null);
      }
      else {
        element.setMap(map);
      }
    }
  });
}

function AnimateMarker(markerid) {
  markerArray.forEach(element => {
    if (element.markerid == markerid) {
      element.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        element.setAnimation(null);
      }, 3000);
    }
  });
}

function CreateInfoWindow(marker) {
  var url = 'https://api.foursquare.com/v2/venues/' + marker.markerid + '/photos';
  var data = { limit: 1, client_id : foursquare_id , client_secret : foursquare_sec , v: '20170801'};
  var contentString = '<h6>' + marker.venue.name + '</h6>' + '<div>' + marker.venue.location.city + '</div>' + '<div>' + marker.venue.location.country + '</div>';
  //get some photos
  $.getJSON(url, data, function (data, status) {
    if(status == 'success' && data.response.photos.count == 1){
      var photourl = data.response.photos.items[0].prefix + '100x100' + data.response.photos.items[0].suffix;
      contentString += '<img src =';
      contentString += '"'+ photourl +'"';
      contentString += '></img>';
      ShowInfoWindow(contentString,marker);
    }
    else{
      ShowInfoWindow(contentString,marker);
    }
  });
}

function ShowInfoWindow(content,marker)
{
  var infowindow = new google.maps.InfoWindow({
    content: content,
  });
  infowindow.open(map,marker );
}

