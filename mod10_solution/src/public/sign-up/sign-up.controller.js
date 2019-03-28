(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$scope', '$timeout', 'MenuService', 'MyInfoService'];
function SignUpController($scope, $timeout, MenuService, MyInfoService) {
  var $ctrl = this;

  var handleChange = function( newValue, oldValue ) {
    if(!newValue){
      return;
    }
    MenuService.getMenuItem($ctrl.user.favoriteDish)
    .then(
      function(data){
        if(data == undefined || data == ""){
          $ctrl.favoriteExists = false;
        }else{
        $ctrl.favoriteExists = true;
        }
      });
  };

  $scope.$watch(
    function watchThis( scope ) {
        return( $ctrl.user && $ctrl.user.favoriteDish );
    },
    handleChange
  );


  $ctrl.submitSignup = function(){
    var info = {
      user: $ctrl.user
    };
    MenuService.getMenuItem($ctrl.user.favoriteDish)
    .then(
      function(data){
        if(data == undefined){
          $ctrl.favoriteExists = false;
          $ctrl.user.saved = false;
        }
        $ctrl.favoriteExists = true;
        MyInfoService.saveMyInfo(info);
        $ctrl.user.saved = true;
      });
  }
}


})();
