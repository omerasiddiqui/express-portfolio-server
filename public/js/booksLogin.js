console.log('Hello from the login books js file!');
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyD-dXlg-lmzYJgNyvS6EtbJdXQWVsI0aVg",
    authDomain: "bookscrud-4f00a.firebaseapp.com",
    databaseURL: "https://bookscrud-4f00a.firebaseio.com",
    projectId: "bookscrud-4f00a",
    storageBucket: "bookscrud-4f00a.appspot.com",
    messagingSenderId: "4015088975",
    appId: "1:4015088975:web:55628d6801600698b3913a",
    measurementId: "G-FZ9BSKEHBS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  // create variable for database
  var db = firebase.firestore();

  // firebase authentication checking for logged in user
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.

      document.getElementById('books-loggedIn-div').style.display = "flex";
      document.getElementById('books-main-div').style.display = "none";
    } else {
      // No user is signed in.

      document.getElementById('books-loggedIn-div').style.display = "none";
      document.getElementById('books-main-div').style.display = "flex";
    }
  });

  var loginBtn = document.getElementById('loginBtn');
  var logoutBtn = document.getElementById('logoutBtn');
  var googleLogIn = document.getElementById('googleLoginBtn');


  // log in the user
  loginBtn.addEventListener('click', function() {
    
    var emailValue = document.getElementById('email_field').value;
    var passwordValue = document.getElementById('password_field').value;
    console.log(`email: ${emailValue} && password: ${passwordValue}`);

      firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        

        console.log(`Error: ${errorMessage}`);
      });
  })

  // log out the user
  logoutBtn.addEventListener('click', function() {

    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('logged out user');
      }).catch(function(error) {
        // An error happened.
        console.log(`error: ${error}`);
      });
  })

  // fetch user info
  var testElement = document.getElementById('test');
  testElement.addEventListener('click', function() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    var userJsonData;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                        // this value to authenticate with your backend server, if
                        // you have one. Use User.getToken() instead.

        userJsonData = {
            'name' : name,
            'email' : email,
            'photoUrl' : photoUrl,
            'emailVerified' : emailVerified,
            'uid' : uid
        }

        console.log(userJsonData);
    }
  })

  // Google sign in

  var provider = new firebase.auth.GoogleAuthProvider();

  googleLogIn.addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log(user);
      console.log(token);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(`Error Code: ${errorCode}, error message: ${errorMessage}, error email: ${email}, credentials: ${credential}.`)
    });
  })

  // change persistence to session baased
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  


    