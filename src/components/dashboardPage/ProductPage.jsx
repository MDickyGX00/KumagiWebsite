import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const ProductPage = () => {
  const [products, setProducts] = useState([]); // Menyimpan data produk
  const [showModal, setShowModal] = useState(false); // Menampilkan form modal
  const [modalType, setModalType] = useState("add"); // Jenis modal: add, read, update
  const [currentProduct, setCurrentProduct] = useState({}); // Data produk yang sedang diproses
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Modal konfirmasi hapus
  const [showNotification, setShowNotification] = useState(false); // Modal notifikasi
  const [notificationMessage, setNotificationMessage] = useState(""); // Pesan notifikasi
  const [deleteProductId, setDeleteProductId] = useState(null); // ID produk yang akan dihapus

  // Fetch data produk dari database
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/produk-makanan");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteProductId) return;
    try {
      await axiosInstance.delete(`/produk-makanan/${deleteProductId}`);
      setProducts(products.filter((product) => product.id !== deleteProductId));
      showAlert("Produk berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("namaProduk", currentProduct.namaProduk || "");
    formData.append("deskripsi", currentProduct.deskripsi || "");
    formData.append("jenisMakanan", currentProduct.jenisMakanan || "");
    formData.append("hargaProduk", currentProduct.hargaProduk || 0);
    formData.append("image", currentProduct.image || null);

    try {
      if (modalType === "add") {
        await axiosInstance.post("/produk-makanan", formData);
        showAlert("Produk berhasil ditambahkan!");
      } else if (modalType === "update") {
        await axiosInstance.put(
          `/produk-makanan/${currentProduct.id}`,
          formData
        );
        showAlert("Produk berhasil diperbarui!");
      }
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const openModal = (type, product = {}) => {
    setModalType(type);
    setCurrentProduct(type === "add" ? {} : product);
    setShowModal(true);
  };

  const showAlert = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manajemen Produk</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => openModal("add")}
          className="px-4 text-2xl bg-white border-2 border-green-500 transition-all text-green-500 rounded-xl hover:bg-green-600 hover:text-white"
        >
          <i className="ri-add-line"></i>
        </button>
      </div>
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                No
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                Nama Produk
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                Deskripsi
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                Jenis
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                Harga
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                Gambar
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.namaProduk}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.deskripsi}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {(() => {
                      const jenisMakananMap = {
                        BOLU: "Bolu",
                        KUE_KERING: "Kue Kering",
                        BROWNIES: "Brownies",
                      };
                      return (
                        jenisMakananMap[product.jenisMakanan] ||
                        "Tidak Diketahui"
                      );
                    })()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.hargaProduk}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.namaProduk}
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      "Tidak ada gambar"
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => openModal("read", product)}
                        className="px-2 text-2xl text-blue-500 bg-white border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-all"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => openModal("update", product)}
                        className="px-2 text-2xl text-yellow-500 bg-white border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white rounded-xl transition-all"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => {
                          setDeleteProductId(product.id);
                          setShowConfirmModal(true);
                        }}
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
                  colSpan="7"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  Tidak ada data produk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              {modalType === "add"
                ? "Tambah Produk"
                : modalType === "update"
                ? "Edit Produk"
                : "Detail Produk"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Nama Produk
                </label>
                <input
                  type="text"
                  name="namaProduk"
                  value={currentProduct.namaProduk || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  disabled={modalType === "read"}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  value={currentProduct.deskripsi || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  disabled={modalType === "read"}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Jenis Makanan
                </label>
                <select
                  name="jenisMakanan"
                  value={currentProduct.jenisMakanan || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  disabled={modalType === "read"}
                >
                  <option value="">Pilih Jenis</option>
                  <option value="BOLU">Bolu</option>
                  <option value="KUE_KERING">Kue Kering</option>
                  <option value="BROWNIES">Brownies</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-700">Harga</label>
                <input
                  type="number"
                  name="hargaProduk"
                  value={currentProduct.hargaProduk || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  disabled={modalType === "read"}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700">
                  Gambar
                </label>
                {modalType === "read" ? (
                  currentProduct.imageUrl ? (
                    <img
                      src={currentProduct.imageUrl}
                      alt="Produk"
                      className="w-24 h-24 object-cover"
                    />
                  ) : (
                    "Tidak ada gambar"
                  )
                ) : (
                  <input
                    type="file"
                    name="image"
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        image: e.target.files[0],
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  />
                )}
              </div>
              {modalType !== "read" && (
                <button
                  type="submit"
                  className="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                >
                  Simpan
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full p-2 mt-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-all"
              >
                Tutup
              </button>
            </form>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="text-lg font-bold mb-4">
              Apakah Anda yakin ingin menghapus produk ini?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 rounded transition-all hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded transition-all hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Notifikasi */}
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

export default ProductPage;
