import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { useSelector } from "react-redux";
import Create from "./components/create/Create";
import PostView from "./components/postView/PostView";
import PostViewPage from "./pages/postViewPage/PostViewPage";

function App() {
  const { createTab, postTab } = useSelector((state) => state.tabs);
  const { id } = useSelector((state) => state.userInformations);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Main} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/p/*" Component={PostViewPage} />
          <Route path="*" Component={Profile} />
        </Routes>
      </BrowserRouter>

      {id ? <div>{createTab ? <Create /> : null}</div> : null}
      {id ? <div>{postTab ? <PostView /> : null}</div> : null}
    </div>
  );
}

export default App;
