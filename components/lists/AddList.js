import { useRef } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';

import { createList } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const AddList = ({ addNewList }) => {
  const listName = useRef('');
  const auth = useAuth();

  const keyPressHandler = async e => {
    if (e.which === 13) {
      e.preventDefault();
      await addList();
    }
  };

  const addList = async name => {
    const newList = {
      userId: auth.user.uid,
      name: listName.current.value
    };
    const response = await createList(newList);
    const newListWithId = {
      ...newList,
      id: response.id
    };
    addNewList(newListWithId);
    listName.current.value = '';
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Input
        ref={listName}
        type="text"
        onKeyPress={keyPressHandler}
        mr="0.5rem"
        size="sm"
      />
      <Button
        onClick={() => addList()}
        colorScheme="purple"
        w="6.5rem"
        size="sm"
      >
        Add List
      </Button>
    </Box>
  );
};

export default AddList;
