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
<<<<<<< HEAD
    <Container>
      <Heading as='h2' size='lg'>잘 완성해보자구~~</Heading>
      <Link to="/login">로그인</Link>
      <Link to="/register">회원가입</Link>
    </Container>
=======
    <ChakraProvider theme={customTheme}>
      <Main></Main>
    </ChakraProvider>
>>>>>>> feature/vera
  )
}

export default App
