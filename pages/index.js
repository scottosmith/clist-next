import Head from 'next/head';
import { useState } from 'react';

import { useAuth } from '@/lib/auth';
import Search from '@/containers/Search';
import Lists from '@/containers/Lists';

export default function Index() {
  const auth = useAuth();

  const [selectedListId, setSelectedListId] = useState('no-list-selected');

  return (
    <>
      <Head>
        <title>cList</title>
      </Head>
      <Lists
        selectedListId={selectedListId}
        setSelectedListId={setSelectedListId}
      />
      <Search
        selectedListId={selectedListId}
        setSelectedListId={setSelectedListId}
      />

      {auth.user ? (
        <div>
          <p>Email: {auth.user.email}</p>
          <button onClick={() => auth.signout()}>Sign Out</button>
        </div>
      ) : (
        <>
          <button onClick={() => auth.signinWithGitHub()}>GitHub SignIn</button>
          <button onClick={() => auth.signinWithGoogle()}>Google SignIn</button>
        </>
      )}
    </>
  );
}
