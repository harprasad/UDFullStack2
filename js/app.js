var Location = function(data){
    var self = this;
    this.name = ko.observable(data.name);
    this.markerID = data.id;
    this.onItemClicked = function(){
        AnimateMarker(self.markerID);
    }
}

var ViewModel = function (){
    var self = this;
    this.filtertext = ko.observable("");
    this.locationList = ko.observableArray();
    this.filteredList = ko.computed(function(){
        return ko.utils.arrayFilter(self.locationList(),function(location){
            if(self.filtertext() == ""){
                ToggleMarker(location.markerID,true);
                return location;
            }else{
                if(location.name().includes(self.filtertext())){
                    ToggleMarker(location.markerID,true);
                    return location;
                }else{
                    ToggleMarker(location.markerID,false);
                }
            }
        });
    });
}
var vm = new ViewModel();
ko.applyBindings(vm);

