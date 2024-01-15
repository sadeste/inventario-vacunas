import { useState, useContext, useEffect } from "react";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { signIn } from "../../utils/firebase/firebase.utils";

import { LoginContainer } from "./user-login-form.styles";

import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  username: "",
  password: "",
};

const UserLoginForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password } = formFields;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const navigateBasedOnUserRole = () => {
      const userRole = currentUser ? currentUser.role : null;

      if (userRole === 2) {
        navigate("/employeedashboard");
      } else if (userRole === 1) {
        navigate("/admindashboard");
      }
    };

    navigateBasedOnUserRole();
  }, [currentUser]);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userAuth = await signIn(username, password);
      setCurrentUser(userAuth);
      resetFormFields();
      if (userAuth.role === 1) {
        navigate("/admindashboard");
      } else {
        navigate("employeedashboard");
      }
    } catch (error) {
      console.log("User sign in failed", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <LoginContainer>
      <h2>Login</h2>
      <span>Iniciar sesión con tus credenciales</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Usuario"
          type="text"
          required
          onChange={handleChange}
          name="username"
          value={username}
        />

        <FormInput
          label="Contraseña"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <Button type="submit">Iniciar Sesión</Button>
      </form>
    </LoginContainer>
  );
};

export default UserLoginForm;
