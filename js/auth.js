console.log("if u dont see this it aint werk");

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAuEY3ajMcu2qIYsha8tT1TEVtCSDkUzBw",
    authDomain: "kotlintry-f6729.firebaseapp.com",
    databaseURL: "https://kotlintry-f6729.firebaseio.com",
    projectId: "kotlintry-f6729",
    storageBucket: "kotlintry-f6729.appspot.com",
    messagingSenderId: "428608128780",
    appId: "1:428608128780:web:d91389f3bf5cbe0d7feb29"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



var db = firebase.firestore(); //firestore constant
const auth = firebase.auth(); //auth constant


function register(){
	var inputEmail = document.getElementById("email");
	var inputPass = document.getElementById("pass");

	var inputfName = document.getElementById("fname").value;
	var inputlName = document.getElementById("lname").value;
	//const promise = auth.createUserWithEmailAndPassword(inputEmail.value, inputPass.value);
	//promise.catch(e=> alert(e.message));
	
	firebase.auth().createUserWithEmailAndPassword(inputEmail.value, inputPass.value)
	.then(function(data){
		var uidGet = data.user.uid; //unique Id
 		 console.log('uid',data.user.uid); //displays newly created user's unique ID in the console

  		db.collection("users").doc(uidGet).set({
	    fname: inputfName,
	    lname: inputlName,
	    role: "1", //1 - resident, 2 - official, 3 - admin;
	    uid: uidGet
		});



	})
	.catch(function(error) {
    	alert(error);
	});
	

	//setTimeout("location.href = 'modules/residents/resfeed.html';",7000);
}


firebase.auth().onAuthStateChanged(firebaseUser=> {
		if(firebaseUser){
			
			console.log(firebaseUser); //displays CURRENTLY logged in user data
			console.log("^ logged in.")
			setTimeout("location.href = 'modules/residents/resfeed.html';",2500);
		}
		else {
			console.log('no one logged in.');
		}
	});
//AUTOMATICALLY LOGGED IN AFTER CREATING AN ACCOUNT.

const loginEmail = document.getElementById('email_login');
const loginPass = document.getElementById('pass_login');


	btnLogin.addEventListener('click', e => {
		const email = loginEmail.value;
		const pass = loginPass.value;

		const promise = auth.signInWithEmailAndPassword(email,pass);
		
		promise.catch(e => window.alert(e.message));
		
	});


	
//login
/*
function login(){

	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.replace("modules/residents/resfeed.html");
  } else {
    // No user is signed in.
  }
	});

	var userEmail = document.getElementById("email_login").value;
	var userPass = document.getElementById("password_login").value;

	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  	// Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;

  	window.alert("error" + error);
  	// ...
});
}*/





//logout

////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
var inputfName = document.getElementById("fname").value;
	var inputlName = document.getElementById("lname").value;
db.collection("users").doc(uid).set({
		    fname: inputfName,
		    lname: inputlName,
		    uid: user.uid
		    //role: Resident
		})
		.then(function() {
			//window.alert("Document successfully written!");
		    console.log("Document successfully written!");
		})
		.catch(function(error) {
			//window.alert("Error writing document: ", error);
		    console.error("Error writing document: ", error);

		});
*/

/*function newUser(){

	var inputfName = document.getElementById("fname").value;
	var inputlName = document.getElementById("lname").value;
	var inputEmail = document.getElementById("email").value;
	var inputPass = document.getElementById("password").value;
	// Add a new document in collection "cities"

	db.collection("users").doc().set({
	    fname: inputfName,
	    lname: inputlName,
	    email: inputEmail,
	    password: inputPass
	    //role: Resident
	})
	.then(function() {
		//window.alert("Document successfully written!");
	    console.log("Document successfully written!");
	})
	.catch(function(error) {
		//window.alert("Error writing document: ", error);
	    console.error("Error writing document: ", error);

	});

}*/