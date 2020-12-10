import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
    origin: true
  })
);

export default async function handler(req, res) {
  try {
    await cors(req, res);

    const response = await fetch('https://reference.craigslist.org/Areas');
    const data = await response.json();
    const areas = data.filter(area => area.Country === 'US');
    areas.sort((a, b) => {
      if (a.Region < b.Region) return -1;
      if (a.Region > b.Region) return 1;
      return 0;
    });

    res.status(200).json({ areas });
  } catch (error) {
    res.status(500).json({ error });
  }
}
