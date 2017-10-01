myApp.controller('productsController', ['getProductsService','cartsService', function(getProductsService, cartsService){
	
	let product = this ;
	this.showAllProducts = true ;
	this.showByCategory = false ;
	this.minPrice = 5000 ;
	this.maxPrice = 600000 ;

	this.getCategories = function(){

		getProductsService.getAllCategory()
		.then(function(response){
			console.log(response);
			product.categories = response.data.data ;
		}, function(reason){

			alert('Some error occured!');
			console.log(reason);
		});
	}(); // end of getCategories function


	this.viewAllProducts = function(){

		product.showAllProducts = true ;
		product.showByCategory = false ;

		getProductsService.getAllProducts()
		.then(function(response){
			console.log(response);
			product.allProducts = response.data.data ;
			cartsService.getAllItemDetails(response.data.data);
		} , function(reason){

			console.log(reason);
			alert("Some error occured!");
		});

	}; // end of viewAllProducts


	this.viewByCategories = function (categoryType) {

		product.showAllProducts = false ;
		product.showByCategory = true ;

		getProductsService.getProductsByCategory(categoryType)
		.then(function(response){
			console.log(response);
			product.categoricalProducts = response.data.data ;

		} , function(reason){

			console.log(reason);
			alert("Some error occured!");
		});

	};// end of viewByCategories function
}]) ; // end of controller