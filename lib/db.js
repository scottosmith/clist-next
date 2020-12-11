import firebase from './firebase';

const firestore = firebase.firestore();

export function updateUser(uid, data) {
  return firestore.collection('users').doc(uid).update(data);
}

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createList(data) {
  return firestore.collection('lists').add(data);
}

export function getLists() {
  return firestore.collection('lists').get();
}
