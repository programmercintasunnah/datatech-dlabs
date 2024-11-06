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
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Umur"
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="aktif">Aktif</option>
        <option value="tidak aktif">Tidak Aktif</option>
      </select>
      <button type="submit">Simpan</button>
      <button type="button" onClick={onCancel}>
        Batal
      </button>
    </form>
  );
};

export default UserForm;
