import axios from "axios";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [users, setUsers] = useState([]); // State untuk menyimpan data pengguna
  const [selectedUser, setSelectedUser] = useState(null); // State untuk data pengguna yang dipilih
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  // Mengambil data pengguna dari database saat komponen dimuat
  useEffect(() => {
    axios
      .get("http://10.20.20.23:8080/admin")
      .then((response) => {
        setUsers(response.data); // Simpan data pengguna ke state
      })
      .catch((error) => {
        console.error("Gagal mengambil data pengguna:", error);
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Admin</h1>
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">No</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">Nama</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">Email</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.nama}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleRead(user)}
                        className="px-2 text-2xl text-blue-500 bg-white border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-all"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
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
              Detail User
            </h2>
            <div className="mb-4">
              <label className="block font-semibold">Nama:</label>
              <p className="bg-gray-100 p-2 rounded">{selectedUser.nama}</p>
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Email:</label>
              <p className="bg-gray-100 p-2 rounded">{selectedUser.email}</p>
            </div>
            <button
              onClick={() => closeModal(false)}
              className="w-full p-2 mt-2 bg-gray-300 text-black rounded hover:bg-gray-400"
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
