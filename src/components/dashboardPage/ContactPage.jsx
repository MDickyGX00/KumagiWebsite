import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const ContactPage = () => {
  const [contacts, setContacts] = useState([]); // State untuk menyimpan data kontak
  const [selectedContact, setSelectedContact] = useState(null); // State untuk data kontak yang dipilih
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const [showNotification, setShowNotification] = useState(false); // Modal notifikasi
  const [notificationMessage, setNotificationMessage] = useState(""); // Pesan notifikasi
  const [searchQuery, setSearchQuery] = useState("");

  // Mengambil data kontak dari database saat komponen dimuat
  useEffect(() => {
    axiosInstance
      .get("/kontak")
      .then((response) => {
        setContacts(response.data); // Simpan data kontak ke state
      })
      .catch((error) => {
        console.error("Gagal mengambil data kontak:", error);
      });
  }, []);
  const handleRead = (contact) => {
    setSelectedContact(contact); // Simpan data kontak yang dipilih
    setIsModalOpen(true); // Buka modal
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setSelectedContact(null); // Reset data kontak yang dipilih
    setIsModalOpen(false); // Tutup modal
  };
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (!confirmDelete) return;

    axiosInstance
      .delete(`/kontak/${id}`) // Pastikan endpoint sudah sesuai
      .then(() => {
        showAlert("Data berhasil dihapus!");
        setContacts(contacts.filter((contact) => contact.id !== id)); // Perbarui state
      })
      .catch((error) => {
        console.error("Gagal menghapus data:", error);
        showAlert("Terjadi kesalahan saat menghapus data.");
      });
  };

  const showAlert = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (contact.pesan && contact.pesan.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kontak</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari Kontak..."
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="bg-white rounded overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">
                No
              </th>
              <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">
                Komentar
              </th>
              <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.pesan}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleRead(contact)}
                        className="px-2 text-2xl text-blue-500 bg-white border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-all"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
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
                <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                  Tidak ada data kontak.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center">
              Detail Kontak
            </h2>
            <div className="mb-4">
              <label className="block font-semibold">Email:</label>
              <p className="bg-gray-100 p-2 rounded">{selectedContact.email}</p>
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Komentar:</label>
              <p className="bg-gray-100 p-2 rounded">{selectedContact.pesan}</p>
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

export default ContactPage;
