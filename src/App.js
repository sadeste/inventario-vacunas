import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import RegisterEmployee from "./components/register-employee/register-employee.component";
import Navigation from "./routes/navigation/navigation.component";
import EmployeeDashboard from "./components/employee-dashboard/employee-dashboard.component";
import UpdateEmployee from "./components/employee-update-form/employee-update-form.component";
import AdminDashboard from "./components/admin-dashboard/admin-dashboard.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/admindashboard" element={<AdminDashboard />}></Route>
        <Route path="/register" element={<RegisterEmployee />} />
        <Route path="/updateemployee" element={<UpdateEmployee />} />
        <Route path="/employeedashboard" element={<EmployeeDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
