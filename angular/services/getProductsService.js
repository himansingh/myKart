myApp.service('getProductsService', ['$http', function($http){

	let baseUrl = 'https://ecommerceapi.edwisor.com/api/v1/product/view';

	this.getAllCategory = function () {
		
		return $http ({ method : 'GET' , url : baseUrl + '/getallcategory'  })
	} ;

	this.getAllProducts = function () {
		
		return $http ({ method : 'GET' , url : baseUrl + '/all'  })
	} ;

	this.getProductsByCategory = function (categoryType) {
		
		return $http ({ method : 'GET' , url : baseUrl + '?category='+ categoryType  })
	} ;

	
}]); // end of service