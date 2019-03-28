(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.myInfo', {
      url: '/myInfo',
      templateUrl: 'src/public/my-info/my-info.html',
      controller: 'MyInfoController',
      controllerAs: 'myInfoCtrl',
      resolve: {
        myInfo: ['MyInfoService', 'MenuService', function (MyInfoService, MenuService) {
          var info = MyInfoService.getMyInfo();
          if(info){
            var shortName = info.user.favoriteDish
            return MenuService.getMenuItem(shortName).then(
              function(response){
                info.user.favoriteDish = response;
                  info.user.favoriteDish.image = MenuService.getMenuItemImageUrl(shortName);
                return info;
            });
          }else{
            return {"user":{"firstName":"Stephen","lastName":"Lofgren","emailAddress":"stephenlofgren@hotmail.com","phoneNumber":"801-455-6716","favoriteDish":{"id":1,"short_name":"A1","name":"Won Ton Soup with Chicken","description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions","price_small":2.55,"price_large":5,"small_portion_name":"pint","large_portion_name":"quart","created_at":"2019-03-23T12:16:45.633Z","updated_at":"2019-03-23T12:16:45.633Z","category_short_name":"A","image_present":true,"image":"https://slofgre2-course5.herokuapp.com/images/A1.jpg"},"saved":true}};
          } 
        }]
      }
    })
    .state('public.signUp', {
      url: '/signUp',
      templateUrl: 'src/public/sign-up/sign-up.html',
      controller: 'SignUpController',
      controllerAs: 'signupCtrl'    
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    });
}
})();
