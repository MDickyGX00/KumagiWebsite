import { useEffect, useState } from "react";
import axios from "axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]); // Menyimpan data produk
  const [showModal, setShowModal] = useState(false); // Menampilkan form modal
  const [modalType, setModalType] = useState("add"); // Jenis modal: add, read, update
  const [currentProduct, setCurrentProduct] = useState({}); // Data produk yang sedang diproses

  // Fetch data produk dari database
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://10.20.20.23:8080/produk-makanan"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus produk ini?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://10.20.20.23:8080/produk-makanan/${id}`);
      alert("Produk berhasil dihapus!");
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("namaProduk", currentProduct.namaProduk || "");
    formData.append("jenisMakanan", currentProduct.jenisMakanan || "");
    formData.append("hargaProduk", currentProduct.hargaProduk || 0);
    formData.append("stokProduk", currentProduct.stokProduk || 0);
    formData.append("image", currentProduct.image || null);

    try {
      if (modalType === "add") {
        await axios.post("http://10.20.20.23:8080/produk-makanan", formData);
        alert("Produk berhasil ditambahkan!");
      } else if (modalType === "update") {
        await axios.put(
          `http://10.20.20.118:8080/produk-makanan/${currentProduct.id}`,
          formData
        );
        alert("Produk berhasil diperbarui!");
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
                Jenis
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                Harga
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                Stok
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
                  <td className="border border-gray-300 px-4 py-2">
                    {product.stokProduk}
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
                        onClick={() => handleDelete(product.id)}
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
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {modalType === "add"
                ? "Tambah Produk"
                : modalType === "update"
                ? "Edit Produk"
                : "Detail Produk"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Nama Produk</label>
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
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={modalType === "read"}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Jenis Makanan</label>
                <select
                  name="jenisMakanan"
                  value={currentProduct.jenisMakanan || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={modalType === "read"}
                >
                  <option value="">Pilih Jenis</option>
                  <option value="BOLU">Bolu</option>
                  <option value="KUE_KERING">Kue Kering</option>
                  <option value="BROWNIES">Brownies</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-1">Harga</label>
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
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={modalType === "read"}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Stok</label>
                <input
                  type="number"
                  name="stokProduk"
                  value={currentProduct.stokProduk || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={modalType === "read"}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Gambar</label>
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
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                )}
              </div>
              {modalType !== "read" && (
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Simpan
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full p-2 mt-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Tutup
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
