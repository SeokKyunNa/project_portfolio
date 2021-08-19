import styled from 'styled-components';
import UserSign from './UserSign/UserSign.jsx';

const Container = styled.div`
  background-color: #dfe6ed;
`

function App() {
  return (
    <Container>
      <UserSign />
    </Container>
  );
}

export default App;
