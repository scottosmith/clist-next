import { createResult } from '@/lib/db';
import { Flex, Box, Image, VStack } from '@chakra-ui/react';

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
    <Box w="350px" h="350px" m="1" border="1px solid black" tabIndex={tab}>
      <Flex w="100%" direction="column" justify="space-between" align="stretch">
        <a href={postUrl} target="_blank" rel="noopener noreferrer">
          <Box w="100%">
            <Image src={imgUrl} w="100%" />
          </Box>
          <Box p="1">
            <span>{title}</span> - <span>{price}</span>
          </Box>
        </a>
        <Box
          style={{ bottom: '0' }}
          bg="purple.500"
          color="white"
          fontSize="1rem"
          onClick={mode === 'add' ? addResult : () => removeResult(id)}
          w="100%"
        >
          {mode === 'add' ? 'Add to' : 'Remove from'} List
        </Box>
      </Flex>
    </Box>
  );
};

export default Result;
