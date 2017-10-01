myApp.directive('productsByCategory',function(){

	return{
			restrict : 'E',
			templateUrl : 'templates/productsByCategory-template.html',
			scope : {
				itemsByCatergory :'=',
				//addItemToCart	: '&'
			},

			controller : function($scope, cartsService, $sessionStorage, orderService, $rootScope, $location){

				$scope.showDetails=false ;
				let count = 0 ;

				$scope.addItemToCart = function(id , qty){
					let data = {
						productId 	: id,
						quantity	: qty,
						authToken	: $sessionStorage.storedAuthToken 
					}

					cartsService.addToCart(data)
					.then(function(response){
						console.log(response);
						$scope.responseofAddToCart(response);
					},function(reason){
						alert(" Some error occured!");
						console.log(reason);
					});
				} // end of addItemToCart function

				$scope.responseofAddToCart = function(response){
					if(!response.data.error){
						alert("Item added to cart successfully!");
						$sessionStorage.cartLength = $sessionStorage.cartLength+1 ;
						$location.path('/cart');
					}
					else {
						alert("Please login to continue");
						$sessionStorage.$reset();
						$rootScope.isloggedIn = false ;
					}
				};

				$scope.orderNow = function(id, qty){

					if(confirm("You are about to buy this product\nProceed?")){
						$scope.orderNowRequest(id, qty);
					}					
				} // end of orderNow function

				$scope.orderNowRequest = function(id, qty){
					let data = {
						productId 	: id,
						quantity	: qty,
						authToken	: $sessionStorage.storedAuthToken 
					}

					orderService.orderFromProductView(data)
					.then(function(response){
						console.log('order placed from home screen',response);
						$scope.errorCheck(response.data);
					},function(reason){
						console.log(reason);
					});
				};

				$scope.showDescription = function () {
					count++ ;
					if(count%2 == 0){
						$scope.showDetails = false ;
					}
					else {
						$scope.showDetails = true ;
					}
				};

				$scope.errorCheck = function(data){
					if(!data.error){
						orderService.saveOrderDetails(data.data) ;
						$rootScope.isloggedIn = true ;
						$location.path('/orderdetails');
					}
					else{
						$sessionStorage.$reset();
						alert(" Please login to place an order!");
						$rootScope.isloggedIn = false ;
					}
				};

			}, // end of controller

			link : function(scope , element , attrs){

				angular.element('.card-fade').fadeOut('fast');
				element.on('mouseenter', function(){
					//angular.element('.card-product').addClass('card-z');
					angular.element(this).find('.card-fade').fadeIn('fast');
				});

				element.on('mouseleave', function(){
					angular.element(this).find('.card-fade').fadeOut('fast');
				});
				
			} // end of link function
						
	} // end of return
}); // end of productsByCategory