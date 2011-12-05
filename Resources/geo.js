var GOOGLE_BASE_URL = 'http://maps.googleapis.com/maps/geo?output=json&q=';
exports.LATITUDE_BASE = 37.389569;
exports.LONGITUDE_BASE = -122.050212;

exports.forwardGeocode = function(address, callback) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', GOOGLE_BASE_URL + address);
	xhr.onload = function() {
	    var json = JSON.parse(this.responseText);
	    if (!json.Placemark || !json.Placemark[0].Point || !json.Placemark[0].Point.coordinates) {
	    	alert('Unable to geocode the address');
	    	return;
	    }
	    
	    var point = {
	    	latitude: json.Placemark[0].Point.coordinates[1],
	    	longitude: json.Placemark[0].Point.coordinates[0]
	    };
	    callback({
    		title: address,
    		coords: point
		});
	};
	xhr.send();
};