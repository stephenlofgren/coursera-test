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
    templateUrl: 'src/templates/home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/main-categorylist.template.html',
    controller: 'MainCategoryListController as categories',
     resolve: {
       categories: ['MenuDataService', function (MenuDataService) {
         return MenuDataService.getAllCategories();
       }]
     }
  })

  // Category detail
  .state('categoryDetail', {
    url: '/category-detail/{categoryShortName}',
    templateUrl: 'src/templates/category-detail.template.html',
    //controller: 'CategoryDetailController as categoryDetail',
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
