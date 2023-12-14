import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Transaction from "./pages/Transaction";
// import UserContext from './contexts/UserContext';
import { UserProvider } from "./contexts/UserContext";

function App() {
  const [userObj, setUserObj] = useState({
    token: "",
    user: { id: "", name: "", userName: "", email: "" },
  });

  return (
    // <UserContext.Provider value={userObj}>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/transaction/:id" element={<Transaction />} />

          {/* <Route path="contact" element={<Contact />} /> */}
          <Route path="*" element={<NoPage />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
