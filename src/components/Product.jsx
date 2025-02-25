import { useEffect, useState, useRef } from "react";
import axiosInstance from "./axiosInstance";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua Produk");
  const scrollContainerRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/produk-makanan"); // 🔹 Gunakan axiosInstance
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "Semua Produk"
      ? products
      : products.filter((product) => product.jenisMakanan === selectedCategory);

  const openModal = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleScroll = (event) => {
    event.preventDefault(); // Mencegah scroll vertikal
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += event.deltaY * 2; // Menggeser lebih cepat
    }
  };

  return (
    <div className="produk xl:px-20 px-5 pt-20 pb-20 bg-white" id="produk">
      <div className="flex items-center justify-center">
        <h1 className="text-center xl:text-5xl text-2xl pb-5">Produk Kami</h1>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex space-x-2 overflow-x-auto scrollbar-hide xl:px-20 py-5"
        onWheel={handleScroll} // Menambahkan event scroll
        style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
      >
        {["Semua Produk", "BOLU", "KUE_KERING", "BROWNIES"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded transition-all ${
              selectedCategory === category
                ? "bg-yellow-400 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="xl:px-20">
        {filteredProducts.length > 0 ? (
          <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10">
            {filteredProducts.map((product, index) => (
              <li
                key={index}
                className="border rounded shadow cursor-pointer"
                onClick={() => openModal(product)}
              >
                <img
                  src={product.imageUrl || "/placeholder.png"} // Gunakan placeholder jika gambar tidak tersedia
                  alt={product.namaProduk}
                  className="w-full h-40 sm:h-72 object-cover rounded-b-none rounded mb-2"
                />
                <h2 className="text-base sm:text-xl lg:text-3xl/tight px-4">
                  {product.namaProduk}
                </h2>
                <p className="text-yellow-500 font-semibold px-4 pb-5 text-sm sm:text-xl">
                  Rp {product.hargaProduk.toLocaleString()}
                </p>

                <p className="mb-2 mx-2 px-4 text-xs sm:text-base py-1 rounded-full bg-yellow-300 inline-block">
                  {(() => {
                    const jenisMakananMap = {
                      BOLU: "Bolu",
                      KUE_KERING: "Kue Kering",
                      BROWNIES: "Brownies",
                    };
                    return (
                      jenisMakananMap[product.jenisMakanan] || "Tidak Diketahui"
                    );
                  })()}
                </p>
                <a
                  href={`https://wa.me/628985551285?text=Saya%20mau%20pesan%20${product.namaProduk}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-center text-lg md:text-2xl text-black bg-yellow-400 hover:bg-yellow-500 transition-all py-1 md:py-2 px-4 rounded-b"
                >
                  <i className="ri-whatsapp-line mx-2"></i>
                  Pesan
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">Tidak ada produk untuk kategori ini.</p>
        )}
      </div>

      {showModal && currentProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 sm:px-6 z-50" // Pastikan modal di atas navbar
          onClick={() => setShowModal(false)} // Klik luar modal untuk menutup
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-5xl h-auto max-h-[90vh] overflow-y-auto relative" // max-h untuk mencegah modal terlalu panjang
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik di dalam
          >
            {/* Tombol Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500 text-white px-3 py-1 rounded text-lg sm:text-xl z-50" // Tambahkan z-50 agar tombol tetap terlihat
            >
              ✕
            </button>

            {/* Kontainer Flexbox */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Bagian Gambar */}
              <div className="md:w-1/2">
                <img
                  src={currentProduct.imageUrl}
                  alt="Produk"
                  className="w-full h-auto object-cover rounded"
                />
              </div>

              {/* Bagian Informasi */}
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentProduct.namaProduk}
                </h2>
                <p className="text-lg text-yellow-500 font-semibold mt-2">
                  Rp {currentProduct.hargaProduk.toLocaleString()}
                </p>
                <p className="my-2 px-4 text-xs sm:text-base py-1 rounded-full bg-yellow-300 inline-block">
                  {(() => {
                    const jenisMakananMap = {
                      BOLU: "Bolu",
                      KUE_KERING: "Kue Kering",
                      BROWNIES: "Brownies",
                    };
                    return (
                      jenisMakananMap[currentProduct.jenisMakanan] ||
                      "Tidak Diketahui"
                    );
                  })()}
                </p>

                {/* Deskripsi Produk */}
                <p className="mt-4 text-gray-700">
                  {currentProduct.deskripsi || "Tidak ada deskripsi."}
                </p>
              </div>
            </div>

            {/* Tombol Pesan WhatsApp */}
            <a
              href={`https://wa.me/628985551285/`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-center text-lg md:text-2xl text-black bg-yellow-400 hover:bg-yellow-500 transition-all py-1 md:py-2 px-4 rounded-b"
            >
              <i className="ri-whatsapp-line mx-2"></i>
              Pesan
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
