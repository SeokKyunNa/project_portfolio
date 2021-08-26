import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import UserSign from './UserSign/UserSign.jsx';
import UserInfo from './UserInfo/UserInfo.jsx';
import UserList from './UserList/UserList.jsx';
import { UserContext } from './context/UserContext';


const Container = styled.div`
  background-color: #dfe6ed;
  height: 100%;
`

function App() {
  const myIdContext = useContext(UserContext);
  useEffect(()=>{
    myIdContext.setMyIdHandler();
  }, []);
  
  return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          {/* 로그인 여부에 따라서 root path 상태 선택 (로그인 화면 or 메인 화면) */}
          <Route exact path="/">
            {myIdContext.myId ? <UserInfo /> : <Redirect to="/signin" /> }
          </Route>
          {/* 로그인 화면 */}
          <Route path="/signin">
            {myIdContext.myId ? <UserInfo /> : <UserSign /> }
          </Route>
          {/* 회원가입 화면 */}
          <Route path="/signup">
            {myIdContext.myId ? <UserInfo /> : <UserSign /> }
          </Route>
          {/* 메인 화면 (내 정보) */}
          <Route path="/info/:user_id" component={UserInfo} />
          {/* 네트워크 화면 (사용자 목록) */}
          <Route path="/userlist" component={UserList} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
