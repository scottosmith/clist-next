import { useEffect, useState } from 'react';

import Result from '@/components/search/Result';

const SearchResults = ({ results, selectedListId }) => {
  const [mappedResults, setMappedResults] = useState(null);

  const mapResults = results => {
    return results.map((result, index) => {
      const imgIds = result.firstElementChild.dataset.ids.split(',');
      const imgUrl = `https://images.craigslist.org/${imgIds[0].slice(
        2
      )}_300x300.jpg`;
      const title = result.getElementsByClassName('result-title hdrlnk')[0]
        .innerHTML;
      const price = result.getElementsByClassName('result-price')[0].innerHTML;
      const postUrl = result.getElementsByClassName('result-image gallery')[0]
        .attributes[0].value;
      return (
        <Result
          title={title}
          price={price}
          postUrl={postUrl}
          imgUrl={imgUrl}
          key={result.dataset.pid}
          id={result.dataset.pid}
          tab={index + 6}
          selectedListId={selectedListId}
          mode="add"
        />
      );
    });
  };

  useEffect(() => {
    if (results.length) {
      const htmlResults = mapResults(results);
      setMappedResults(htmlResults);
    } else {
      setMappedResults('No results!');
    }
  }, [results]);

  return <div>{mappedResults}</div>;
};

export default SearchResults;
