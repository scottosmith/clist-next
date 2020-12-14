import { useState } from 'react';

import AreaSelector from '@/components/search/AreaSelector';
import CategorySelector from '@/components/search/CategorySelector';
import SearchInput from '@/components/search/SearchInput';
import SearchResults from '@/components/search/SearchResults';

const Search = ({ selectedListId }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const getResults = async () => {
    try {
      const results = [];
      const response = await fetch(
        `/api/search/${selectedArea}/${selectedCategory}/${searchValue}`
      );
      const newData = await response.json();

      if (newData) {
        let parser = new DOMParser();
        const html = parser.parseFromString(newData.html, 'text/html');
        const htmlByClass = html.getElementsByClassName('rows');

        for (let match of htmlByClass[0].childNodes) {
          if (match.nodeName === 'LI') {
            results.push(match);
          }
        }
      }
      return results;
    } catch (error) {
      throw error;
    }
  };

  const searchCL = async () => {
    if (!selectedArea.length) return window.alert('Please select an area!');
    if (!selectedCategory.length)
      return window.alert('Please select a category!');
    if (!searchValue.length) return;

    const results = await getResults(searchValue);
    console.log(results);
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
      <SearchInput
        value={searchValue}
        changed={setSearchValue}
        search={searchCL}
      />
      {searchResults && (
        <SearchResults
          results={searchResults}
          selectedListId={selectedListId}
        />
      )}
    </>
  );
};

export default Search;
