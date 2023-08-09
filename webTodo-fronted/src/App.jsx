import './App.css'
import Main from './pages/main/mainPage'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  fonts: {
    body: 'Pretendard-Regular, sans-serif',
    heading: 'Pretendard-Regular, sans-serif',
    mono: 'Pretendard-Regular, monospace',
  },
});

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Main></Main>
    </ChakraProvider>
  )
}

export default App
