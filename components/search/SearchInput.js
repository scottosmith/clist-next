import { forwardRef } from 'react';
import { Input, Button, Text } from '@chakra-ui/react';

const SearchInput = forwardRef(({ search }, ref) => {
  return (
    <>
      <Input fontSize="xl" ref={ref} tabIndex="3" padding="1.5rem" />
      <Text fontSize="4xl" fontWeight="bold">
        Search{' '}
        <Button
          onClick={search}
          fontSize="4xl"
          tabIndex="4"
          colorScheme="purple"
          size="lg"
          padding="1.75rem"
        >
          cList
        </Button>
      </Text>
    </>
  );
});

export default SearchInput;
