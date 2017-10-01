myApp.controller('cartController', ['$location', '$rootScope','cartsService','$sessionStorage','getProductsService','$route','orderService', function($location, $rootScope, cartsService,$sessionStorage, getProductsService, $route, orderService){
	
	let cart = this ;
	this.itemsInCart = [] ;
	let count = 0;

	this.viewUserCart = function(){
		let token = { authToken : $sessionStorage.storedAuthToken } ; 
		cartsService.viewCart(token)
		.then(function(response){
			console.log('This is response from view user cart', response);
			cart.qtyAndDate = response.data.data.cartInfo ;
			console.log("Items qty and date", cart.qtyAndDate);
			$sessionStorage.cartLength = cart.qtyAndDate.length ;
			cart.itemsInCart = cartsService.filterItems(cart.qtyAndDate);
			cart.checkItemsInCart();
		},function(reason){
			console.log(reason);
			alert("Something went wrong!");
		});
	}();

	this.checkItemsInCart = function(){
		if(cart.itemsInCart == undefined || cart.itemsInCart.length === 0)
			cart.viewAllProducts();
	}
	
	this.viewAllProducts = function(){

		getProductsService.getAllProducts()
		.then(function(response){
			cart.allProducts = response.data.data ;
			cartsService.getAllItemDetails(response.data.data);
			cart.itemsInCart = cartsService.filterItems(cart.qtyAndDate);
			//console.log("Items in cart from second call", cart.itemsInCart);
		} , function(reason){
			console.log(reason);
			alert("Some error occured!");
		});
	}; // end of viewAllProducts

	this.removeItemFromCart = function(productId, index){

		if(confirm("Do you want to remove this item from cart?")){

			let data = {
				authToken 	: $sessionStorage.storedAuthToken ,
				productId	: productId
			}
			cartsService.removeItem(data)
			.then(function(response){
				cart.removeFromScreen(response.data.error, index);
				console.log(response);				
			} , function(reason){
				console.log(reason);
				alert("Some error occured!");
			});
		}
	};

	this.reduceItemFromCart = function(productId, qty){

		let data = {
			authToken 	: $sessionStorage.storedAuthToken ,
			productId	: productId,
			quantity	: qty
		}
		cartsService.reduceItem(data)
		.then(function(response){
			console.log(response);
			cart.checkReduceItemStatus(response);			
		} , function(reason){
			console.log(reason);
			alert("Some error occured!");
		});
	};

	this.checkReduceItemStatus = function(response){
		if(response.data.error){
			alert(response.data.message);
		}
		else{
			$route.reload();	
		}
	};

	this.clearMyCart = function(){

		if(cart.itemsInCart.length == 0){
			alert("Cart is empty");
		}
		else
		if(confirm("Do you really want to clear your cart?")){
			cart.clearMyCartRequest();
		} // end of if	
	};

	this.clearMyCartRequest = function(){
		token ={
			authToken : $sessionStorage.storedAuthToken
		}

		cartsService.clearCart(token)
		.then(function(response){
			console.log("Success response from clear cart",response);
			cart.clearFromScreen(response.data.error);
		},function(reason){
			alert("some error occured!");
			console.log(reason);
		})
	};

	this.clearFromScreen = function(result){

		if(!result){
			alert("Your cart has been cleared successfully !");
			cart.itemsInCart.splice(0);
			$sessionStorage.cartLength = '';
		}
		else{
			alert(" Error in success response \n Please check console");	
		}
	};

	this.removeFromScreen = function(result, index){

		if(!result){
			alert("Item Removed successfully!");
			cart.itemsInCart.splice(index,1);
		}
		else{
			alert("Please check console\nSomething went wrong");
		}	
	};

	this.orderFromCart = function(){

		if(cart.itemsInCart.length == 0){
			alert(" Cart is empty");
		}
		else
		if(confirm("You are about to place order. We do not entertain cancelling of orders.\n Proceed?")){
			cart.orderFromCartRequest();
		} // end of if	
	};

	this.orderFromCartRequest = function(){

		let token = {
			authToken : $sessionStorage.storedAuthToken
		};

		orderService.orderFromCart(token)
		.then(function(response){
			console.log("Response from orderFromCart",response);
			// cart.orderDetails = response.data.data ;
			cart.checkOrderDetails(response);
		}, function(reason){
			alert("Some error occured!");
			console.log(reason);
		});
	}

	this.checkOrderDetails = function(response){

		if(!response.data.error){
				orderService.saveOrderDetails(response.data.data);
				$location.path('/orderdetails');
		}	
		else {
			$sessionStorage.$reset();
			alert("Please login to continue.");
			$rootScope.isloggedIn = false ;
			$location.path('/');
		}
	};

}]); // end of controller