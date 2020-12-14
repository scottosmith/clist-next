import { useState, useEffect, useMemo, useCallback } from 'react';

import ChooseList from '@/components/lists/ChooseList';
import AddList from '@/components/lists/AddList';
import { useAuth } from '@/lib/auth';

const Lists = ({ selectedListId, setSelectedListId }) => {
  const [allLists, setAllLists] = useState([]);
  const auth = useAuth();

  const addNewListToState = list =>
    setAllLists(allLists => [...allLists, list]);

  const getAllUserLists = useCallback(async () => {
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
      setAllLists(data.lists);
    }
  }, [auth.loading]);

  useEffect(() => {
    getAllUserLists();
  }, [getAllUserLists]);

  const sortedLists = useMemo(
    () => allLists.sort((a, b) => (a.name > b.name ? 1 : -1)),
    [allLists]
  );

  return (
    <>
      <AddList addNewList={addNewListToState} />
      <ChooseList
        allLists={sortedLists}
        selectedListId={selectedListId}
        setSelectedListId={setSelectedListId}
      />
    </>
  );
};

export default Lists;
