myApp.directive('navBar',function(){
	// everytime this directive is loaded login/logout status is checked by making http request to load userdata
	//if authToken has expired then loginin button is made visible.
	return{
			restrict : 'E',
			templateUrl : 'templates/nav-template.html',
			scope : {} ,
			controller : function($scope, $sessionStorage, userDataService, $location, $rootScope, $route){

				$scope.cartLength = $sessionStorage.cartLength ;
				
				$scope.userLogout = function(){

					data = { authToken : $sessionStorage.storedAuthToken } ;

					userDataService.logout(data)
					.then(function(response){
						console.log('response of logout',response);						
						$scope.resetSessionStorage(response.data.error);						
					},function(reason){
						console.log(reason);
					}) ;
				}; // end of userLogout function

				$scope.loadUserData = function(){

					data = { authToken : $sessionStorage.storedAuthToken } ;

					userDataService.retrieveData(data)
					.then(function(response){
						console.log("Response of loadUserData", response);
						// if authToken has expired or invalid then reset sessionStorage
						$scope.checkLogStatus(response.data);
						if(response.data.data)
							$scope.name = response.data.data.firstName ;
					}, function(reason){
						alert("Some error occured in load user data!");
						console.log(reason);
					});		
				}; // end of loadUserData

				$scope.resetSessionStorage = function(error){
					if(!error){
						alert("You have been logged out!\nPlease visit us again");
					}
					else{
						alert("Sorry for inconvenience, you were already logged out!\n Please login again");
					}
					$sessionStorage.$reset();
					$scope.checkLogStatus(true);
					if($location.path() === '/'){
						console.log($location.path());
						$route.reload();
					}
					else 
						$location.path('/');
				};

				$scope.checkLogStatus = function(data){
					if(data.error){
						console.log("Changing is logged in to false and then reset session and then reload route");
						$rootScope.isloggedIn = false ;
						$sessionStorage.$reset();
						//$route.reload();					
					}
					else{
						$rootScope.isloggedIn = true ;
						userDataService.storeUserData(data);
					}
				}; // end of checkLogStatus
					
			} // end of controller
	} // end of return
}); // end of productsByCategory