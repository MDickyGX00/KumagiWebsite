import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

const Footer = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/contacts")
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the contacts!", error);
        setError("There was an error fetching the contacts.");
        setLoading(false);
      });
  }, []);

  // Cek jika data masih loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Cek jika ada error dalam pengambilan data
  if (error) {
    return <div>{error}</div>;
  }

  const getSocialMediaLink = (platform, name) => {
    if (!name) return "#"; // Pastikan username ada
    switch (platform) {
      case "instagram":
        return `https://www.instagram.com/${name}`;
      case "facebook":
        return `https://www.facebook.com/${name}`;
      case "twitter":
        return `https://twitter.com/${name}`;
      default:
        return "#"; // kembalikan '#' jika tidak ada platform yang cocok
    }
  };

  const getSocialMediaIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <i className="fa-brands fa-square-instagram"></i>;
      case "facebook":
        return <i className="fa-brands fa-facebook"></i>;
      default:
        return null; // Tidak ada ikon untuk platform ini
    }
  };

  const getPlatformLink = (platform, name) => {
    switch (platform) {
      case "tokopedia":
        return `https://www.tokopedia.com/${name}`;
      case "shopee":
        return `https://shopee.co.id/${name}`;
      case "grabfood":
        return `https://www.grab.com/id/food/${name}`;
      case "gofood":
        return `https://gofood.id/${name}`;
      default:
        return "#";
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "tokopedia":
        return <i className="ri-store-2-line"></i>; // Ikon Tokopedia
      case "shopee":
        return <i className="ri-shopping-cart-line"></i>; // Ikon Shopee
      case "grabfood":
        return <i className="ri-car-line"></i>; // Ikon GrabFood
      case "gofood":
        return <i className="ri-motorbike-line"></i>; // Ikon GoFood
      default:
        return <i className="ri-question-line"></i>; // Ikon default jika tidak dikenali
    }
  };

  return (
    <footer className="mt-12 bg-black text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:text-left text-center">
        {/* Kolom 1: Nama Toko */}
        <div>
          <a href="#home">
            <h3 className="text-3xl font-bold mb-2">Kumagi Bake.</h3>
          </a>
        </div>

        {/* Kolom 2: Navbar */}
        <div>
          <h3 className="text-2xl font-bold mb-2">Navigasi</h3>
          <ul>
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
          <h3 className="text-2xl font-bold mb-2">Social Media</h3>
          <ul>
            {contacts.map((contact) => {
              console.log(contact.socialMedia); // Debugging untuk melihat apakah ada media sosial
              return (
                <li key={contact.id}>
                  <div>
                    {contact.socialMedia && (
                      <a
                        href={getSocialMediaLink(
                          contact.socialMedia,
                          contact.name
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-2 z-10 hover:underline mx-1"
                      >
                        {getSocialMediaIcon(contact.socialMedia)}
                        {"  "}
                        {contact.name}
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Kolom 4: Orderan */}
        <div>
          <h3 className="text-2xl font-bold mb-2">Orderan</h3>
          <ul>
            {contacts.map((contact) => {
              console.log(contact.platform); // Debugging untuk melihat apakah ada platform
              return (
                <li key={contact.id}>
                  <div>
                    {contact.platform && (
                      <a
                        href={getPlatformLink(contact.platform, contact.name)} // Fungsi untuk mendapatkan link berdasarkan platform
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-2 z-10 hover:underline mx-1"
                      >
                        {getPlatformIcon(contact.platform)}
                        {"  "}
                        {contact.name}
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
