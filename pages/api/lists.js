import { auth } from '@/lib/firebase-admin';
import { getUserLists } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { lists } = await getUserLists(uid);

    res.status(200).json({ lists });
  } catch (error) {
    res.status(500).json({ error });
  }
};
