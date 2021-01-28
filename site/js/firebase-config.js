// var config = {
//   apiKey: "AIzaSyAaCKqSLjJybceKzASZSmIe88YKLQrIsWg",
//   authDomain: "afnan-s-china-bistro.firebaseapp.com",
//   databaseURL: "https://afnan-s-china-bistro.firebaseio.com",
//   projectId: "afnan-s-china-bistro",
//   storageBucket: "afnan-s-china-bistro.appspot.com",
//   messagingSenderId: "782208850671",
//   appId: "1:782208850671:web:bd13eeb741c4a18bed591a",
//   measurementId: "G-QVSDHHSDFD"
//   };
//   if (!firebase.apps.length) {
//     firebase.initializeApp(config);
//   }
//   firebase.analytics();

//   const auth = firebase.auth();
//   const db = firebase.firestore();

//   // update firestore settings
//   db.settings({ timestampsInSnapshots: true });

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
  //const storage = firebase.storage().ref();
  // update firestore settings
  db.settings({ timestampsInSnapshots: true });

  //console.log(storage);