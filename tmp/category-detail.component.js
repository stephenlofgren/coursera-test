(function () {
'use strict';

angular.module('MenuApp')
.component('categoryDetails', {
    templateUrl: 'src/templates/categories.template.html',
    bindings: {
    categoryItems: '<'
    }
});

})();
