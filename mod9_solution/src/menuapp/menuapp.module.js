//3. Create a file called `menuapp.module.js` and declare an Angular module to match your `ng-app` declaration.
//Make sure the `MenuApp` module lists the `data` module as a dependency.
(function () {
'use strict';
    
angular.module('MenuApp', ['data','ui.router']);
    
})();
