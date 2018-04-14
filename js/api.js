'use strict';
var map;
var mapcetner;
var service;
//foursquare API credentials
var foursquare_id = 'W35PBHCZGBQP1GE1DVBVGHHCA00BPYKMVCKVCJ5BMZETFOJ3';
var foursquare_sec = 'NFSQQZSHTBQ230KCBYIHDSQMBD4RYDHF1MCJR23A1ACAGE4P';
var infowindow;
var logourl = 'images/foursquarelogo.png';

//Load Gmaps Script asynchronously 
$.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAD0_T4Q1n6On6mJj81Nb0jbtbUwGOF_1E&v=3&libraries=places&callback=initMap").fail(function () {
  vm.errortext("Error occured");
});


//callback function to handle google maps initialization
function initMap() {
  infowindow = new google.maps.InfoWindow({
    content: "",
  });
  mapcetner = new google.maps.LatLng(-33.8665433, 151.1956316);
  map = new google.maps.Map(document.getElementById('map'), {
    center: mapcetner,
    zoom: 19,
  });
  getPlaces();
}

//function to retrive nearby venues using foutrsquare API
var getPlaces = function () {

  var url = 'https://api.foursquare.com/v2/venues/search';
  var data = {
    client_id: foursquare_id,
    client_secret: foursquare_sec,
    ll: '-33.8665433,151.1956316',
    v: '20170801',
    limit: 15,
  };
  $.getJSON(url, data, callback).fail(function () { vm.errortext("Error occured") });
}

//callback function for  foursquare venue search 
function callback(data, status) {
  if (status == "success") {
    for (var i = 0; i < data.response.venues.length; i++) {
      var place = data.response.venues[i];
      var marker = createMarker(place);
      place.marker = marker;
      vm.locationList.push(new Location(place));
    }
  }
}

//function to create markers on map using googles Marker constructor 
//The locations are fetched using forsquare API
function createMarker(place) {
  var marker = new google.maps.Marker({
    position: { lat: place.location.lat, lng: place.location.lng },
    map: map,
    title: place.name,
    markerid: place.id,
    venue: place,
  });
  marker.addListener('click', function () {
    createInfoWindow(marker);
  })
  return marker;
}

//Function to enable and disable marker on map
//this function dorsn't delete markers it just disables/enables them them
function toggleMarker(marker, val) {
  if (!val) {
    marker.setMap(null);
  }
  else {
    marker.setMap(map);
  }
}

//This function makes a marker bounce for 3 seconds
function animateMarker(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(() => {
    marker.setAnimation(null);
  }, 3000);
}

//This function Creates an info window and populates it details of the venue such as
//photos and address details
function createInfoWindow(marker) {
  var url = 'https://api.foursquare.com/v2/venues/' + marker.markerid + '/photos';
  var data = { limit: 1, client_id: foursquare_id, client_secret: foursquare_sec, v: '20170801' };
  var contentString = '<h6>' + marker.venue.name + '</h6>';
  if (marker.venue.location.city !== undefined) {
    contentString += '<div>' + marker.venue.location.city + '</div>';
  }
  if (marker.venue.location.country !== undefined) {
    contentString += '<div>' + marker.venue.location.country + '</div>';
  }
  contentString += '<div><a href=' + '"' + "http://foursquare.com/v/" + marker.venue.id + '?ref=' + foursquare_id + '"' + '>More Details</a></div>'
  //get some photos
  $.getJSON(url, data, function (data, status) {
    if (status == 'success' && data.response.photos.count == 1) {
      var photourl = data.response.photos.items[0].prefix + '100x100' + data.response.photos.items[0].suffix;
      contentString += '<img src =';
      contentString += '"' + photourl + '"';
      contentString += '></img>' + '<br>';
      contentString += '<img src =';
      contentString += '"' + logourl + '"';
      contentString += ' style="max-width:100px"></img>';
      showInfoWindow(contentString, marker);
    }
    else {
      contentString += '<img src =';
      contentString += '"' + logourl + '"';
      contentString += ' style="max-width:100px"></img>';
      showInfoWindow(contentString, marker);
    }
  }).fail(function () { vm.errortext("Error occured") });
}

//Shows an info window
function showInfoWindow(content, marker) {
  infowindow.setContent(content);
  infowindow.open(map, marker);
}

