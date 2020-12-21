import { Box, Select, Button } from '@chakra-ui/react';

const ChooseList = ({ allLists, selectedListId, setSelectedListId }) => {
  const selectOptions = allLists.map(option => {
    return (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    );
  });

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Select
        tabIndex="5"
        onChange={e => setSelectedListId(e.target.value)}
        value={selectedListId}
        fontSize="sm"
        mr="0.5rem"
        size="sm"
      >
        <option key="no-list-selected" value="no-list-selected">
          {allLists.length > 0 ? 'Select a List' : '-- No Lists --'}
        </option>
        {allLists && selectOptions}
      </Select>
      <Button colorScheme="purple" w="6.5rem" size="sm">
        View List
      </Button>
    </Box>
  );
};

export default ChooseList;
