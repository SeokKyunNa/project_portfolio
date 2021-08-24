import styled, { css } from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import UserSign from './UserSign/UserSign.jsx';
import UserInfo from './UserInfo/UserInfo.jsx';
import UserList from './UserList/UserList.jsx';


const Container = styled.div`
  background-color: #dfe6ed;
  height: 100%;
`

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* 로그인 여부에 따라서 root path 상태 선택 (로그인 화면 or 메인 화면) */}
        <Route exact path="/">
          <UserSign />
        </Route>
        {/* 로그인 화면 */}
        <Route path="/signin"/>
        {/* 메인 화면 (내 정보) */}
        <Route path="/info/:user_id" component={UserInfo} />
        {/* 네트워크 화면 (사용자 목록) */}
        <Route path="/userlist"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
