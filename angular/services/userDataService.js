myApp.service('userDataService', ['$http', function($http){

	let baseUrl = 'https://ecommerceapi.edwisor.com/api/v1/user/';
	let main= this ;

	this.login = function (data) {
		
		return $http ({ method : 'POST', url : baseUrl + '/login' , params : data  })
	} ;

	this.signup = function (data) {
		
		return $http ({ method : 'POST', url : baseUrl + 'signup', params : data })
	} ;

	this.retrieveData = function(data){

		return $http({ method : 'GET', url : baseUrl + 'myaccount', params : data })
	} ;

	this.passwordReset = function(data){

		return $http({ method : 'POST', url : baseUrl + 'changepassword', params : data })	
	} ;

	this.logout = function(data){

		return $http({ method : 'POST', url : baseUrl + 'logout', params : data })
	} ;
	
	this.storeUserData = function(data){
		main.userData = data.data ;
	}

	this.getStoredUserData = function(){
		return main.userData ;
	}

}]); // end of service