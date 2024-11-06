import React, { useEffect, useState } from "react";

const UserTable = ({
  users,
  onEdit,
  onDelete,
  onSort,
  filterStatus,
  setFilterStatus,
}) => {
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(
      filterStatus
        ? users.filter((user) => user.status === filterStatus)
        : users
    );
  }, [users, filterStatus]);

  return (
    <div>
      <div className="mb-4">
        <label className="font-semibold">Filter Status: </label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-2 py-1 ml-2"
        >
          <option value="">Semua</option>
          <option value="aktif">Aktif</option>
          <option value="tidak aktif">Tidak Aktif</option>
        </select>
      </div>
      <table className="min-w-full bg-white border rounded shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="p-3 text-left cursor-pointer"
              onClick={() => onSort("name")}
            >
              Nama
            </th>
            <th className="p-3 text-left">Email</th>
            <th
              className="p-3 text-left cursor-pointer"
              onClick={() => onSort("age")}
            >
              Umur
            </th>
            <th
              className="p-3 text-left cursor-pointer"
              onClick={() => onSort("status")}
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
                  onClick={() => onEdit(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
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
