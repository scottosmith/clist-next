import { CSSReset, ChakraProvider, useColorModeValue } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';

import { AuthProvider } from '@/lib/auth';

const App = ({ Component, pageProps }) => {
  const GlobalStyle = ({ children }) => {
    const color = useColorModeValue('white', '#262626');

    return (
      <>
        <CSSReset />
        <Global
          styles={css`
            html {
              min-width: 360px;
              scroll-behavior: smooth;
            }
            body {
              background-color: ${color};
              padding: 0;
              margin: 0;
            }
          `}
        />
        {children}
      </>
    );
  };

  return (
    <AuthProvider>
      <ChakraProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
};

export default App;
