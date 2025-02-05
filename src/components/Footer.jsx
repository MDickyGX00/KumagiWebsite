const Footer = () => {
  return (
    <div className="">
      <footer className="mt-12 bg-black text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:text-left text-center">
          {/* Kolom 1: Nama Toko */}
          <div>
            <a href="#home">
              <h3 className="text-3xl font-bold mb-2 text-center">
                Kumagi Bake.
              </h3>
            </a>
          </div>

          {/* Kolom 2: Navbar */}
          <div className="">
            <h3 className="text-2xl font-bold mb-2">Navigasi</h3>
            <ul className="">
              <li>
                <a href="#home" className="hover:underline">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#testimoni" className="hover:underline">
                  Testimoni
                </a>
              </li>
              <li>
                <a href="#produk" className="hover:underline">
                  Produk
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:underline">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Sosial Media */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Sosial Media</h3>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/kumagi.bake?igsh=cTJkODYxejd0dHcw"
                  className="hover:underline"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Orderan */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Orderan</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Tokopedia
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shopee
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Grab
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  GoFood
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
