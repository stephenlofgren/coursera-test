(function () {
    'use strict';
    
    angular.module('MenuApp')
    .service('MenuDataService', MenuDataService);
    
    
    MenuDataService.$inject = ['$q', '$http', '$timeout']
    function MenuDataService($q, $http, $timeout) {
      var service = this;
    
      var makeCategoriesRequest = function(){
        var response = $http({
            method: 'GET',
            url: 'https://davids-restaurant.herokuapp.com/categories.json'
        });
        return response;
      }

      var makeCategoryItemRequest = function(categoryShortName){
        var response = $http({
            method: 'GET',
            url: ' https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName
        });
        return response;
      }

      service.getAllCategories = function () {
        var promise = makeCategoriesRequest();
        return promise.then(function(response) {
          service.foundItems = response.data
          return service.foundItems;
        });    
      };
      
      service.getItemsForCategory = function(categoryShortName){
        var promise = makeCategoryItemRequest(categoryShortName);
        return promise.then(function(response) {
          service.categoryItems = response.data
          return service.categoryItems;
        });
      };
    

    }
    
    })();
    