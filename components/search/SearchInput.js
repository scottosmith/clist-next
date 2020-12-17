import { forwardRef } from 'react';

const SearchInput = forwardRef(({ search }, ref) => {
  const submitSearch = e => {
    if (e.which === 13) {
      e.preventDefault();
      search();
    }
  };

  return (
    <main onKeyPress={submitSearch}>
      <input ref={ref} tabIndex="1" />
      <h1>
        Search <button onClick={search}>CraigsList</button>
      </h1>
    </main>
  );
});

export default SearchInput;
