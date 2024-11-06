// UserTable.js
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const UserTable = () => {
  const {
    users,
    filterStatus,
    setFilterStatus,
    handleSort,
    setCurrentUser,
    handleDelete,
  } = useContext(UserContext);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Menyaring pengguna berdasarkan status filter yang dipilih
    setFilteredUsers(
      filterStatus
        ? users.filter((user) => user.status === filterStatus)
        : users
    );
  }, [users, filterStatus]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <label className="font-semibold mr-2">Filter Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded px-2 py-1 mr-4"
          >
            <option value="">Semua</option>
            <option value="aktif">Aktif</option>
            <option value="tidak aktif">Tidak Aktif</option>
          </select>
        </div>
        <button
          onClick={() => setCurrentUser({})}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Tambah Pengguna
        </button>
      </div>
      <table className="min-w-full bg-white border rounded shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="p-3 text-left cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Nama
            </th>
            <th className="p-3 text-left">Email</th>
            <th
              className="p-3 text-left cursor-pointer"
              onClick={() => handleSort("age")}
            >
              Umur
            </th>
            <th
              className="p-3 text-left cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status Keanggotaan
            </th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.age}</td>
              <td className="p-3">{user.status}</td>
              <td className="p-3">
                <button
                  onClick={() => setCurrentUser(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
