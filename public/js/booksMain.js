console.log('Hello from the books js file!');
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

  // add user to collection

/*   db.collection("Users").add({
    firstName: "Hasan",
    lastName: "Siddiqui",
    role: 'user',
    email: 'hasansidd@gmail.com'
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    }); */

    // read data from collection
    db.collection("Users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            // to get the object
            console.log(doc.data())
        });
    });