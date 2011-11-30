//Application Window Component Constructor
exports.ApplicationWindow = function() {
	var geo = require('geo');
	
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#fff',
		fullscreen: false,
		exitOnClose: true
	});

	// create UI components
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
	
	// add map after window opens
	self.addEventListener('open', function(e) {
		mapview = Titanium.Map.createView({
		    mapType: Titanium.Map.STANDARD_TYPE,
		    region: {
		    		latitude: geo.LATITUDE_BASE, 
		    		longitude: geo.LONGITUDE_BASE,
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
			latitude: geo.LATITUDE_BASE,
			longitude: geo.LONGITUDE_BASE
		}));
		self.add(mapview);
	});
	
	// Execute forward geocode on button click
	button.addEventListener('click', function() {	
		textfield.blur();
		geo.forwardGeocode(textfield.value);
	});
	
	// Add annotation and change mapview location
	Ti.App.addEventListener('app:geocode', function(e) {
		mapview.addAnnotation(Ti.Map.createAnnotation({
		    	animate: true,
		    	pincolor: Titanium.Map.ANNOTATION_RED,
		    	title: e.title,
		    	latitude: e.coords.latitude,
		    	longitude: e.coords.longitude
	    })); 
	    mapview.location = e.location;
	});
	
	// assemble view hierarchy
	view.add(textfield);
	view.add(button);
	self.add(view);
	
	return self;
};
