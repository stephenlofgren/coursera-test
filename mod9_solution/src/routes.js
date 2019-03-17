(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'templates/home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'templates/categories.template.html',
    controller: 'CategoriesController as categories',
     resolve: {
       categoryData: ['MenuDataService', function (MenuDataService) {
         return MenuDataService.getAllCategories();
       }]
     }
  })

  // Category detail
  .state('items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'templates/items.template.html',
    controller: 'ItemsController as items',
    resolve: {
      categoryItems: ['$stateParams', 'MenuDataService',
        function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
             .then(function(response) {
              return response.menu_items;
             });
        }]
    }
  });


}

})();
