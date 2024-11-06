export const fetchUsers = async () => {
  // Fungsi untuk mengambil data pengguna dari API dan memformatnya
  const response = await fetch("https://api.github.com/users");
  const data = await response.json();

  return data.map((user) => ({
    id: user.id,
    name: user.login,
    email: `${user.login}@gmail.com`,
    age: 10 + user.id,
    status: user.id % 2 === 0 ? "aktif" : "tidak aktif",
  }));
};
