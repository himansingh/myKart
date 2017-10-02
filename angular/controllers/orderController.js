myApp.controller('orderController', ['orderService','$sessionStorage', function(orderService, $sessionStorage){
	
	let order = this ;
	this.loadOrderDetails = function(){
		order.data = orderService.getOrderDetails();
		$sessionStorage.cartLength = 0 ;
		console.log('orderController',order.data);
	}();
}]);