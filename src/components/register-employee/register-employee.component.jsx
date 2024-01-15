import { generate } from "generate-password-browser";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { FormContainer, RegisterWrapper } from "./register-employee.styles";

import { addEmployee } from "../../utils/firebase/firebase.utils";
import { useState, useContext } from "react";

import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  idn: "",
  name: "",
  lastname: "",
  email: "",
  password: "",
};

const RegisterEmployee = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { idn, name, lastname, email } = formFields;
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const userRole = currentUser ? currentUser.role : null;
  const isVaccinated = false;

  if (userRole === 2) {
    navigate("/employeedashboard");
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateId(idn)) {
      alert("Cédula ingresada incorrecta");
      return;
    }

    const password = generate({
      length: 6,
      numbers: true,
    });

    try {
      const username = email.split("@")[0];
      const role = 2;
      await addEmployee(
        {
          idn,
          email,
          password,
          name,
          lastname,
          username,
          role,
          isVaccinated,
        },
        idn
      );
      resetFormFields();
      navigate("/admindashboard");
    } catch (error) {
      console.log("Employee creation encountered an error", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleKeyPress = (e) => {
    const char = String.fromCharCode(e.which);

    if (!/[0-9]/.test(char)) {
      e.preventDefault();
    }
  };

  const handleKeyPressLetters = (e) => {
    const char = String.fromCharCode(e.which);

    if (!/[a-zA-Z\s]/.test(char)) {
      e.preventDefault();
    }
  };

  const validateId = (idn) => {
    if (idn.toString().length !== 10) {
      return false;
    }

    const provinciaCode = parseInt(idn.toString().substring(0, 2));
    if (provinciaCode <= 0 || (provinciaCode >= 25 && provinciaCode !== 30)) {
      return false;
    }

    const digitos = idn.toString().split("").map(Number);
    const verificador = digitos.pop();

    const calculado =
      digitos.reduce(
        (prev, curr, index) =>
          prev - ((curr * (2 - (index % 2))) % 9) - (curr === 9) * 9,
        1000
      ) % 10;

    return calculado === verificador;
  };

  return (
    <RegisterWrapper>
      <FormContainer>
        <h2>Registro Nuevo Empleado</h2>
        <span>Llena los campos de registro</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Cédula"
            type="text"
            required
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            name="idn"
            value={idn}
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

          <Button type="submit">Registrar</Button>
        </form>
      </FormContainer>
    </RegisterWrapper>
  );
};

export default RegisterEmployee;
