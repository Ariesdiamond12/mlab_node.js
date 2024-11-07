import { useEffect, useState } from "react";
import "./Employee.css";
import NavbarComponent from "../Navbar/NavbarComponent";

const EmployeeComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [position, setPosition] = useState("");

  const [employees, setEmployees] = useState([]); //I used  an array to store the data of all employees
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    await fetch("http://localhost:3000/getUser")
      .then((response) => response.json())
      .then((data) => setEmployees(data.users));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEmployee = {
      name,
      email,
      phone,
      userId: id,
      image,
      position,
    };

    // setEmployees([...employees, newEmployee]);
    console.log("Form Data:", newEmployee);

    //Add to json server
    fetch("http://localhost:3000/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Employee added successfully:", data);
      });

    fetchEmployees();
    resetForm();
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    resetForm();
  };

  const handleDelete = (employeeId) => {
    fetch(`http://localhost:3000/deleteUser/${employeeId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Employee successfully deleted!", data);
        fetchEmployees();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePositionChange = (event) => setPosition(event.target.value);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setId("");
    setImage("");
    setPosition("");
    setSelectedEmployee(null);
  };

  const handleEdit = (employee) => {
    setName(employee.name);
    setEmail(employee.email);
    setPhone(employee.phone);
    setId(employee.id);
    setImage(employee.image);
    setPosition(employee.position);
    setSelectedEmployee(employee);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    console.log("insearch");

    const filteredEmployees = employees.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm) ||
        employee.phone.toLowerCase().includes(searchTerm) ||
        employee.position.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredEmployees(filteredEmployees);
  };

  return (
    <>
      <NavbarComponent handleSearch={handleSearch} />

      <div id="container">
        {console.log("employees:", employees)}
        {/* 1st Column */}
        <div className="form_column">
          <form onSubmit={selectedEmployee ? handleUpdate : handleSubmit}>
            <h1>Employee Form</h1>
            <label htmlFor="name-and-surname">Name and Surname</label>
            <input
              type="text"
              value={name}
              placeholder="Name and Surname"
              onChange={handleNameChange}
            />
            <label htmlFor="email-address">Email Address</label>
            <input
              type="text"
              value={email}
              placeholder="Email Address"
              onChange={handleEmailChange}
            />
            <label htmlFor="phone-number">Phone Number</label>
            <input
              type="tel"
              value={phone}
              placeholder="Phone Number"
              onChange={handlePhoneChange}
            />
            <label>Image</label>
            <input type="file" onChange={handleImageChange} />

            <label htmlFor="employee-position">Employee Position</label>
            <select
              id="employee-position"
              value={position}
              onChange={handlePositionChange}
            >
              <option></option>
              <option value="intern">Intern</option>
              <option value="employee">Employee</option>
            </select>

            <label htmlFor="ID">ID</label>
            <input
              type="number"
              value={id}
              placeholder="Enter your ID"
              onChange={(event) => setId(event.target.value)}
            />

            <button type="submit">{selectedEmployee ? "Update" : "Add"}</button>
            {selectedEmployee && (
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* 2nd Column */}
        <div className="output-column">
          <h1>Employee Details</h1>

          {filteredEmployees.length !== 0 &&
            filteredEmployees.map((employee) => (
              <div key={employee.id}>
                <h2>{employee.name}</h2>
                <p>{employee.email}</p>
                <p>{employee.phone}</p>
                <p>{employee.position}</p>
              </div>
            ))}

          {filteredEmployees.length === 0 &&
            employees.map((employee) => (
              <div key={employee.id}>
                <p>Name: {employee.name}</p>
                <p>Email: {employee.email}</p>
                <p>Phone: {employee.phone}</p>
                <p>
                  {/* Image:{" "} */}
                  <img src={employee.image} width={128} alt={employee.image} />
                </p>
                <p>Position: {employee.position}</p>
                <p>ID: {employee.id}</p>
                <button className="btn" onClick={() => handleEdit(employee)}>
                  Edit
                </button>
                <button
                  className="btn"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default EmployeeComponent;
