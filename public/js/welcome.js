//------------------------------- API GET request --------------------------------//
let location_map, git_user;

function ajaxGet() {
    let myVal;
    $.ajax({
        type: "GET",
        url: "/userdetails",
        success: function(result) {
            console.log("Success: ", result);
            myVal = result;
            console.log('myval', myVal);
            for (let key in myVal) {
                location_map = myVal[key].location;
                git_user = myVal[key].githubUsername;
                //                 const htmlDisplay = `
                //    <div class="col-3">
                //    <p>${myVal[key].firstName}</p> `;
                //                 const outputElem = $('.user-details');
                //                 outputElem.prop('hidden', false).append(htmlDisplay);
            }
        },
        error: function(e) {
            $("#user-details").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    });
    return location_map, git_user;
}


////******************************* GOOGLE RajaCode ********************************/

function renderMap(data) {
    const from = { lat: 32.7763, lng: -96.7969 }
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: from
    });
    // var defaultMarker = new google.maps.Marker({ position: new google.maps.LatLng(from.lat, from.lng), map: map, icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' });
    var markers = [];
    var contents = [];
    var infowindows = [];

    //display current location
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('ME');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    //current location end

    for (i = 0; i < data.length; i++) {
        markers[i] = new google.maps.Marker({ position: new google.maps.LatLng(data[i].latlang.lat, data[i].latlang.lng), map: map, });
        markers[i].index = i; //add index property
        contents[i] = '<div class="popup_container">' + data[i].data.sap + " | " + data[i].data.name + " | " + data[i].data.address; + '</div>';
        infowindows[i] = new google.maps.InfoWindow({
            content: contents[i],
            maxWidth: 300
        });
        google.maps.event.addListener(markers[i], 'click', function() {
            arr.push(this.index)
            filterByIndex();
            infowindows[this.index].open(map, markers[this.index]);
            map.panTo(markers[this.index].getPosition());
        });
    }
}
$(window).load(renderMap());