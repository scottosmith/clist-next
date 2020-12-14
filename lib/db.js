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
  const newList = firestore.collection('lists').add({
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    ...data
  });
  return newList;
}

export function createResult(data, listId) {
  const newResult = firestore
    .collection('lists')
    .doc(listId)
    .collection('results')
    .add(data);
  return newResult;
}
