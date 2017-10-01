 // it filters products based on price range selected by user

myApp.filter('priceFilter', function(){

	return function( input, minPrice, maxPrice){

		let output =[];

		angular.forEach(input, function(element, id){			
			if(element.productPrice >= minPrice && element.productPrice <= maxPrice){
				output.push(element);
			}
		});
		return output ;
	} // end of function being returned
}) ; // end of filter