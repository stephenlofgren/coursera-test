(function () {
'use strict';

angular.module('MenuApp')
.controller('MainCategoryListController', MainCategoryListController);


MainCategoryListController.$inject = ['MenuDataService'];
function MainCategoryListController(MenuDataService) {
  var mainList = this;

  mainList.$onInit = function () {
    
    MenuDataService.getAllCategories()
    .then(function (result) {
      mainList.items = result;
    });
  };
};

})();
