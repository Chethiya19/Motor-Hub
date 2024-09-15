import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeCrud = () => {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({ empName: '', empAddress: '', empMNumber: '' });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/employee/getAllEmployees');
            if (response.data.code === '00') {
                setEmployees(response.data.content);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editMode) {
                response = await axios.put('http://localhost:8080/api/v1/employee/updateEmployee', { ...form, empID: editId });
            } else {
                response = await axios.post('http://localhost:8080/api/v1/employee/saveEmployee', form);
            }

            if (response.data.code === '00') {
                setForm({ empName: '', empAddress: '', empMNumber: '' });
                setEditMode(false);
                setEditId(null);
                fetchEmployees();
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEdit = (employee) => {
        setForm({ empName: employee.empName, empAddress: employee.empAddress, empMNumber: employee.empMNumber });
        setEditMode(true);
        setEditId(employee.empID);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/employee/deleteEmployee/${id}`);
            if (response.data.code === '00') {
                fetchEmployees();
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div>
            <h1>Employee Management</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="empName"
                        value={form.empName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="empAddress"
                        value={form.empAddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        name="empMNumber"
                        value={form.empMNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{editMode ? 'Update' : 'Add'} Employee</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Mobile Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.empID}>
                            <td>{employee.empID}</td>
                            <td>{employee.empName}</td>
                            <td>{employee.empAddress}</td>
                            <td>{employee.empMNumber}</td>
                            <td>
                                <button onClick={() => handleEdit(employee)}>Edit</button>
                                <button onClick={() => handleDelete(employee.empID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeCrud;
