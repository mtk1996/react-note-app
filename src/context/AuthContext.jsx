import React from "react";

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [authUser, setAuthUser] = React.useState({});
  return (
    <AuthContext.Provider
      value={{ authUser: authUser, setAuthUser: setAuthUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
