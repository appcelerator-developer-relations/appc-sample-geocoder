// This is a single context, single window application
// There is only one master window to which sub views will be added
(function() {
	if (Ti.version < 1.8 ) {
		alert('Sorry - this application requires Titanium Mobile SDK 1.8 or later');
	} else if (Ti.Platform.osname === 'mobileweb') {
		alert('Sorry - this application is not yet fully implemented for mobilweb');
	}
	else {
		var ApplicationWindow = require('ui/ApplicationWindow').ApplicationWindow;
		new ApplicationWindow().open();
	}
})();