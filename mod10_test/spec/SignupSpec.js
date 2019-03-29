describe("signupController", function() {

//['ui.router', 'common']

  var $controller;
  var signupController;
  var scopeMock;
  var $httpBackend;
  var ApiBasePath;

  var validResponse = {"id":1,"short_name":"A1","name":"Won Ton Soup with Chicken","description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions","price_small":2.55,"price_large":5.0,"small_portion_name":"pint","large_portion_name":"quart","created_at":"2019-03-23T12:16:45.633Z","updated_at":"2019-03-23T12:16:45.633Z","category_short_name":"A","image_present":true}
  var invalidResponse = "";

  beforeEach(function () {
    module(function ($provide) {
      $provide.service('MenuServiceMock', function () {
        var service = this;
        service.getMenuItem = function (shortName) {
          if(shortName == "A1"){  
            return {
              then: function(callback) {return callback(validResponse);}
            };
          }else{
            return {
              then: function(callback) {return callback(invalidResponse);}
            };
          }
        }
      });
      $provide.service('MyInfoServiceMock', function () {
        var service = this;

      });
      $provide.service('$scope', function () {
        var service = this;
        service.$watch = function(){

        };
      });
    });
    module('common');
    module('ui.router');
    module('public');
  });



  beforeEach(inject(function ($injector) {
    //_$controller_, _$scope_, MenuServiceMock
    $controller = $injector.get("$controller");
    MenuService = $injector.get("MenuService");
    MenuServiceMock = $injector.get("MenuServiceMock");
    MyInfoServiceMock = $injector.get("MyInfoServiceMock");
    scopeMock = $injector.get("$scope");
    
    signupController =
      $controller('SignUpController',
                  {scope: scopeMock, MenuService: MenuServiceMock, MyInfoService: MyInfoServiceMock});

  }));


  it("should set favoriteExists to false when A", function() {
    signupController.handleChange("A", "really doesn't matter");
    expect(signupController.favoriteExists).toBe(false);
  });
  it("should set favoriteExists to true when A1", function() {
    signupController.handleChange("A1", "really doesn't matter");
    expect(signupController.favoriteExists).toBe(true);
  });

});
