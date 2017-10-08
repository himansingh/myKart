myApp.controller('productsTemplateController', ['$scope','cartsService', '$sessionStorage', 'orderService','$rootScope','$location', function($scope, cartsService, $sessionStorage, orderService, $rootScope, $location){

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
					},function(reason){
						console.log(reason);
					});
				} // end of addItemToCart function

				$scope.orderNow = function(id, qty){
					if(confirm("You are about to buy this product\nProceed?")){
						$scope.orderNowRequest(id, qty);
					}
				};

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

				// for showing/hiding details of products on click when viewport width<500px
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
						$rootScope.isloggedIn = false ;
						alert("Please login to place an order!");
					}
				};

			}]);

 // end of controller