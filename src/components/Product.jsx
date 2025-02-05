import { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]); // Data produk
  const [selectedCategory, setSelectedCategory] = useState("Semua Produk"); // Kategori yang dipilih

  // Fetch produk dari API
  useEffect(() => {
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

    fetchProducts();
  }, []);

  // Filter produk berdasarkan kategori
  const filteredProducts =
    selectedCategory === "Semua Produk"
      ? products
      : products.filter((product) => product.jenisMakanan === selectedCategory);

  return (
    <div className="produk xl:px-10 px-5 pt-20 pb-20 bg-white" id="produk">
      <div className="flex items-center justify-center">
        <h1 className="text-center xl:text-5xl text-2xl">Produk Kami</h1>
      </div>
      <div className="mb-4 pt-10 pb-5">
        {/* Filter Kategori */}
        <button
          className={`mr-2 px-4 py-2 rounded transition-all ${
            selectedCategory === "Semua Produk"
              ? "bg-yellow-400 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedCategory("Semua Produk")}
        >
          Semua Produk
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded transition-all ${
            selectedCategory === "BOLU"
              ? "bg-yellow-400 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedCategory("BOLU")}
        >
          Bolu
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded transition-all ${
            selectedCategory === "KUE_KERING"
              ? "bg-yellow-400 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedCategory("KUE_KERING")}
        >
          Kue Kering
        </button>
        <button
          className={`px-4 py-2 rounded transition-all ${
            selectedCategory === "BROWNIES"
              ? "bg-yellow-400 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedCategory("BROWNIES")}
        >
          Brownies
        </button>
      </div>

      {/* Daftar Produk */}
      <div className="xl:px-20">
        {filteredProducts.length > 0 ? (
          <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10">
            {filteredProducts.map((product, index) => (
              <li key={index} className="border rounded shadow">
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
                <p className=" mb-2 mx-2 px-4 text-xs sm:text-base py-1 rounded-full bg-yellow-300 inline-block text-right">
                  Stok: {product.stokProduk}
                </p>
                <a
                  href={`https://wa.me/628985551285/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-center text-lg md:text-2xl text-white bg-yellow-400 hover:bg-yellow-500 hover:text-black transition-all py-1 md:py-2 px-4 rounded-b"
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
    </div>
  );
};

export default Product;
