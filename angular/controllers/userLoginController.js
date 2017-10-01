myApp.controller('userLoginController', ['userDataService','$sessionStorage','$location', function(userDataService, $sessionStorage, $location){

	let ulc = this ;

	this.userLogin = function(){

		let loginData = {
			email		: ulc.email,
			password 	: ulc.password
		};

		userDataService.login(loginData)
		.then(function(response){
			console.log("Response of user Login", response);
			ulc.afteSuccessfullLogin(response);
		}, function(reason){
			alert("Some error occured!");
			console.log(reason);
		});
	}; // end of userLogin function

	this.afteSuccessfullLogin = function(response){
		if(!response.data.error){
			$sessionStorage.storedAuthToken = response.data.data['auth-token'] ;
			$location.path('/cart');
		}
		else {
			alert(" Invalid email or password \nPlease try again.");
		}
	}; // end of after successful login
}]); // end of controller