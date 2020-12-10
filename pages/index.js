import DOMParser from 'dom-parser';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';

import { useAuth } from '@/lib/auth';
import AreaSelector from '@/components/search/AreaSelector';
import CategorySelector from '@/components/search/CategorySelector';

export default function Index() {
  const auth = useAuth();
  const [searchResults, setSearchResults] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const getResults = async () => {
    const response = await fetch(
      `/api/search/${selectedArea}/${selectedCategory}/${searchValue}`
    );
    const newData = await response.json();

    if (newData) {
      let parser = new DOMParser();
      const html = parser.parseFromString(newData.html, 'text/html');
      const htmlByClass = html.getElementsByClassName('rows');

      let results = [];
      for (let match of htmlByClass[0].childNodes) {
        if (match.nodeName === 'li') {
          results.push(match);
        }
      }

      if (results.length) {
        const htmlResults = results.map(result => {
          const imgIds = result.childNodes[1].attributes[2].value.split(',');
          const imgUrl = `https://images.craigslist.org/${imgIds[0].slice(
            2
          )}_300x300.jpg`;
          const title = result.getElementsByClassName('result-title hdrlnk')[0]
            .innerHTML;
          const price = result.getElementsByClassName('result-price')[0]
            .innerHTML;
          const postUrl = result.getElementsByClassName(
            'result-image gallery'
          )[0].attributes[0].value;
          return (
            <div key={Math.random()}>
              <img src={imgUrl} />
              <span>
                <Link href={postUrl} passHref>
                  <a>{title}</a>
                </Link>{' '}
                - {price}
              </span>
            </div>
          );
        });
        return htmlResults;
      }
    }
  };

  const searchCL = async () => {
    if (!selectedArea.length) return window.alert('Please select an area!');
    if (!selectedCategory.length)
      return window.alert('Please select a category!');
    if (!searchValue.length) return;

    const results = await getResults(searchValue);
    setSearchResults(results);
  };

  return (
    <>
      <AreaSelector
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
      />
      <CategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <input
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        type="text"
      />
      <button onClick={searchCL}>Get Data</button>
      {auth.user ? (
        <div>
          <p>Email: {auth.user.email}</p>
          <button onClick={() => auth.signout()}>Sign Out</button>
        </div>
      ) : (
        <>
          <button onClick={() => auth.signinWithGitHub()}>GitHub SignIn</button>
          <button onClick={() => auth.signinWithGoogle()}>Google SignIn</button>
        </>
      )}
      {searchResults && searchResults.map(result => result)}
    </>
  );
}
