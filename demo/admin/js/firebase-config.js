  var firebaseConfig = {
    apiKey: "AIzaSyAlumuzVIHKXYxjDBNoY7T-BS5bZydwUCk",
    authDomain: "prime-automations-ltd.firebaseapp.com",
    databaseURL: "https://prime-automations-ltd.firebaseio.com",
    projectId: "prime-automations-ltd",
    storageBucket: "prime-automations-ltd.appspot.com",
    messagingSenderId: "1078351991349",
    appId: "1:1078351991349:web:4742ee0ae0e8b12cd2577c",
    measurementId: "G-Z96VJSBQG1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage().ref();
  // update firestore settings
  db.settings({ timestampsInSnapshots: true });

  //console.log(storage);