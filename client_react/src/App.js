import { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import UserSign from './UserSign/UserSign.jsx';
import UserInfo from './UserInfo/UserInfo.jsx';
import UserList from './UserList/UserList.jsx';
import { UserContext } from './context/UserContext';
import JwtTest from './JwtTest'


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
            {myIdContext.myId ? <Redirect to="/myinfo" /> : <Redirect to="/signin" /> }
          </Route>
          {/* 로그인 화면 */}
          <Route path="/signin">
            { myIdContext.myId ? <Redirect to="/myinfo" /> : <UserSign /> }
          </Route>
          {/* 회원가입 화면 */}
          <Route path="/signup">
            { myIdContext.myId ? <Redirect to="/myinfo" /> : <UserSign /> }
          </Route>
          {/* 메인 화면 (내 정보) */}
          <Route path="/myinfo" component={UserInfo} />
          {/* 사용자 정보 화면 */}
          <Route path="/info/:user_id">
            { myIdContext.myId ? <UserInfo /> : <Redirect to ="/signin" /> }
          </Route>
          {/* 네트워크 화면 (사용자 목록) */}
          <Route path="/userlist">
          { myIdContext.myId ? <UserList /> : <Redirect to ="/signin" /> }
          </Route>
          <Route path="/whoami" component={JwtTest} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
