import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCEufesWQ0Wmwk5Y0BVY-1f-JqjmK9VTzw',
  authDomain: 'crwn-db-e2374.firebaseapp.com',
  projectId: 'crwn-db-e2374',
  storageBucket: 'crwn-db-e2374.appspot.com',
  messagingSenderId: '81369936313',
  appId: '1:81369936313:web:1b1b82595572e2b7c3c668',
  measurementId: 'G-Y2DM1B3ERJ',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.messeage);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
