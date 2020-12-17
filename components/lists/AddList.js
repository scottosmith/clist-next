import { useRef } from 'react';

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
    <div>
      <input ref={listName} type="text" onKeyPress={keyPressHandler} />
      <button onClick={() => addList()}>Add List</button>
    </div>
  );
};

export default AddList;
