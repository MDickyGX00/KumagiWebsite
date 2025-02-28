import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const LinkPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", socialMedia: "" });
  const [newOrder, setNewOrder] = useState({ platform: "" });
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [selectedDeleteContact, setSelectedDeleteContact] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedContact, setUpdatedContact] = useState({
    name: "",
    socialMedia: "",
    platform: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const socialMediaPlatforms = [
    { value: "", label: "Pilih Media Sosial" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter" },
    { value: "linkedin", label: "LinkedIn" },
  ];

  const OrderPlatforms = [
    { value: "", label: "Pilih Platform" },
    { value: "tokopedia", label: "Tokopedia" },
    { value: "shopee", label: "Shopee" },
    { value: "grabfood", label: "GrabFood" },
    { value: "gofood", label: "GoFood" },
  ];

  useEffect(() => {
    axiosInstance
      .get("/contacts")
      .then((response) => {
        setContacts(response.data);
      })
      .catch(() => {
        showAlert("Gagal mengambil data kontak. Silakan coba lagi nanti.");
      });
  }, []);

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewContact({ name: "", socialMedia: "" });
    setNewOrder({ name: "", platform: "" });
  };

  const handleDelete = (contact) => {
    setSelectedDeleteContact(contact);
    setShowModalDelete(true);
  };

  const handleRead = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedContact(null);
    setIsModalOpen(false);
  };

  // Fungsi untuk menghapus kontak setelah konfirmasi
  const confirmDelete = async () => {
    if (!selectedDeleteContact || !selectedDeleteContact.id) {
      return;
    }

    try {
      const response = await axiosInstance.delete(
        `/contacts/${selectedDeleteContact.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Response dari server:", response);

      showAlert("Kontak berhasil dihapus!");
      setContacts((prevContacts) =>
        prevContacts.filter(
          (contact) => contact.id !== selectedDeleteContact.id
        )
      );
    } catch {
      showAlert("Terjadi kesalahan saat menghapus kontak.");
    }

    setShowModalDelete(false);
    setSelectedDeleteContact(null);
  };

  const handleAddContactOrOrder = async (e) => {
    e.preventDefault();

    // Validasi untuk kontak dan order
    if (isAddingOrder) {
      if (!newContact.name || !newOrder.platform) {
        showAlert("Semua data harus diisi!");
        return;
      }

      const orderData = {
        name: newContact.name,
        socialMedia: newContact.socialMedia,
        platform: newOrder.platform,
      };

      try {
        const response = await axiosInstance.post("/contacts", orderData);
        showAlert("Kontak dan order berhasil ditambahkan!");
        setContacts((prevContacts) => [...prevContacts, response.data]);
        setNewContact({ name: "", socialMedia: "" });
        setNewOrder({ platform: "" });
        closeAddModal();
      } catch {
        showAlert("Terjadi kesalahan saat menambahkan kontak dan order.");
      }
    } else {
      if (!newContact.name || !newContact.socialMedia) {
        showAlert("Semua data kontak harus diisi!");
        return;
      }

      try {
        const response = await axiosInstance.post("/contacts", newContact);
        showAlert("Kontak berhasil ditambahkan!");
        setContacts((prevContacts) => [...prevContacts, response.data]);
        setNewContact({ name: "", socialMedia: "" });
        closeAddModal();
      } catch {
        showAlert("Terjadi kesalahan saat menambahkan kontak.");
      }
    }
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setUpdatedContact({
      name: contact.name,
      socialMedia: contact.socialMedia || "",
      platform: contact.platform || "",
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedContact) return;

    try {
      await axiosInstance.put(
        `/contacts/${selectedContact.id}`,
        updatedContact,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      showAlert("Kontak berhasil diperbarui!");

      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === selectedContact.id
            ? { ...contact, ...updatedContact }
            : contact
        )
      );

      setIsEditModalOpen(false);
      setSelectedContact(null);
    } catch (error) {
      console.error("Gagal memperbarui kontak:", error.response || error);
      showAlert("Terjadi kesalahan saat memperbarui kontak.");
    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact); // Set the selected contact
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.name &&
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (contact.socialMedia &&
        contact.socialMedia.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const showAlert = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manajemen Link</h1>

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari link..."
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 text-2xl bg-white border-2 border-green-500 transition-all text-green-500 rounded-xl hover:bg-green-600 hover:text-white"
        >
          <i className="ri-add-line"></i>
        </button>
      </div>

      <div className="bg-white rounded overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">
                No
              </th>
              <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">
                Nama Profil
              </th>
              <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">
                Media Sosial
              </th>
              <th className="border border-gray-300 px-4 py-2 font-medium bg-gray-200">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact, index) => (
                <tr
                  key={contact._id}
                  onClick={() => handleContactClick(contact)}
                  className={`${
                    selectedContact?._id === contact._id ? "" : ""
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {contact.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {contact.socialMedia
                      ? contact.socialMedia
                      : contact.platform}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleRead(contact)}
                        className="px-2 text-2xl text-blue-500 bg-white border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-all"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => handleEdit(contact)}
                        className="px-2 text-2xl text-yellow-500 bg-white border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white rounded-xl transition-all"
                      >
                        <i className="ri-edit-line"></i>
                      </button>

                      <button
                        onClick={() => handleDelete(contact)}
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
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  Tidak ada data link.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for adding a new contact or order */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              {isAddingOrder
                ? "Tambah Link Order Baru"
                : "Tambah Link Sosmed Baru"}
            </h2>
            <div className="flex justify-between mb-4">
              <button
                onClick={() => setIsAddingOrder(false)}
                className={`w-full p-2 ${
                  !isAddingOrder ? "bg-green-500" : "bg-gray-300"
                } text-white rounded hover:bg-green-600 transition-all mx-2`}
              >
                Sosial Media
              </button>

              <button
                onClick={() => setIsAddingOrder(true)}
                className={`w-full p-2 ${
                  isAddingOrder ? "bg-green-500" : "bg-gray-300"
                } text-white rounded hover:bg-green-600 transition-all mx-2`}
              >
                Order
              </button>
            </div>

            {isAddingOrder ? (
              <form onSubmit={handleAddContactOrOrder}>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Nama Profil
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newContact.name}
                    onChange={(e) =>
                      setNewContact({ ...newContact, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Platform</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={newOrder.platform}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, platform: e.target.value })
                    }
                    required
                  >
                    {OrderPlatforms.map((platform) => (
                      <option key={platform.value} value={platform.value}>
                        {platform.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={closeAddModal}
                    className="w-full p-2 mt-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all"
                  >
                    Tutup
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAddContactOrOrder}>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Nama Profil
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newContact.name}
                    onChange={(e) =>
                      setNewContact({ ...newContact, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-semibold">
                    Media Sosial
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    value={newContact.socialMedia}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        socialMedia: e.target.value,
                      })
                    }
                    required
                  >
                    {socialMediaPlatforms.map((platform) => (
                      <option key={platform.value} value={platform.value}>
                        {platform.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={closeAddModal}
                    className="w-full p-2 mt-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all"
                  >
                    Tutup
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {isEditModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Kontak</h2>

            <div className="mb-4">
              <label className="block font-semibold">Nama:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={updatedContact.name}
                onChange={(e) =>
                  setUpdatedContact({ ...updatedContact, name: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Media Sosial:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={updatedContact.socialMedia}
                onChange={(e) =>
                  setUpdatedContact({
                    ...updatedContact,
                    socialMedia: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Platform:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={updatedContact.platform}
                onChange={(e) =>
                  setUpdatedContact({
                    ...updatedContact,
                    platform: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalDelete && selectedDeleteContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-3xl font-light mb-8">Konfirmasi Hapus</h3>
            <p>
              Apakah Anda yakin ingin menghapus link{" "}
              <strong>{selectedDeleteContact.nama}</strong>?
            </p>
            <div className="mt-4 flex space-x-2">
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
      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center">
              Detail Kontak
            </h2>

            <div className="mb-4">
              <label className="block font-semibold">Nama:</label>
              <p className="bg-gray-100 p-2 rounded">{selectedContact.name}</p>
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Media Sosial:</label>
              <p className="bg-gray-100 p-2 rounded">
                {selectedContact.socialMedia || "Tidak tersedia"}
              </p>
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Platform:</label>
              <p className="bg-gray-100 p-2 rounded">
                {selectedContact.platform || "Tidak tersedia"}
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

export default LinkPage;
