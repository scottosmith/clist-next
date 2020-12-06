import DOMParser from "dom-parser";
import { useState } from "react";

function Index() {
  const [searchResults, setSearchResults] = useState(null);

  const fetchData = async () => {
    const req = await fetch("/api/search/stlouis/pho/nikon");
    const newData = await req.json();

    if (newData) {
      let parser = new DOMParser();
      const html = parser.parseFromString(newData.html, "text/html");
      const htmlByClass = html.getElementsByClassName("rows");

      let results = [];
      for (let match of htmlByClass[0].childNodes) {
        if (match.nodeName === "li") {
          results.push(match);
        }
      }

      if (results.length) {
        const htmlResults = results.map((result) => {
          const imgIds = result.childNodes[1].attributes[2].value.split(",");
          const imgUrl = `https://images.craigslist.org/${imgIds[0].slice(
            2
          )}_300x300.jpg`;
          const title = result.getElementsByClassName("result-title hdrlnk")[0]
            .innerHTML;
          const price = result.getElementsByClassName("result-price")[0]
            .innerHTML;
          const postUrl = result.getElementsByClassName(
            "result-image gallery"
          )[0].href;
          return (
            <div key={Math.random()}>
              <img src={imgUrl} />
              <span>
                {title} - {price}
              </span>
              <a href={postUrl}>{title}</a>
            </div>
            // <img
            //   key={imgIds[0].slice(2)}
            //   src={`https://images.craigslist.org/${imgIds[0].slice(2)}_300x300.jpg`}
            // />
          );
        });
        setSearchResults(htmlResults);
      }
    }
  };

  return (
    <>
      <button onClick={fetchData}>Get Data</button>
      {searchResults ? searchResults.map((result) => result) : <p>nothing</p>}
    </>
  );
}

export default Index;
