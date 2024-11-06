// UserForm.js
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

const UserForm = () => {
  const { currentUser, handleSave, setCurrentUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("aktif");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Mengisi nilai form jika currentUser ada (untuk edit)
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
      setAge(currentUser.age || "");
      setStatus(currentUser.status || "aktif");
    }
  }, [currentUser]);

  const validateFields = (fields) => {
    const errors = {};

    // Iterasi setiap field yang ingin divalidasi
    for (const [field, value] of Object.entries(fields)) {
      if (field === "name" && value.trim() === "") {
        errors.name = "Nama tidak boleh kosong.";
      }
      if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
        errors.email = "Email tidak valid.";
      }
      if (field === "age" && (isNaN(value) || value <= 0)) {
        errors.age = "Umur harus berupa angka positif.";
      }
    }

    // Mengupdate state errors
    setErrors(errors);

    // Mengembalikan objek errors untuk pengecekan di handleSubmit
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi semua field yang diperlukan saat submit
    const fieldsToValidate = { name, email, age };
    const errors = validateFields(fieldsToValidate);

    // Jika terdapat error, batalkan proses simpan
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Jika tidak ada error, lanjutkan dengan menyimpan data
    handleSave({ id: currentUser?.id, name, email, age, status });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {currentUser?.id ? "Edit Pengguna" : "Tambah Pengguna"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold">Nama:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateFields({ name: e.target.value });
              }}
              className="w-full border px-2 py-1 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateFields({ email: e.target.value });
              }}
              className="w-full border px-2 py-1 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Umur:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                validateFields({ age: e.target.value });
              }}
              className="w-full border px-2 py-1 rounded"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Status Keanggotaan:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            >
              <option value="aktif">Aktif</option>
              <option value="tidak aktif">Tidak Aktif</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentUser(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
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
