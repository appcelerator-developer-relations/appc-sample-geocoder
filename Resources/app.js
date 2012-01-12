// This is a single context, single window application
// There is only one master window to which sub views will be added
(function() {
	if (Ti.version < 1.8 ) {
		alert('Sorry - this application requires Titanium Mobile SDK 1.8 or later');
	}
	else if (Ti.Platform.osname === 'mobileweb') {
		alert('Mobile web is not yet supported by this template');
	}
	else {
		var ApplicationWindow = require('ui/ApplicationWindow').ApplicationWindow;
		new ApplicationWindow().open();
	}
})();