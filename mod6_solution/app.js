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
                $scope.message = "Please enter data first";
                $scope.message_style = {"color": "red"};
                $scope.text_style = {"border-color": "red", "border-style": "solid"};
            } 
            else if(c <= 3){
                $scope.message = "Enjoy!"
                $scope.message_style = {"color": "black"};
                $scope.text_style = {"border-color": "green", "border-style": "solid"};
            }
            else if(c > 3){
                $scope.message = "Too Much!"
                $scope.message_style = {"color": "black"};
                $scope.text_style = {"border-color": "green", "border-style": "solid"};
            }
        } 

        $scope.checkIfTooMuch = function(){
             getMessage();
        };

    };

})();