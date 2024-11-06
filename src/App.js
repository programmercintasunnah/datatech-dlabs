import { useEffect, useState } from "react";
import { fetchUsers } from "./utils/api";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");

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
    } else {
      const newUser = { ...updatedUser, id: Date.now() };
      updateLocalStorage([...users, newUser]);
    }
    setCurrentUser(null);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((u) => u.id !== id);
    updateLocalStorage(updatedUsers);
  };

  return (
    <div>
      <h1>DataTech Dashboard</h1>
      <button onClick={() => setCurrentUser({})}>Tambah Pengguna</button>
      <UserTable
        users={users}
        onEdit={(user) => setCurrentUser(user)}
        onDelete={handleDelete}
        filterStatus={filterStatus}
      />
      {currentUser && (
        <UserForm
          currentUser={currentUser}
          onSave={handleSave}
          onCancel={() => setCurrentUser(null)}
        />
      )}
    </div>
  );
}

export default App;
