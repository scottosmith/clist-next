import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
    origin: true,
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  const [area, cat, query] = req.query.url.split("-");
  const url = `https://${area}.craigslist.org/search/${cat}?query=${query}&hasPic=1`;
  const response = await fetch(url);
  const text = await response.text();
  res.json({ html: text });
}
