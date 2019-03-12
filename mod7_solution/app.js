(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])

    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('AngularDollarsFilter', AngularDollarsFilter);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    
    function ShoppingListCheckOffService(){
        var service = this;

        // List of shopping items
        var itemsToBuy = [
            { name: "cookies", quantity: 10, pricePerItem: .50 },
            { name: "Tasty Cakes", quantity: 10, pricePerItem: .33},
            { name: "Donuts", quantity: 12, pricePerItem: 1.25 },
            { name: "Pot Pies", quantity: 3, pricePerItem: 3.99},
            { name: "Soda", quantity: 1, pricePerItem: .75}
        ];
        var itemsBought = [];
            
        service.removeItem = function (itemIdex) {
          items.splice(itemIdex, 1);
        };
      
        service.getItemsToBuy = function () {
            return itemsToBuy;
        };        
        service.getItemsBought = function () {
            return itemsBought;
        };        
        
        service.boughtItem = function(itemToBuyIndex){
            itemsBought.push(itemsToBuy[itemToBuyIndex]);
            itemsToBuy.splice(itemToBuyIndex,1);
        };
    }

    function ToBuyController(ShoppingListCheckOffService){

        var toBuy = this;

        var getItems = ShoppingListCheckOffService.getItemsToBuy; 

        toBuy.getItems = getItems;
        toBuy.boughtItem =ShoppingListCheckOffService.boughtItem;

    }

    function AlreadyBoughtController(ShoppingListCheckOffService){

        var alreadyBought = this;

        var getItems = ShoppingListCheckOffService.getItemsBought;

        this.getItems = getItems;

    }

    function AngularDollarsFilter(){
        return function(number){
            //if it isn't a number just return the input value
            if (isNaN(number)){
                return number;
            }
            return "$$$" + number.toFixed(2);
        }
    }

})();