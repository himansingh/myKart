myApp.controller('orderController', ['orderService', function(orderService){
	
	let order = this ;
	this.loadOrderDetails = function(){
		order.data = orderService.getOrderDetails();
		console.log('orderController',order.data);
	}();
}]);