describe('Menu Item', function () {

    var menucategories;
    var $httpBackend;
    var ApiBasePath;
    var responseObject = {"id":1,"short_name":"A1","name":"Won Ton Soup with Chicken","description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions","price_small":2.55,"price_large":5.0,"small_portion_name":"pint","large_portion_name":"quart","created_at":"2019-03-23T12:16:45.633Z","updated_at":"2019-03-23T12:16:45.633Z","category_short_name":"A","image_present":true};
    
    beforeEach(function () {
      module('common');
  
      inject(function ($injector) {
        MenuService = $injector.get('MenuService');
        $httpBackend = $injector.get('$httpBackend');
        ApiPath = $injector.get('ApiPath');
      });
    });
  
    it('should return menu data for menu item', function() {
        $httpBackend.whenGET(ApiPath + '/menu_items/A1.json').respond(200, responseObject);
        MenuService.getMenuItem("A1").then(function(response) {
        expect(response).toEqual(responseObject);
      });
      $httpBackend.flush();
    });

    it('should return empty for not menu item', function() {
        $httpBackend.whenGET(ApiPath + '/menu_items/A.json').respond(500, {"status":"500","error":"Internal Server Error"});
        MenuService.getMenuItem("A").then(function(response) {
        expect(response).toEqual("");
      });
      $httpBackend.flush();
    });
  
  });
  