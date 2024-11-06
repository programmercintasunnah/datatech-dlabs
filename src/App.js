import React, { useContext } from "react";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import { Toaster } from "react-hot-toast";
import { UserContext, UserProvider } from "./contexts/UserContext";
import InfoBox from "./InfoBox";

function Dashboard() {
  // Menggunakan context dari UserContext untuk mendapatkan currentUser dan setCurrentUser
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">DataTech Dashboard</h1>

      {/* Memanggil komponen InfoBox */}
      <InfoBox />

      <UserTable />
      {currentUser && <UserForm />}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

function App() {
  return (
    // Menyediakan UserProvider untuk membungkus komponen-komponen di dalamnya agar bisa mengakses UserContext
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
}

export default App;
