import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  token: "",
  user: { id: "", name: "", userName: "", email: "" },
});

// export default UserContext;

export function useAuth() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
