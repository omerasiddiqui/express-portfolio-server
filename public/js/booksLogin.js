// global constiables
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const signUpBtn = document.getElementById('signUpBtn');
const welcomeMsg = document.getElementById('welcomeMsg');
const testElement = document.getElementById('test');

 // Your web app's Firebase configuration
 const firebaseConfig = {
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
  
  // create constiable for database
  const db = firebase.firestore();

  // log in the user
  loginBtn.addEventListener('click', function() {
    
    const email = document.getElementById('email_field').value;
    const pass = document.getElementById('password_field').value;
    const auth = firebase.auth();
    console.log(`email: ${email} && password: ${pass}`);

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => {console.log(error.message)});
  })

  // log out the user
  logoutBtn.addEventListener('click', function() {
    const auth = firebase.auth();
    auth.signOut().then(function() {
        // Sign-out successful.
        console.log('logged out user');
      }).catch(function(error) {
        // An error happened.
        console.log(`error: ${error}`);
      });
  })

  // sign up new user
  signUpBtn.addEventListener('click', function() {
      const email = document.getElementById('email_field').value;
      const pass = document.getElementById('password_field').value;
      const auth = firebase.auth();
      console.log(`email: ${email} && password: ${pass}`);

      const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));
  })

  // fetch user info
  testElement.addEventListener('click', function() {
    const user = firebase.auth().currentUser;
    let name, email, photoUrl, uid, emailVerified;
    let userJsonData;

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
  });

  // firebase auth checking for logged in/out
  firebase.auth().onAuthStateChanged(function(user) {

    if(user) {
        var userInfo = firebase.auth().currentUser;

        console.log('user is signed in!');
        console.log(firebase.auth().currentUser)
        document.getElementById('books-loggedIn-div').style.display = "flex";
        document.getElementById('books-main-div').style.display = "none";

        welcomeMsg.innerHTML = `<strong>${userInfo.email}</strong> is currently logged in.`;
        resetInputs();

    } else {

        console.log('no user signed in')
        document.getElementById('books-loggedIn-div').style.display = "none";
        document.getElementById('books-main-div').style.display = "flex";

        resetInputs();
    }
  })

  function resetInputs() {
    document.getElementById('email_field').value = "";
    document.getElementById('password_field').value = "";
  }
    