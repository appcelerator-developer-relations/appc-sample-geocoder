var GOOGLE_BASE_URL = 'http://maps.googleapis.com/maps/geo?output=json&q=';
exports.LATITUDE_BASE = 37.389569;
exports.LONGITUDE_BASE = -122.050212;

var pos = {
	minLatitude: exports.LATITUDE_BASE,
	maxLatitude: exports.LATITUDE_BASE,
	minLongitude: exports.LONGITUDE_BASE,
	maxLongitude: exports.LONGITUDE_BASE
};

exports.forwardGeocode = function(address, callback) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', GOOGLE_BASE_URL + address);
	xhr.onload = function() {
	    //Ti.API.info(this.responseText);
	    var json = JSON.parse(this.responseText);
	    Ti.API.info(json);
	    
	    var point = {
	    	latitude: json.Placemark[0].Point.coordinates[1],
	    	longitude: json.Placemark[0].Point.coordinates[0]
	    };
	    Ti.API.info(point);
	    
	    pos.minLatitude = Math.min(pos.minLatitude, point.latitude); 
	    pos.maxLatitude = Math.max(pos.maxLatitude, point.latitude); 
	    pos.minLongitude = Math.min(pos.minLongitude, point.longitude); 
	    pos.maxLongitude = Math.max(pos.maxLongitude, point.longitude);
	    Ti.API.info(pos);
	    
	    callback({
    		title: address,
    		coords: point,
    		location: {
		    	latitude: (pos.maxLatitude + pos.minLatitude)/2, 
		    	longitude: (pos.maxLongitude + pos.minLongitude)/2,
		        latitudeDelta: pos.maxLatitude - pos.minLatitude + 1, 
		        longitudeDelta: pos.maxLongitude - pos.minLongitude + 1
	    	}
		});
		Ti.API.info('called callback');
	};
	xhr.send();
};