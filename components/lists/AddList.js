import { useState } from 'react';

import { createList } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const AddList = ({ addNewList }) => {
  const [listName, setListName] = useState('');
  const auth = useAuth();

  const keyPressHandler = async e => {
    if (e.which === 13) {
      e.preventDefault();
      await addList(newListName);
    }
  };

  const addList = async name => {
    const newList = {
      userId: auth.user.uid,
      name
    };
    const response = await createList(newList);
    const newListWithId = {
      ...newList,
      id: response.id
    };
    addNewList(newListWithId);
    setListName('');
  };

  return (
    <div>
      <input
        value={listName}
        onChange={e => setListName(e.target.value)}
        type="text"
        onKeyPress={keyPressHandler}
      />
      <button onClick={() => addList(listName)}>Add List</button>
    </div>
  );
};

export default AddList;
