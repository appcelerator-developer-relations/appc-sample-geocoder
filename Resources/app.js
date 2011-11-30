var GOOGLE_BASE_URL = 'http://maps.googleapis.com/maps/geo?output=json&q=';
var LATITUDE_BASE = 37.389569;
var LONGITUDE_BASE = -122.050212;
var pos = {
	minLatitude: LATITUDE_BASE,
	maxLatitude: LATITUDE_BASE,
	minLongitude: LONGITUDE_BASE,
	maxLongitude: LONGITUDE_BASE
};

var win = Ti.UI.createWindow({
	backgroundColor: '#fff',
	fullscreen: false,
	exitOnClose: true
});
var view = Ti.UI.createView({
	backgroundColor: '#800',
	height: '50dp',
	top: 0
});
var textfield = Ti.UI.createTextField({
	height: '40dp',
	top: '5dp',
	left: '5dp',
	right: '50dp',
	style: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText: 'Enter an address',
	backgroundColor: '#fff'
});
var button = Ti.UI.createButton({
	title: '+',
	font: {
		fontSize: '20dp',
		fontWeight: 'bold'	
	},
	top: '5dp',
	height: '40dp',
	width: '40dp',
	right: '5dp'
});
var mapview;

// add mapview to window after it opens
win.addEventListener('open', function(e) {
	mapview = Titanium.Map.createView({
	    mapType: Titanium.Map.STANDARD_TYPE,
	    region: {
	    	latitude: LATITUDE_BASE, 
	    	longitude: LONGITUDE_BASE,
	        latitudeDelta: 0.1, 
	        longitudeDelta: 0.1
	    },
	    animate:true,
	    regionFit:true,
	    userLocation:false,
	    top: '50dp'
	});
	mapview.addAnnotation(Ti.Map.createAnnotation({
		animate: true,
		pincolor: Titanium.Map.ANNOTATION_RED,
		title: 'Appcelerator',
		latitude: LATITUDE_BASE,
		longitude: LONGITUDE_BASE
	}));
	win.add(mapview);
});

// Forward geocode the address and plot it on the mapview
button.addEventListener('click', function() {	
	textfield.blur();
	xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', GOOGLE_BASE_URL + textfield.value);
	xhr.onload = function() {
	    var json = JSON.parse(this.responseText);
	    var point = {
	    	latitude: json.Placemark[0].Point.coordinates[1],
	    	longitude: json.Placemark[0].Point.coordinates[0]
	    };
	    mapview.addAnnotation(Ti.Map.createAnnotation({
	    	animate: true,
	    	pincolor: Titanium.Map.ANNOTATION_RED,
	    	title: textfield.value,
	    	latitude: point.latitude,
	    	longitude: point.longitude
	    }));
	    
	    pos.minLatitude = Math.min(pos.minLatitude, point.latitude); 
	    pos.maxLatitude = Math.max(pos.maxLatitude, point.latitude); 
	    pos.minLongitude = Math.min(pos.minLongitude, point.longitude); 
	    pos.maxLongitude = Math.max(pos.maxLongitude, point.longitude); 
	    mapview.location = {
	    	latitude: (pos.maxLatitude + pos.minLatitude)/2, 
	    	longitude: (pos.maxLongitude + pos.minLongitude)/2,
	        latitudeDelta: pos.maxLatitude - pos.minLatitude + 1, 
	        longitudeDelta: pos.maxLongitude - pos.minLongitude + 1
	    };
	};
	xhr.send();
});

// Assemble view hierarchy
view.add(textfield);
view.add(button);
win.add(view);

win.open();