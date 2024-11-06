import React, { useState, useEffect } from "react";

const UserTable = ({ users, onEdit, onDelete, onSort, filterStatus }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(
      filterStatus
        ? users.filter((user) => user.status === filterStatus)
        : users
    );
  }, [users, filterStatus]);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort("name")}>Nama</th>
          <th>Email</th>
          <th onClick={() => onSort("age")}>Umur</th>
          <th onClick={() => onSort("status")}>Status Keanggotaan</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>{user.status}</td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user.id)}>Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
