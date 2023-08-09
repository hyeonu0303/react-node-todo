import { Link } from 'react-router-dom'
import './App.css'
import { Container,Heading } from '@chakra-ui/react'

function App() {

  return (
    <Container>
      <Heading as='h2' size='lg'>잘 완성해보자구~~</Heading>
      <Link to="/login">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </Container>
  )
}

export default App
