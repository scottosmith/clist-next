import { createResult } from '@/lib/db';

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
    console.log(selectedListId);
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
      const response = await createResult(resultData, selectedListId);
      console.log(response);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div tabIndex={tab}>
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
    </div>
  );
};

export default Result;
