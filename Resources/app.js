// This is a single context, single window application
// There is only one master window to which sub views will be added
(function() {
	var ApplicationWindow = require('ApplicationWindow').ApplicationWindow;
	new ApplicationWindow().open();
})();