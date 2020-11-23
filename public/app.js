
var firebaseConfig = {
  apiKey: "AIzaSyC1NDMkJMWul67ZVv8nQhHjVY_Hkz2ZlHo",
  authDomain: "filesafe-2020.firebaseapp.com",
  databaseURL: "https://filesafe-2020.firebaseio.com",
  projectId: "filesafe-2020",
  storageBucket: "filesafe-2020.appspot.com",
  messagingSenderId: "843510574179",
  appId: "1:843510574179:web:af72b9bb5c2bc4376bdc56"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var database = firebase.database();


// xxxxxxxxxxxxxxxxxxxxxxxxxx Email Validation xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
function checkUserEmail(){
    var userEmail = document.getElementById("email").value;
    //var userEmailFormate = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    alert("Invalid Email "+userEmail);
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword(){
    var userPassword = document.getElementById("password").value;
    //var userPasswordFormate = /[A-Za-z0-9].{6,15}/;      
    alert("Invalid Password "+password)
}

// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(){

  var userEmail = document.getElementById("email").value;
  var userPassword = document.getElementById("password").value;  
/*   var userEmailFormate = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  var userPasswordFormate = /[A-Za-z0-9].{6,15}/;      

  var checkUserEmailValid = userEmail.match(userEmailFormate);
  var checkUserPasswordValid = userPassword.match(userPasswordFormate); */

  if(userEmail == null){
      return checkUserEmail();
  }else if(userPassword == null){
      return checkUserPassword();
  }else{
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {

          var firebaseRef = firebase.database().ref().child("Users");
          var userID = firebase.auth().currentUser.uid;
          var usersRef = firebaseRef.child(userID);
          var userData = {
              "userEmail": userEmail,
              "userPassword": userPassword
          };
          firebaseRef.set(userData);
          swal('Your Account Created'," ",'Your account was created successfully, you can log in now.',
          ).then((value) => {
              setTimeout(function(){
                  window.location.replace("new.html");
              }, 1000)
          });
      }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          swal({
              type: 'error',
              title: errorCode,
              text: errorMessage,
          })
      });
  }
}

//---------------------------------------------------------------------------
function checkUserSIEmail(){
  var userSIEmail = document.getElementById("email").value;
  alert("Invalid Email"+userSIEmail);
  
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword(){
  var userSIPassword = document.getElementById("password").value;
  alert("Invalid password"+userSIpassword)
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx    
function signIn(){
  var userSIEmail = document.getElementById("email").value;
  var userSIPassword = document.getElementById("password").value;
  /* var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

  var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
  var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate); */

  if(userSIEmail == null){
    return checkUserEmail();
}else if(userSIPassword == null){
    return checkUserPassword();
}else{
      firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
          swal({
              type: 'successfull',
              title: 'Succesfully signed in', 
          }).then((value) => {
              setTimeout(function(){
                  window.location.replace("new.html");
              }, 1000)
          });
      }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          swal({
              type: 'error',
              title: errorCode,
              text: errorMessage,
          })
      });
  }
}

// xxxxxxxxxxxxxxxxxxxxxxSignOutxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        swal({
            type: 'successfull',
            title: 'Signed Out', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("index.html");
            }, 1000)
        });
    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: errorMessage,
        })
    });
}