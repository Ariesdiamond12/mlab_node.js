import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeComponent from "./components/Form/EmployeeComponent";
import Login from "./components/Super_Admins/Login";
import SuperAdmins from "./components/Super_Admins/SuperAdmins";
import Register from "./components/Super_Admins/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={<Register/>} />
        <Route path="/superadmins" element={<SuperAdmins/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
