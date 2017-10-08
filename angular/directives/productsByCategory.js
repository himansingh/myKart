myApp.directive('productsByCategory',function(){

	return{
			restrict : 'E',
			templateUrl : 'templates/productsByCategory-template.html',
			scope : {
				itemsByCatergory :'='
			},

			controller : 'productsTemplateController',

			link : function(scope , element , attrs){

				angular.element('.card-fade').fadeOut('fast');
				element.on('mouseenter', function(){
					angular.element(this).find('.card-fade').fadeIn('fast');
				});

				element.on('mouseleave', function(){
					angular.element(this).find('.card-fade').fadeOut('fast');
				});
				
			} // end of link function
						
	} // end of return
}); // end of productsByCategory