'use strict';
/**
* @description Represents a location
* @constructor
* @param {object} data - The data object which represents a venue(fetched from foursquare)
*/
var Location = function (data) {
    var self = this;
    this.name = ko.observable(data.name);
    this.marker = data.marker;
    this.onItemClicked = function () {
        animateMarker(self.marker);
        createInfoWindow(self.marker);
    };
};

var ViewModel = function () {
    var self = this;
    this.filtertext = ko.observable("");
    this.errortext = ko.observable("");
    this.locationList = ko.observableArray();
    this.filteredList = ko.computed(function () {
        return ko.utils.arrayFilter(self.locationList(), function (location) {
            if (self.filtertext() === "") {
                toggleMarker(location.marker, true);
                return location;
            } else {
                if (location.name().toLowerCase().includes(self.filtertext().toLowerCase())) {
                    toggleMarker(location.marker, true);
                    return location;
                } else {
                    toggleMarker(location.marker, false);
                }
            }
        });
    });

    this.iferror = ko.computed(function () {
        if (self.errortext() !== "") {
            return true;
        } else {
            return false;
        }
    });
};
var vm = new ViewModel();
ko.applyBindings(vm);

