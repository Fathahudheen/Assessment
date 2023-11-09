import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import { useSelector } from "react-redux";
import Admin from "./components/Admin";

const App = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={isLoggedIn ?(<Welcome /> ): (<Login /> )}/>


          {/* {isLoggedIn ? (
            <Route path="/user" element={<Welcome />} />
          ) : (
            <Route path="/login" element={<Login />} />
          )} */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
