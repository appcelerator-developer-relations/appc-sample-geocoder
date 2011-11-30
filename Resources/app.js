var GOOGLE_BASE_URL = 'http://maps.googleapis.com/maps/geo?output=json&q=';

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
var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {latitude:37.389569, longitude:-122.050212,
            latitudeDelta:0.1, longitudeDelta:0.1},
    animate:true,
    regionFit:true,
    userLocation:false,
    top: '50dp'
});

// Handle + button click
button.addEventListener('click', function() {	
	textfield.blur();
	xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', GOOGLE_BASE_URL + textfield.value);
	xhr.onload = function() {
	    var json = JSON.parse(this.responseText);
	    mapview.addAnnotation({
	    	animate: true,
	    	pincolor: Titanium.Map.ANNOTATION_RED,
	    	title: textfield.value,
	    	latitude: json.Placemark[0].Point.coordinates[1],
	    	longitude: json.Placemark[0].Point.coordinates[0]	
	    });
	};
	xhr.send();
});

// Assemble view hierarchy
view.add(textfield);
view.add(button);
win.add(view);
win.add(mapview);

win.open();