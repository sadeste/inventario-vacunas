import { useState, useEffect, useContext, Fragment } from "react";

import { useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

import Employee from "../employee/employee.component";

import {
  InputCheckbox,
  ListContainer,
  FilterOptionsContainer,
  FilterLabel,
} from "./admin-dashboard.styles";

import {
  getEmployeesAndDocuments,
  deleteEmployee,
} from "../../utils/firebase/firebase.utils";

const AdminDashboard = () => {
  const [employeeArray, setEmployeeArray] = useState([]);
  const [employeeArrayHelper, setEmployeeArrayHelper] = useState([]);
  const [vaxStateFilter, setVaxStateFilter] = useState("Ninguno");
  const [vaxTypeFilter, setVaxTypeFilter] = useState("Ninguno");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const userRole = currentUser ? currentUser.role : null;

  if (userRole === 2) {
    navigate("/employeedashboard");
  }

  useEffect(() => {
    const fetchData = async () => {
      const employees = await getEmployeesAndDocuments();
      setEmployeeArray(employees);
      setEmployeeArrayHelper(employees);
    };

    fetchData();
  }, []);

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      const employees = await getEmployeesAndDocuments();
      setEmployeeArray(employees);
      setEmployeeArrayHelper(employees);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    let filteredArray = employeeArray;

    if (vaxStateFilter === "Vacunado") {
      filteredArray = filteredArray.filter(
        (employee) => employee.isVaccinated === true
      );
    } else if (vaxStateFilter === "No Vacunado") {
      filteredArray = filteredArray.filter(
        (employee) => employee.isVaccinated === false
      );
    }

    if (vaxTypeFilter !== "Ninguno") {
      filteredArray = filteredArray.filter(
        (employee) => employee.vaxType === vaxTypeFilter
      );
    }

    if (vaxStateFilter === "Ninguno" && vaxTypeFilter === "Ninguno") {
      filteredArray = employeeArray;
    }

    if (startDate !== "" && endDate !== "") {
      const start = Date.parse(startDate);
      const end = Date.parse(endDate);

      filteredArray = filteredArray.filter((employee) => {
        const vaxDate = Date.parse(employee.vaxDate);
        return vaxDate >= start && vaxDate <= end;
      });
    }

    setEmployeeArrayHelper(filteredArray);
  }, [vaxStateFilter, vaxTypeFilter, startDate, endDate]);

  return (
    <ListContainer>
      <h2>Lista de Empleados</h2>
      {employeeArray.length === 0 ? (
        <div>No se ha registrado ningún empleado</div>
      ) : (
        <>
          <FilterOptionsContainer>
            <FilterLabel>Filtrar por por: </FilterLabel>
            <label>Estado de vacuna: </label>
            <select
              value={vaxStateFilter}
              onChange={(e) => setVaxStateFilter(e.target.value)}
            >
              <option value="Ninguno">Ninguno</option>
              <option value="Vacunado">Vacunado</option>
              <option value="No Vacunado">No Vacunado</option>
            </select>
            <label>Tipo de vacuna: </label>
            <select
              value={vaxTypeFilter}
              onChange={(e) => setVaxTypeFilter(e.target.value)}
            >
              <option value="Ninguno">Ninguno</option>
              <option value="Sputnik">Sputnik</option>
              <option value="AstraZeneca">AstraZeneca</option>
              <option value="Pfizer">Pfizer</option>
              <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
            </select>
            <label>Rango de fecha de vacunación: </label>
            <InputCheckbox
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <InputCheckbox
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FilterOptionsContainer>
          <table>
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Estado de Vacunación</th>
                <th>Tipo de Vacuna</th>
                <th>Fecha de Vacunación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employeeArrayHelper.map((employee) => (
                <Fragment key={employee.idn}>
                  <tr>
                    <Employee
                      employee={employee}
                      onDeleteEmployee={handleDeleteEmployee}
                    />
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </>
      )}
    </ListContainer>
  );
};

export default AdminDashboard;
