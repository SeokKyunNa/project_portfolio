import styled, { css } from 'styled-components';
import UserSign from './UserSign/UserSign.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';

const Container = styled.div`
  background-color: #dfe6ed;
  height: 100%;
`

function App() {
  return (
    <Container>
      <BrowserRouter>
        <NavBar />
        <Switch>
          {/* 로그인 여부에 따라서 root path 상태 선택 (로그인 화면 or 메인 화면) */}
          <Route exact Path="/">
            <UserSign />
          </Route>
          {/* 로그인 화면 */}
          <Route exact path="/signin" />
          {/* 메인 화면 (내 정보) */}
          <Route path="/myinfo" />
          {/* 네트워크 화면 (사용자 목록) */}
          <Route exact path="/userlist" />
          {/* 유저 정보 화면 */}
          <Route path="/userinfo/:id" />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
