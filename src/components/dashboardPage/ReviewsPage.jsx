import axios from "axios";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [users, setUsers] = useState([]); // State untuk menyimpan data pengguna
  const [selectedUser, setSelectedUser] = useState(null); // State untuk data pengguna yang dipilih
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  // Mengambil data pengguna dari database saat komponen dimuat
  useEffect(() => {
    axios
      .get("http://10.20.20.23:8080/review") // Pastikan endpoint sudah sesuai
      .then((response) => {
        setUsers(response.data); // Simpan data pengguna ke state
      })
      .catch((error) => {
        console.error("Gagal mengambil data pengguna:", error);
        alert("Gagal memuat data pengguna. Silakan coba lagi nanti.");
      });
  }, []);

  const handleRead = (user) => {
    setSelectedUser(user); // Simpan data pengguna yang dipilih
    setIsModalOpen(true); // Buka modal
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setSelectedUser(null); // Reset data pengguna yang dipilih
    setIsModalOpen(false); // Tutup modal
  };

  // Fungsi untuk menghapus data pengguna
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`http://10.20.20.118:8080/review/${id}`) // Pastikan endpoint sudah sesuai
      .then(() => {
        alert("Data berhasil dihapus!");
        setUsers(users.filter((user) => user.id !== id)); // Perbarui state
      })
      .catch((error) => {
        console.error("Gagal menghapus data:", error);
        alert("Terjadi kesalahan saat menghapus data.");
      });
  };

  // Fungsi untuk memberikan deskripsi rating
  const getRatingDescription = (rating) => {
    switch (rating) {
      case 1:
        return "1 - Sangat Buruk";
      case 2:
        return "2 - Buruk";
      case 3:
        return "3 - Cukup";
      case 4:
        return "4 - Bagus";
      case 5:
        return "5 - Sangat Bagus";
      default:
        return "Nilai tidak valid"; // Untuk menangani nilai yang tidak sesuai
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Admin</h1>
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                No
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                Nama
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                Komentar
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                Rating
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.nama}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.komentar}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {getRatingDescription(user.nilai)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleRead(user)}
                        className="px-2 text-2xl text-blue-500 bg-white border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-all"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-2 text-2xl text-red-500 bg-white border-2 border-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                      >
                        <i className="ri-delete-bin-5-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  Tidak ada data pengguna.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center">
              Detail Review
            </h2>
            <div className="mb-4">
              <label className="block font-semibold">Nama:</label>
              <p className="bg-gray-100 p-2 rounded">{selectedUser.nama}</p>
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Komentar:</label>
              <p className="bg-gray-100 p-2 rounded">{selectedUser.komentar}</p>
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Nilai Rating:</label>
              <p className="bg-gray-100 p-2 rounded">
                {getRatingDescription(selectedUser.nilai)}
              </p>
            </div>
            <button
              onClick={() => closeModal(false)}
              className="w-full p-2 mt-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
