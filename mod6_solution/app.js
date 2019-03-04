(function () {
    'use strict';

    angular.module('LunchCheck', [])

    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
    
    function LunchCheckController ($scope){

        var hasWords = function(input) {
            return Boolean(input);
        }

        var countWords = function() {

            if(!$scope.lunch) {
                return 0;
            }
            
            return $scope.lunch.split(',')
            .filter(hasWords)
            .length
        };

        var getMessage = function() {
            var c = countWords();
            if(c == 0){
                return "Please enter data first";
            } 
            else if(c <= 3){
                return "Enjoy!"
            }
            else if(c > 3){
                return "Too Much!"
            }
        } 

        $scope.checkIfTooMuch = function(){
            $scope.message = getMessage();
        };

    };

})();