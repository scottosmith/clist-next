const SearchInput = ({ changed, search, value }) => {
  const submitSearch = e => {
    if (e.which === 13) {
      e.preventDefault();
      search();
    }
  };

  return (
    <main onKeyPress={submitSearch}>
      <input
        value={value}
        onChange={e => changed(e.target.value)}
        tabIndex="1"
      />
      <h1>
        Search <button onClick={search}>CraigsList</button>
      </h1>
    </main>
  );
};

export default SearchInput;
