import { db } from './firebase-admin';

export async function getUserLists(uid) {
  try {
    const snapshot = await db
      .collection('lists')
      .where('userId', '==', uid)
      .get();

    const lists = [];
    snapshot.forEach(doc => {
      lists.push({ id: doc.id, ...doc.data() });
    });

    return { lists };
  } catch (error) {
    return { error };
  }
}
