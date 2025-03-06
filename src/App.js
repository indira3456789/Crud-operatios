import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState(null);

  const API_URL = 'https://jsonplaceholder.typicode.com/users';

  // Fetch Users (GET)
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  // Add User (POST)
  const handleAddUser = () => {
    if (user.name && user.email) {
      axios.post(API_URL, user)
        .then(response => {
          setUsers([...users, response.data]);
          setUser({ name: '', email: '' });
        })
        .catch(error => {
          console.error("There was an error adding the user!", error);
        });
    }
  };

  // Delete User (DELETE)
  const handleDeleteUser = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the user!", error);
      });
  };

  // Edit User (for PATCH operation)
  const handleEditUser = (user) => {
    setEditUser(user);
    setUser({ name: user.name, email: user.email });
  };

  // Update User (PATCH)
  const handleUpdateUser = () => {
    if (user.name && user.email) {
      axios.patch(`${API_URL}/${editUser.id}`, user)
        .then(response => {
          setUsers(users.map(u => (u.id === editUser.id ? response.data : u)));
          setUser({ name: '', email: '' });
          setEditUser(null);
        })
        .catch(error => {
          console.error("There was an error updating the user!", error);
        });
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>React CRUD Operations</h1>
        <p>Manage users with ease using a simple fake API.</p>
      </div>

      <div className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <button onClick={editUser ? handleUpdateUser : handleAddUser}>
          {editUser ? 'Update User' : 'Add User'}
        </button>
      </div>

      <div className="user-list-container">
        <h2>Users List</h2>
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
              <div className="user-actions">
                <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
