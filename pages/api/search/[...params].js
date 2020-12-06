import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
    origin: true,
  })
);

export default async function handler(req, res) {
  try {
    await cors(req, res);
    const {
      query: { params },
    } = req;

    const [area, cat, query] = params;
    const url = `https://${area}.craigslist.org/search/${cat}?query=${query}&hasPic=1`;
    const response = await fetch(url);
    const html = await response.text();
    res.status(200).json({ html });
  } catch (error) {
    throw error;
  }
}
