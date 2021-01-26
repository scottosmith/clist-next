import { createResult } from '@/lib/db';
import { Box } from '@chakra-ui/react';

const Result = ({
  id,
  imgUrl,
  mode,
  postUrl,
  price,
  removeResult,
  selectedListId,
  tab,
  title
}) => {
  // handles adding a result to a list
  const addResult = async () => {
    // must have a list selected!
    if (selectedListId === 'no-list-selected') {
      window.alert('Please Select A List!');
      return;
    }
    // build the request data
    const resultData = {
      [id]: {
        title: title,
        imgUrl: imgUrl,
        postUrl: postUrl,
        price: price
      }
    };
    try {
      await createResult(resultData, selectedListId);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box w="30%" tabIndex={tab}>
      <a href={postUrl} target="_blank" rel="noopener noreferrer">
        <div>
          <img src={imgUrl} />
        </div>
        <div>
          <span>{title}</span> - <span>{price}</span>
        </div>
      </a>
      <div onClick={mode === 'add' ? addResult : () => removeResult(id)}>
        {mode === 'add' ? 'Add to' : 'Remove from'} List
      </div>
    </Box>
  );
};

export default Result;
