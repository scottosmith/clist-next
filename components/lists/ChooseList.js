const ChooseList = ({ allLists, selectedListId, setSelectedListId }) => {
  const selectOptions = allLists.map(option => {
    return (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    );
  });

  return (
    <div>
      <select
        tabIndex="5"
        onChange={e => setSelectedListId(e.target.value)}
        value={selectedListId}
      >
        <option key="no-list-selected" value="no-list-selected">
          {allLists.length > 0 ? 'Select a List' : '-- No Lists --'}
        </option>
        {allLists && selectOptions}
      </select>
    </div>
  );
};

export default ChooseList;
