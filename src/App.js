import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Main} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="*" Component={Profile}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
