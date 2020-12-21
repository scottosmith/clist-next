import { useState, useEffect } from 'react';
import { Box, VStack, useColorMode } from '@chakra-ui/react';

import ChooseList from '@/components/lists/ChooseList';
import AddList from '@/components/lists/AddList';
import { useAuth } from '@/lib/auth';

const Lists = ({ selectedListId, setSelectedListId }) => {
  const [allLists, setAllLists] = useState([]);
  const auth = useAuth();
  const { colorMode } = useColorMode();

  const addNewListToState = list =>
    setAllLists(allLists => [...allLists, list]);

  const getAllUserLists = async () => {
    if (!auth.loading) {
      const response = await fetch(`/api/lists`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          token: auth.user.token
        }),
        credentials: 'same-origin'
      });
      const data = await response.json();
      const sortedLists = data.lists.sort((a, b) => (a.name > b.name ? 1 : -1));
      setAllLists(sortedLists);
    }
  };

  useEffect(() => {
    getAllUserLists();
  }, [auth.loading]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-end"
      m="1rem"
      p="1rem"
      border={`1px solid ${colorMode === 'light' ? 'gainsboro' : 'dimgray'}`}
      borderRadius="5px"
      top="0"
      right="0"
      pos="fixed"
    >
      <VStack spacing="1rem">
        <AddList addNewList={addNewListToState} />
        <ChooseList
          allLists={allLists}
          selectedListId={selectedListId}
          setSelectedListId={setSelectedListId}
        />
      </VStack>
    </Box>
  );
};

export default Lists;
