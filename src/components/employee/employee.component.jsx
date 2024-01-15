import { useNavigate } from "react-router-dom";

import { ActionButton } from "./employee.styles";

const Employee = ({ employee, onDeleteEmployee }) => {
  const navigate = useNavigate();
  let vaccinated = "";

  if (employee.isVaccinated) vaccinated = "Vacunado";
  else vaccinated = "No Vacunado";

  const handleDeleteClick = () => {
    onDeleteEmployee(employee.idn);
    alert("Empleado eliminado exitosamente");
  };

  return (
    <>
      <td>{employee.name}</td>
      <td>{employee.lastname}</td>
      <td>{vaccinated}</td>
      {employee.isVaccinated ? (
        <>
          <td>{employee.vaxType}</td> <td>{employee.vaxDate}</td>
        </>
      ) : (
        <>
          <td>-</td> <td>-</td>
        </>
      )}
      <>
        <td>
          <ActionButton onClick={handleDeleteClick}>🗑️</ActionButton>
          <ActionButton
            onClick={() => {
              navigate("/updateemployee", { state: { employee } });
            }}
          >
            📝
          </ActionButton>
        </td>
      </>
    </>
  );
};

export default Employee;
