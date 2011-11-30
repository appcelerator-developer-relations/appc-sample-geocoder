var win = Ti.UI.createWindow({
	backgroundColor: '#fff',
	fullscreen: false,
	exitOnClose: true
});
var view = Ti.UI.createView({
	backgroundColor: '#800',
	height: '40dp',
	top: 0
});
var textfield = Ti.UI.createTextField({
	height: '30dp',
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
	height: '30dp',
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
    top: '40dp'
});

view.add(textfield);
view.add(button);
win.add(view);
win.add(mapview);

win.open();