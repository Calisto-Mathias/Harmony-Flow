import "./App.scss";

import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import StudentDashboard from "./pages/Student/Dashboard/studentDashboard";
import StudentFlow from "./pages/Student/Flow/StudentFlow";
import StudentStatus from "./pages/Student/Status/studentStatus";
import AdminDashboard from "./pages/Admin/adminDashboard";
import AdminTemplate from "./pages/Admin/Template/AdminTemplate";
import AdminStatus from "./pages/Admin/Status/AdminStatus";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import EmployeeStatus from "./pages/Employee/EmployeeStatus/EmployeeStatus";

import RequireAuth from "./hooks/requireAuth";
import RequireAdmin from "./hooks/RequireAdmin";
import RequireEmployee from "./hooks/RequireEmployee";
import RequireStudent from "./hooks/RequireStudent";
import Unauthorized from "./pages/Unauthorized/Unauthorized";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* public routes */}
        <Route path="login" element={<Login></Login>}></Route>
        <Route
          path="unauthorized"
          element={<Unauthorized></Unauthorized>}
        ></Route>

        {/* protected routes */}
        <Route element={<RequireAuth></RequireAuth>}>
          <Route element={<RequireStudent></RequireStudent>}>
            <Route
              path="/student/dashboard"
              element={<StudentDashboard></StudentDashboard>}
            ></Route>
            <Route
              path="/student/flow"
              element={<StudentFlow></StudentFlow>}
            ></Route>
            <Route
              path="/student/status"
              element={<StudentStatus></StudentStatus>}
            ></Route>
          </Route>

          <Route element={<RequireEmployee></RequireEmployee>}>
            <Route
              path="/employee/dashboard"
              element={<EmployeeDashboard></EmployeeDashboard>}
            ></Route>
            <Route
              path="/employee/status"
              element={<EmployeeStatus></EmployeeStatus>}
            ></Route>
          </Route>

          <Route element={<RequireAdmin></RequireAdmin>}>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard></AdminDashboard>}
            ></Route>
            <Route
              path="/admin/create"
              element={<AdminTemplate></AdminTemplate>}
            ></Route>
            <Route
              path="/admin/status"
              element={<AdminStatus></AdminStatus>}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
