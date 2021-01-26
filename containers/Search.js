import { useState, useRef } from 'react';
import { Box, VStack, IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import AreaSelector from '@/components/search/AreaSelector';
import CategorySelector from '@/components/search/CategorySelector';
import SearchInput from '@/components/search/SearchInput';
import SearchResults from '@/components/search/SearchResults';

const Search = ({ selectedListId }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchResults, setSearchResults] = useState(null);
  const searchValue = useRef('');
  const selectedArea = useRef('');
  const selectedCategory = useRef('');

  const getResults = async () => {
    try {
      const results = [];
      const response = await fetch(
        `/api/search/${selectedArea.current.value}/${selectedCategory.current.value}/${searchValue.current.value}`
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
    if (!selectedArea.current.value.length)
      return window.alert('Please select an area!');
    if (!selectedCategory.current.value.length)
      return window.alert('Please select a category!');
    if (!searchValue.current.value.length) return;

    const results = await getResults();
    setSearchResults(results);
  };

  const submitSearch = e => {
    if (e.which === 13) {
      e.preventDefault();
      searchCL();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
      onKeyPress={submitSearch}
    >
      <VStack spacing="1rem" w="24rem" p="1rem">
        <IconButton onClick={toggleColorMode}>
          {colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        </IconButton>
        <AreaSelector ref={selectedArea} />
        <CategorySelector ref={selectedCategory} />
        <SearchInput ref={searchValue} search={searchCL} />
      </VStack>
      {searchResults && (
        <SearchResults
          results={searchResults}
          selectedListId={selectedListId}
        />
      )}
    </Box>
  );
};

export default Search;
