import Cors from 'cors';
import initMiddleware from '@/lib/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
    origin: true
  })
);

export default async function handler(req, res) {
  try {
    await cors(req, res);

    const response = await fetch('https://reference.craigslist.org/Categories');
    const data = await response.json();
    const categories = data.filter(cat => cat.Type === 'S');
    categories.sort((a, b) => {
      if (a.Description < b.Description) return -1;
      if (a.Description > b.Description) return 1;
      return 0;
    });

    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error });
  }
}
