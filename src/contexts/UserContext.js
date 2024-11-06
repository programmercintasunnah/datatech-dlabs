// contexts/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { fetchUsers } from "../utils/api";
import { toast } from "react-hot-toast";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    // Mengambil data pengguna dari localStorage atau dari API jika belum ada
    const localData = JSON.parse(localStorage.getItem("users")) || [];
    if (localData.length) {
      setUsers(localData);
    } else {
      fetchUsers().then((data) => {
        setUsers(data);
        localStorage.setItem("users", JSON.stringify(data));
      });
    }
  }, []);

  const updateLocalStorage = (updatedUsers) => {
    // Memperbarui state pengguna dan menyimpannya di localStorage
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleSave = (user) => {
    // Menyimpan atau memperbarui data pengguna, lalu mengirim notifikasi
    const updatedUser = { ...user, status: user.status || "aktif" };
    if (user.id) {
      const updatedUsers = users.map((u) =>
        u.id === user.id ? updatedUser : u
      );
      updateLocalStorage(updatedUsers);
      toast.success("Data pengguna berhasil diperbarui!");
    } else {
      const newUser = { ...updatedUser, id: Date.now() };
      updateLocalStorage([...users, newUser]);
      toast.success("Pengguna baru berhasil ditambahkan!");
    }
    setCurrentUser(null);
  };

  const handleDelete = (id) => {
    // Menghapus pengguna berdasarkan id, lalu mengirim notifikasi
    const updatedUsers = users.filter((u) => u.id !== id);
    updateLocalStorage(updatedUsers);
    toast.error("Data pengguna berhasil dihapus!");
  };

  const handleSort = (key) => {
    // Mengatur urutan data pengguna berdasarkan kolom tertentu
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        filterStatus,
        setFilterStatus,
        setCurrentUser,
        handleSave,
        handleDelete,
        handleSort,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
