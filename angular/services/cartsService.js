myApp.service('cartsService', ['$http','$sessionStorage', function($http, $sessionStorage){
	
	let baseUrl = 'https://ecommerceapi.edwisor.com/api/v1/cart/' ;
	let main = this ;
	let products ;

	this.addToCart = function(data){
		return $http({ method : 'POST', url : baseUrl + 'add', params : data})
	};

	this.viewCart = function(token){
		return $http({ method : 'GET', url : baseUrl + 'view', params : token})
	};

	this.removeItem = function(data){
		return $http({ method : 'POST', url : baseUrl + 'remove', params : data})
	};

	this.reduceItem = function(data){
		return $http({ method : 'POST', url : baseUrl + 'reduceItem', params : data})
	};

	this.clearCart = function(token){
		return $http({ method : 'GET', url : baseUrl + 'clear', params : token })
	};

	// this is used to get all products from main page for filtering and then showing in carts view
	this.getAllItemDetails = function(data){
		main.allItems = data ;
		console.log('This is from service',data);
	};

	this.filterItems = function(data){
		// using empty array so that on continuous requests same data isn't pushed again
		products = [];
		angular.forEach(data, function(ele1, index1){
			
			angular.forEach(main.allItems, function(ele2, index2){
				
				if( ele1.productId === ele2.productId){
					ele2.quantity = ele1.quantity ;
					ele2.addedOn = ele1.addedOn ;
					products.push(ele2);
				}
			}); // end of first loop
		}); // end of both loops

		return products ;
	};

}]);