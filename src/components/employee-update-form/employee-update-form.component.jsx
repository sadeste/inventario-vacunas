import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { useNavigate, useLocation } from "react-router-dom";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { updateEmployee } from "../../utils/firebase/firebase.utils";

import {
  EmployeeWrapper,
  FormEditContainer,
} from "./employee-update-form.styles";

const UpdateEmployee = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { employee } = state;
  const defaultFormFields = {
    name: employee.name,
    lastname: employee.lastname,
    email: employee.email,
    password: employee.password,
  };
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { name, lastname, email, password } = formFields;

  const userRole = currentUser ? currentUser.role : null;

  if (userRole === 2) {
    navigate("/employeedashboard");
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateEmployee(employee.idn, {
        email,
        password,
        name,
        lastname,
      });
      resetFormFields();
      navigate("/admindashboard");
    } catch (error) {
      console.log("Employee creation encountered an error", error);
    }
  };

  const handleKeyPressLetters = (e) => {
    const char = String.fromCharCode(e.which);

    if (!/[a-zA-Z\s]/.test(char)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <EmployeeWrapper>
      <FormEditContainer>
        <h2>Registro Nuevo Empleado</h2>
        <span>Llena los campos de registro</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Cédula"
            type="text"
            readOnly
            name="idn"
            value={employee.idn}
            maxLength={10}
          />

          <FormInput
            label="Nombres"
            type="text"
            required
            onChange={handleChange}
            onKeyPress={handleKeyPressLetters}
            name="name"
            value={name}
          />

          <FormInput
            label="Apellidos"
            type="text"
            required
            onChange={handleChange}
            onKeyPress={handleKeyPressLetters}
            name="lastname"
            value={lastname}
          />

          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />

          <FormInput
            label="Cambiar Contraseña"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />

          <Button type="submit">Actualizar</Button>
        </form>
      </FormEditContainer>
    </EmployeeWrapper>
  );
};

export default UpdateEmployee;
