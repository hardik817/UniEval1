import Login from "./components/forms/login"
import Signup from "./components/forms/signup"
import Dashboard from "./components/dashboards/dashboard";
import Admin from "./components/admin/admin";
import Addstudent from "./components/teacheroperations/addstudent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/addstudent" element={<Addstudent />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
