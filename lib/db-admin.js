import { db } from './firebase-admin';

export async function getLists() {
  try {
    const snapshot = await db.collection('lists').get();

    const lists = [];
    snapshot.forEach(doc => {
      lists.push({ id: doc.id, ...doc.data() });
    });

    return { lists };
  } catch (error) {
    return { error };
  }
}
