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

firebase.auth().onAuthStateChanged(firebaseUser=> {
		if(firebaseUser){
			
			console.log(firebaseUser); //displays CURRENTLY logged in user data
			console.log("^ logged in.")
			
		}
		else {
			console.log('no one logged in.');
		}
	});

btnLogout.addEventListener('click', e =>{
		firebase.auth().signOut();
		window.location.href = "../../index.html";

		
	});



const dispUser = document.querySelector("#dispUser");
firebase.auth().onAuthStateChanged((user) => {
	  if (user) {
	    // User logged in already or has just logged in.
	    console.log(user.uid);
	  } else {
	    // User not logged in or has just logged out.
	  }
	  var docRef = db.collection("users").doc(user.uid);
	  docRef.get().then(function(doc) {
	    if (doc.exists) {
	        console.log("Document data:", doc.data());
	        dispUser.innerHTML += "<h2 class='myfont'>" +doc.data().fname+ " " +doc.data().lname+ "</h2>"
	    } else {
	        // doc.data() will be undefined in this case
	        console.log("No such document!");
	    }
	}).catch(function(error) {
	    console.log("Error getting document:", error);
	});
});








/*const dispUser = document.querySelector("#dispUser");

db.collection("users").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        dispUser.innerHTML += "<h2 class='myfont'>" +doc.data().fname+ " " +doc.data().lname+ "</h2>"
    });
});*/
