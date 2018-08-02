import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyAeo2QsAMA3ey8TV_WmRMRIg331UhZb5W4",
  authDomain: "mobiletodo-d7d30.firebaseapp.com",
  databaseURL: "https://mobiletodo-d7d30.firebaseio.com",
  projectId: "mobiletodo-d7d30",
  storageBucket: "mobiletodo-d7d30.appspot.com",
  messagingSenderId: "643025550778"
};
firebase.initializeApp(config);


const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

export { db, firebase }