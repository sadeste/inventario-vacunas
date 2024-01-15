import { useState, useContext } from "react";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { UserContext } from "../../contexts/user.context";

import { EmployeeLoginContainer } from "./employee-dashboard.styles";
import { useNavigate } from "react-router-dom";

import { updateEmployee } from "../../utils/firebase/firebase.utils";

const EmployeeDashboard = () => {
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [vaxType, setVaxType] = useState("Sputnik");
  const [vaxDate, setVaxDate] = useState("");
  const [doseNum, setDoseNum] = useState("");
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const userRole = currentUser ? currentUser.role : null;

  if (userRole === 1) {
    navigate("/admindashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(currentUser.idn, {
      birthdate,
      address,
      contact,
      isVaccinated,
      vaxType,
      vaxDate,
      doseNum,
    });
  };

  return (
    <EmployeeLoginContainer>
      <div className="employee-info">
        <h2>Información del Empleado</h2>
        <p>
          <b>Cédula:</b> {currentUser?.idn}
        </p>
        <p>
          <b>Nombres:</b> {currentUser?.name}
        </p>
        <p>
          <b>Apellidos:</b> {currentUser?.lastname}
        </p>
        <p>
          <b>Email:</b> {currentUser?.email}
        </p>
      </div>
      <div className="update-info">
        <h2>Completar Información</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <p>Fecha de nacimiento:</p>
            <FormInput
              type="date"
              required
              name="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="date"
            />
          </div>

          <FormInput
            label="Dirección de domicilio"
            type="text"
            required
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />

          <FormInput
            label="Teléfono móvil"
            type="text"
            required
            name="contact"
            onChange={(e) => setContact(e.target.value)}
            value={contact}
          />
          <div className="is-vaccinated">
            <label>Vacunado: </label>
            <input
              type="checkbox"
              name="address"
              onChange={(e) => setIsVaccinated(!isVaccinated)}
              value={isVaccinated}
            />
          </div>

          {isVaccinated && (
            <div className="vaccine-form">
              <label>Tipo de vacuna: </label>
              <select
                value={vaxType}
                onChange={(e) => setVaxType(e.target.value)}
              >
                <option value="Sputnik">Sputnik</option>
                <option value="AstraZeneca">AstraZeneca</option>
                <option value="Pfizer">Pfizer</option>
                <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
              </select>
              <p>Fecha de vacunación:</p>
              <FormInput
                type="date"
                name="vaxDate"
                value={vaxDate}
                onChange={(e) => setVaxDate(e.target.value)}
                className="date"
              />

              <FormInput
                label="Número de dosis"
                type="text"
                name="doseNum"
                value={doseNum}
                onChange={(e) => setDoseNum(e.target.value)}
              />
            </div>
          )}

          <Button type="submit">Actualizar</Button>
        </form>
      </div>
    </EmployeeLoginContainer>
  );
};

export default EmployeeDashboard;
