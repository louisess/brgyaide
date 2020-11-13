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
			
			//console.log(firebaseUser); //logs CURRENTLY logged in user data
			//console.log('Currently logged in as: ', firebaseUser.email);
			
			
		}
		else {
			console.log('no one logged in.');
		}
	});

btnLogout.addEventListener('click', e =>{
		firebase.auth().signOut(); //signs out current user
		window.location.href = "../../index.html";

		
	});



//display name in feed
//const feedName = document.querySelector("#feed");
const dispUser = document.querySelector("#dispUser");
const dispFeed = document.querySelector("#feed");

firebase.auth().onAuthStateChanged((user) => {
	  if (user) {
	    // User logged in already or has just logged in.
	    //console.log(user.uid); //logs currently logged in user's UID
	    
	  } else {
	    // User not logged in or has just logged out.
	  }
	  var docRef = db.collection("users").doc(user.uid); //takes uid of current user
	  docRef.get().then(function(doc) {
	    if (doc.exists) {
	        //console.log("Document data:", doc.data());
	        console.log('Logged in as: ', doc.data().email, '||', doc.data().name);
	        
	      	dispUser.innerHTML += "<h2 class='myfont'>" +doc.data().name+  "</h2>" // displays name when logged in
	       
	    } else {
	        // doc.data() will be undefined in this case
	        console.log("No such document!");
	    }
	}).catch(function(error) {
	    console.log("Error getting document:", error);
	});
});



var URLimg = "https://firebasestorage.googleapis.com/v0/b/kotlintry-f6729.appspot.com/o/ImageFolder%2Fimage%2Fdownload.png?alt=media&token=7309790a-7384-4e18-9152-2672ba9f1323";
//no image uploaded

/*----------------------------------IMAGE UPLOAD---------------------------------*/
var btnUpload = document.getElementById('btnUpload');

	btnUpload.addEventListener('change', function(e){
		var file = e.target.files[0];

		var storageRef = firebase.storage().ref('pictures/' + file.name);	

		var task = storageRef.put(file);


		task.on('state_changed',
			function progress(snapshot){
				var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
				console.log("upload is " +progress+ "% done");

			},
			function error(err){

			},
			function url(){
				task.snapshot.ref.getDownloadURL().then(function(downloadURL){
					
					
						window.URLimg = downloadURL;
					

					

			});
			}

			);
	});
/*--------------------------------------------------------------------------------*/


var selectIssue = document.getElementById("issuedd1");

db.collection("issues").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        //console.log(doc.id, " => ", doc.data());      
				var optionIssue = document.createElement("Option");
					txtIssue = document.createTextNode(doc.get("name"));
					optionIssue.appendChild(txtIssue);
					selectIssue.insertBefore(optionIssue, selectIssue.lastChild);	
    	});
	});

	var selectBrgy = document.getElementById("issuedd2");
	db.collection("barangay").get().then(function(querySnapshot) {
	    querySnapshot.forEach(function(doc) {
	       // console.log(doc.id, " => ", doc.data.uid);
					var optionBrgy = document.createElement("Option");
						txtBrgy = document.createTextNode(doc.get("name"));
						optionBrgy.appendChild(txtBrgy);
						selectBrgy.insertBefore(optionBrgy, selectBrgy.lastChild);

						
						
						        	
	    });
	    	var brgyID = selectBrgy.options[selectBrgy.selectedIndex].id;
						//console.log('brgyID:', brgyID);
	});
	
	


function newPost(){
	var date = new Date(); // gets current date and time
	var user = firebase.auth().currentUser; //user constant
	var uidGet = user.uid; //takes unique ID
	var dscrtpn = document.getElementById("desc").value; //post description input
	var slctdBrgy = selectBrgy.options[selectBrgy.selectedIndex].text; //stores selected barangay NAME from dropdown
	var brgyID = selectBrgy.options[selectBrgy.selectedIndex].id;
	console.log('brgyID:', brgyID);
	var slctdIssue = selectIssue.options[selectBrgy.selectedIndex].text; //stores selected issue from dropdown				
	

	var checkbox = document.getElementById("anon");
	var checkMetadata = {};
	if(checkbox.checked == true){
		checkbox = true;
	}
	else {
		checkbox = false;
	}



		db.collection("posts").doc().set({
		description: dscrtpn,
		datetime: date,
		anonymous: checkbox,
		status: "Resolved", //pending dapat yung default naka resolved lang dito para madisplay ko ☮︎
		barangayName: slctdBrgy,
		barangayID: brgyID,
		issue: slctdIssue,
		userID: uidGet,
		images: URLimg
	    
		})
		.then(function() {
		    console.log("Post added!");
		})
		.catch(function(error) {
		    console.error("Error posting: ", error);
		});


}

	

/*-------------------------feed----------------------------*/


db.collection("posts").where("status", "==", "Resolved")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var datef = doc.data().datetime;
            const actualDate = datef.toDate();
            var noTZ = actualDate.toLocaleString();
var postOwner = db.collection("users").doc(doc.data().userID);

					
//window.yes = doc.data().name;
db.collection("users").doc(doc.data().userID).get().then(function(querySnapshot1){querySnapshot1.data().name
	var name = querySnapshot1.get("name");
	



dispFeed.innerHTML += 
"<div class='row'>"+
	"<div class='card' style='width:100%;'>"+
		"<div class='card-body cardo'>"+
			"<p>by <strong>"+

		name

	
						+"</strong></p>"+
			"<p class='card-text'>" +noTZ+ " | <strong>" +doc.data().issue+ "</strong> | <strong>" +doc.data().barangayName+  "</strong></p>"+
			"<p class='card-text'>" +doc.data().description+ "</p><img src='"+doc.data().images+ "' class='card-img'>"+
		"</div>"+
		"<div class='card-footer cardo'>"+

			"<div class='row'>"+
				"<div class='col-lg-6'>"+
					"<button class='btn btn-block'><i class='far fa-thumbs-up'></i>Like</button>"+
					
				"</div>"+
				"<div class='col-lg-6'>"+
					"<button class='btn btn-block'><i class='far fa-comment'></i>Comment</button>"+
					
				"</div>"+
			"</div>"+
		"</div>"+
	"</div>"+
"</div>"

})
        });

    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });


/*-------------------------feed----------------------------*/


/*


*/

/*var postOwner = db.collection("users").doc(doc.data().userID);

					postOwner.get().then(function(doc) {
					    if (doc.exists) {
					    	var yes = doc.data().name;
					    	
					       console.log("Document data:", yes);
					    } else {
					        // doc.data() will be undefined in this case
					        console.log("No such document!");
					    }

					window.yes = doc.data().name;
 	

  	

	}).catch(function(error) {
	console.log("Error getting document:", error);
});*/






//location
/*function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}
	var lat;
		 var long;

	
function showPosition(position) {
	 

	return {
       	lat: position.coords.latitude,
        long: position.coords.longitude
    }
	//console.log(position.coords.latitude);
	//console.log(position.coords.longitude);
  
}*/








/*const dispUser = document.querySelector("#dispUser");

db.collection("users").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        dispUser.innerHTML += "<h2 class='myfont'>" +doc.data().fname+ " " +doc.data().lname+ "</h2>"
    });
});*/
