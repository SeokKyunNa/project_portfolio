import styled, { css } from 'styled-components';
import UserSign from './UserSign/UserSign.jsx';

const Container = styled.div`
  background-color: #dfe6ed;
  height: 100%;
`

function App() {
  return (
    <Container>
      <UserSign />
    </Container>
  );
}

export default App;
