// // listen for auth status changes
// auth.onAuthStateChanged(user => {
//   if (user) {
//     //if (user.emailVerified){
//     if(user){

//       //location.replace("dashboard.html")
//     }
//     else{
//       alert("User is not verified");
//       //auth.signOut();
//     }
//   } else {
//     console.log('user logged out');
//   }
// });
//*******************This script is just for authentication which is the index.html page **************

// Signup 
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const userEmail = signupForm['signup-email'].value;
  const userPassword = signupForm['signup-password'].value;
  const userName = signupForm['signup-username'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(userEmail, userPassword).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      username: userName,
      email: userEmail,
      imageUrl: "default-avatar.jpg"
    });
  }).then(() => {
    // close the signup modal & reset form
    //const modal = document.querySelector('#modal-signup');
    //M.Modal.getInstance(modal).close();
    signupForm.reset();
    auth.signOut().then(()=>{
      location.replace("index.html");
    });
    
  });
});


// Login 
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  var userEmail = loginForm["login-email"].value;
  var userPass = loginForm["login-password"].value;
  //console.log(userEmail);

  auth.signInWithEmailAndPassword(userEmail, userPass).then(
      function(crd) {
        //console.log(crd);
        location.replace("dashboard.html");
      }
    ).catch(function(error) {
    // Handle Errors 
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });
});

const forgetPassForm = document.querySelector('#forgetPass-form');
forgetPassForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    var emailAddress = forgetPassForm['email'].value;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      console.log("Email Sent Successfully");
      location.replace("index.html");
    }).catch(function(error) {
      console.log("Error in Email Sent :"+error);
    });

});

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
