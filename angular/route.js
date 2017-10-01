myApp.config(['$routeProvider',function($routeProvider) {
	
	$routeProvider
		.when('/' , {

			templateUrl 	: 'views/product-view.html',
			controller 		: 'productsController',
			controllerAs 	: 'pc'
		})
		.when('/signup',{

			templateUrl 	: 'views/user-signup-view.html',
			controller 		: 'userSignupController',
			controllerAs 	: 'uc'
		})
		.when('/login',{

			templateUrl 	: 'views/user-login-view.html',
			controller 		: 'userLoginController',
			controllerAs 	: 'ulc'
		})
		.when('/userData',{

			templateUrl 	: 'views/user-details-view.html',
			controller 		: 'userDataController',
			controllerAs 	: 'user'
		})
		.when('/cart',{

			templateUrl 	: 'views/cart-view.html',
			controller 		: 'cartController',
			controllerAs 	: 'cart'
		})
		.when('/orderdetails',{

			templateUrl 	: 'views/orderDetails-view.html',
			controller 		: 'orderController',
			controllerAs 	: 'order'
		})
		.otherwise({
			redirectTo : '/'
		});
}]);

