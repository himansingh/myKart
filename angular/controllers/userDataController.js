myApp.controller('userDataController', ['$rootScope','$sessionStorage','$route','userDataService','$location', function($rootScope , $sessionStorage, $route, userDataService, $location){	

	let authToken = $sessionStorage.storedAuthToken;
	let user = this ;
	let count = 0;

	this.loadUserData = function(){
		user.data = userDataService.getStoredUserData();
		console.log("user data is", user.data);

		if(!user.data){
			let data = { authToken : authToken };

			userDataService.retrieveData(data)
			.then(function(response){
				console.log("Response of loadUserData", response);
				user.data = response.data.data ;
				console.log(user.data);
			}, function(reason){
				alert("Some error occured in load user data!");
				console.log(reason);
			});		
		}
	}(); // end of loadUserData

	this.changePassword = function(){
		let data = {
			authToken : authToken,
			oldPassword : user.oldpassword,
			newPassword : user.newpassword
		}

		userDataService.passwordReset(data)
		.then(function(response){			
			console.log("Response of changePassword", response);
			user.confirmChangePassword(response.data.error);
		}, function(reason){
			alert("Some error occured in changePassword!");
			console.log(reason);
		});
	}; // end of changePassword

	this.confirmChangePassword = function(error){
		if(!error){
			alert("Password changed successfully");
			$route.reload();
		}
		else
			alert("Old password mismatch!\nTry again");
	}; // end of confirmChangePassword

	this.showHideOrderHistory = function(){
		count++;

		if(count%2 == 0)
			user.showHistory = false ;
		else
			user.showHistory = true ;
	};
}]);