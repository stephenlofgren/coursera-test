(function () {
"use strict";

angular.module('common')
.service('MyInfoService', MyInfoService);


MyInfoService.$inject = ['$http', 'ApiPath'];
function MyInfoService($http, ApiPath) {
  var service = this;

  service.getMyInfo = function () {
    return service.info;
  };
  service.saveMyInfo = function (info) {
    service.info = info;
  };
}



})();
