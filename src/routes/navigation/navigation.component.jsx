import { Fragment, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

import { signOut } from "../../utils/firebase/firebase.utils";

import {
  NavigationContainer,
  UserInfoContainer,
  UserInfo,
  SpanLink,
  SignOutfoContainer,
} from "./navigation.styles";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  //if (!currentUser) return;

  const handleRegisterEmployee = () => {
    navigate("/register");
  };

  const handleSignOut = () => {
    signOut(currentUser.idn);
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <Fragment>
      <NavigationContainer>
        <div className="wrapper">
          <UserInfoContainer>
            {currentUser && (
              <UserInfo>Bienvenido/a {currentUser.name}</UserInfo>
            )}
          </UserInfoContainer>
          <SignOutfoContainer>
            {currentUser?.role === 1 && (
              <SpanLink onClick={handleRegisterEmployee}>
                Registrar Empleado
              </SpanLink>
            )}
            {currentUser && (
              <SpanLink onClick={handleSignOut}>Cerrar Sesión</SpanLink>
            )}
          </SignOutfoContainer>
        </div>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
