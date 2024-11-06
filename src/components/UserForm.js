import React, { useState, useEffect } from "react";

const UserForm = ({ currentUser, onSave, onCancel }) => {
  const [name, setName] = useState(currentUser ? currentUser.name : "");
  const [email, setEmail] = useState(currentUser ? currentUser.email : "");
  const [age, setAge] = useState(currentUser ? currentUser.age : "");
  const [status, setStatus] = useState(
    currentUser ? currentUser.status : "aktif"
  );

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setAge(currentUser.age);
      setStatus(currentUser.status);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !/^\S+@\S+\.\S+$/.test(email) || age <= 0) {
      alert("Data tidak valid!");
      return;
    }
    onSave({ id: currentUser?.id, name, email, age, status });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {currentUser ? "Edit" : "Tambah"} Pengguna
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            className="block w-full border rounded mb-3 p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama"
            required
          />
          <input
            type="email"
            className="block w-full border rounded mb-3 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="number"
            className="block w-full border rounded mb-3 p-2"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            placeholder="Umur"
            required
          />
          <select
            className="block w-full border rounded mb-3 p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="aktif">Aktif</option>
            <option value="tidak aktif">Tidak Aktif</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
