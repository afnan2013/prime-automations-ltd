var config = {
  apiKey: "AIzaSyAaCKqSLjJybceKzASZSmIe88YKLQrIsWg",
  authDomain: "afnan-s-china-bistro.firebaseapp.com",
  databaseURL: "https://afnan-s-china-bistro.firebaseio.com",
  projectId: "afnan-s-china-bistro",
  storageBucket: "afnan-s-china-bistro.appspot.com",
  messagingSenderId: "782208850671",
  appId: "1:782208850671:web:bd13eeb741c4a18bed591a",
  measurementId: "G-QVSDHHSDFD"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  firebase.analytics();

  const auth = firebase.auth();
  const db = firebase.firestore();

  // update firestore settings
  db.settings({ timestampsInSnapshots: true });