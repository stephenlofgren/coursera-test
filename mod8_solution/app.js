(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])

    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems);

    MenuSearchService.$inject = ['$q', '$http'];
    NarrowItDownController.$inject = ['MenuSearchService'];

    function MenuSearchService($q, $http){
        var service = this;

        var makeAjaxRequest = function(searchTerm){
            var response = $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
            });
            return response;
        }

        service.foundItems = [];
        service.getMatchedMenuItems = function (searchTerm) {
          var promise = makeAjaxRequest(searchTerm);
          return promise.then(function(response) {
            service.foundItems.length = 0;
            response.data.menu_items.forEach(element => {
                if(element.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    service.foundItems.push(element);
                }
            });
            return service.foundItems;
          });
        };

        service.removeItem = function(itemIndex) {
            service.foundItems.splice(itemIndex, 1);
        }
    }

    function FoundItems(){
        var ddo = {
            restrict: 'E',
            templateUrl: 'list.html',
            scope: {
                someTest: '@test',
                foundItems: '<',
                onRemove: '&',
            },
            controller: ListDirectiveController, 
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    function NarrowItDownController(MenuSearchService){
        var list = this;        
        list.search = function(searchString){
            MenuSearchService.getMatchedMenuItems(searchString).then(function(response){
                list.found = response;
            });
        };
        list.removeItem = function(itemIndex){
            MenuSearchService.foundItems.splice(itemIndex, 1);
        };        
    }

    function ListDirectiveController(MenuSearchService) {
        var list = this;
    }
      
})();