import React, { useEffect, useState } from "react";
import { fetchUsers } from "./utils/api";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import { toast, Toaster } from "react-hot-toast";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
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
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleSave = (user) => {
    const updatedUser = {
      ...user,
      status: user.status || "aktif",
    };

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
    const updatedUsers = users.filter((u) => u.id !== id);
    updateLocalStorage(updatedUsers);
    toast.error("Data pengguna berhasil dihapus!");
  };

  const handleSort = (key) => {
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">DataTech Dashboard</h1>
      <button
        onClick={() => setCurrentUser({})}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Tambah Pengguna
      </button>
      <UserTable
        users={users}
        onEdit={(user) => setCurrentUser(user)}
        onDelete={handleDelete}
        onSort={handleSort}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      {currentUser && (
        <UserForm
          currentUser={currentUser}
          onSave={handleSave}
          onCancel={() => setCurrentUser(null)}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
