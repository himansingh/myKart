myApp.controller('userSignupController', ['userDataService','$location', function(userDataService, $location){
	
	let user = this ;

	this.userSignup = function(){

		var userData = {
			firstName	: user.firstName,
			lastName	: user.lastName,
			middleName	: user.middleName,
			email		: user.email,
			address		: user.address,
			mobileNumber: user.mobileNumber,
			password	: user.password
		} ;

		userDataService.signup(userData)
		.then(function(response){
			console.log('Response of userSignup ',response);
			if(response.data.error){
				alert(response.data.message);
			}
			else{
				alert(response.data.message);
				$location.path('/login');
			}
		}, function(reason){
			alert("Error occured!");
			console.log(response);
		});

	} // end of userSignup function

}]);