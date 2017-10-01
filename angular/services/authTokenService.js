myApp.service('authTokenService', ['$sessionStorage', function($sessionStorage){

	let main = this;

	this.storeAuthToken = function(token){

		$sessionStorage.storedAuthToken = token ;
		main.setUserLoginStatus(true);
	} ;

	this.setUserLoginStatus = function(value){
		$sessionStorage.isUserLoggedin = value ;
	} ;

}]);