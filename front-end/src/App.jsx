import "./App.scss";

import Login from "./pages/Login/Login";
import StudentDashboard from "./pages/Student/Dashboard/studentDashboard";
import StudentFlow from "./pages/Student/Flow/StudentFlow";
import StudentStatus from "./pages/Student/Status/studentStatus";

function App() {
  return (
    <div className="App">
      {/* <StudentDashboard></StudentDashboard> */}
      <StudentFlow></StudentFlow>
      <StudentStatus></StudentStatus>
    </div>
  );
}

export default App;
