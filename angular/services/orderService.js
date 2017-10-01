myApp.service('orderService', ['$http', function($http){

	let baseUrl = 'https://ecommerceapi.edwisor.com/api/v1/order/' ;
	let main = this;
	
	this.orderFromCart = function(token){
		return $http({ method : 'POST', url : baseUrl + '/fromCart', params : token });
	} ;

	this.orderFromProductView = function (data) {
		return $http({ method : 'POST', url : baseUrl + '/create', params: data}) ;
	};

	this.saveOrderDetails = function(data){
		main.orderData = data ;
	};

	this.getOrderDetails = function(){
		return (main.orderData) ;
	};

}]);