import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeComponent from "./components/Form/EmployeeComponent";
import Login from "./components/Super_Admins/Login";
import SuperAdmins from "./components/Super_Admins/SuperAdmins";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/superadmins" element={<SuperAdmins/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
