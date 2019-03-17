(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoryDetailController', CategoryDetailController);


  CategoryDetailController.$inject = ['categoryItems'];
  function CategoryDetailController(categoryItems) {
    var categoryDetail = this;
    categoryDetail.categoryItems = categoryItems;
  };

})();
