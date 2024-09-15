import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable,
    MDBTableBody, MDBTableHead, MDBCard, MDBCardBody, MDBCardTitle
} from 'mdb-react-ui-kit';

const UserCrud = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', password: '', contact: '' });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/user/getAllUsers');
            if (response.data.code === '00') {
                setUsers(response.data.content);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
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
                response = await axios.put('http://localhost:8080/api/v1/user/updateUser', { ...form, userID: editId });
            } else {
                response = await axios.post('http://localhost:8080/api/v1/user/saveUser', form);
            }

            if (response.data.code === '00') {
                setForm({ name: '', email: '', password: '', contact: '' });
                setEditMode(false);
                setEditId(null);
                fetchUsers();
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEdit = (user) => {
        setForm({ name: user.name, email: user.email, password: '', contact: user.contact });
        setEditMode(true);
        setEditId(user.userID);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/user/deleteUser/${id}`);
            if (response.data.code === '00') {
                fetchUsers();
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleClear = () => {
        setForm({ name: '', email: '', password: '', contact: '' });
        setEditMode(false);
        setEditId(null);
    };

    // Inline styles
    const inputStyle = { marginBottom: '1rem' };
    const formStyle = { padding: '3.5rem 0' }; 
    const buttonGapStyle = { marginTop: '1rem' };

    return (
        <MDBContainer fluid style={{ paddingTop: '80px' }}>
            <MDBRow>
                <MDBCol md="4">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle className="text-center">{editMode ? 'Edit User' : 'Add New User'}</MDBCardTitle>
                            <form onSubmit={handleSubmit} style={formStyle}>
                                <MDBInput
                                    label="Name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle} // Apply inline style
                                />
                                <MDBInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle} // Apply inline style
                                />
                                <MDBInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle} // Apply inline style
                                />
                                <MDBInput
                                    label="Contact"
                                    name="contact"
                                    type="text"
                                    value={form.contact}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle} // Apply inline style
                                />
                                <MDBBtn type="submit" className="w-100">
                                    {editMode ? 'Update' : 'Add'} User
                                </MDBBtn>
                                <MDBBtn type="button" color="secondary" className="w-100" style={buttonGapStyle} onClick={handleClear}>
                                    Clear
                                </MDBBtn>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="8">
                    <MDBTable className="mt-4">
                        <MDBTableHead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {users.map(user => (
                                <tr key={user.userID}>
                                    <td>{user.userID}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.contact}</td>
                                    <td>
                                        <MDBBtn size="sm" onClick={() => handleEdit(user)} className="me-2">Edit</MDBBtn>
                                        <MDBBtn size="sm" onClick={() => handleDelete(user.userID)} color="danger">Delete</MDBBtn>
                                    </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default UserCrud;
