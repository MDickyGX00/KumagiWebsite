import axiosInstance from "../axiosInstance";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false); // Modal untuk konfirmasi hapus
  const [selectedDeleteUser, setSelectedDeleteUser] = useState(null); // Simpan user yang akan dihapus
  const [showNotification, setShowNotification] = useState(false); // Modal notifikasi
  const [notificationMessage, setNotificationMessage] = useState(""); // Pesan notifikasi

  useEffect(() => {
    axiosInstance
      .get("/review")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data pengguna:", error);
        showAlert("Gagal memuat data pengguna. Silakan coba lagi nanti.");
      });
  }, []);

  const handleRead = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  // Fungsi untuk membuka modal konfirmasi sebelum hapus
  const handleDelete = (user) => {
    setSelectedDeleteUser(user); // Simpan data pengguna yang ingin dihapus
    setShowModalDelete(true); // Tampilkan modal
  };

  // Fungsi untuk menghapus setelah konfirmasi
  const confirmDelete = () => {
    if (!selectedDeleteUser) return;

    axiosInstance
      .delete(`/review/${selectedDeleteUser.id}`)
      .then(() => {
        showAlert("Data berhasil dihapus!");
        setUsers(users.filter((user) => user.id !== selectedDeleteUser.id));
      })
      .catch((error) => {
        console.error("Gagal menghapus data:", error);
        showAlert("Terjadi kesalahan saat menghapus data.");
      });

    setShowModalDelete(false);
    setSelectedDeleteUser(null);
  };

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
        return "Nilai tidak valid";
    }
  };

  const showAlert = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Review</h1>
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
                        onClick={() => handleDelete(user)}
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
                  Tidak ada data review.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showModalDelete && selectedDeleteUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Konfirmasi Hapus</h3>
            <p>
              Apakah Anda yakin ingin menghapus review dari{" "}
              <strong>{selectedDeleteUser.nama}</strong>?
            </p>
            <div className="mt-4 flex justify-between space-x-2">
              <button
                onClick={() => setShowModalDelete(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Review */}
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
              onClick={closeModal}
              className="w-full p-2 mt-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          {notificationMessage}
          <button onClick={() => setShowNotification(false)} className="ml-4">
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
