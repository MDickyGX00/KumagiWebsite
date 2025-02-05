import { useEffect, useState } from "react";

const Navbar = () => {
  const [tampil, setTampil] = useState(false);
  const [scroll, setScroll] = useState(false);

  const handleClick = () => {
    setTampil(!tampil);
    
  };

  let menuActive = tampil ? "left-0" : "-left-full";

  useEffect(() => {
    window.addEventListener("scroll", () => {
        if(window.scrollY > 5){
            setScroll(true);
            setTampil(false);
        } else{
            setScroll(false);
        }
    });
  });

let scrollActive = scroll ? "py-6 bg-white shadow" : "py-4";

  return (
    <div className={`navbar fixed w-full transition-all ${scrollActive}`}>
      <div className="container mx-auto px-4">
        <div className="navbar-box flex items-center justify-between">
          <a href="#home">
            <div className="logo">
              <h1 className="sm:text-2xl text-xl font-bold">Kumagi Bake.</h1>
            </div>
          </a>
          <ul
            className={`flex lg:gap-12 gap-8 lg:static lg:flex-row lg:shadow-none lg:p-0 lg:m-0 lg:transition-none lg:bg-transparent lg:w-auto lg:h-full lg:translate-y-0 fixed ${menuActive} top-1/2 -translate-y-1/2 flex-col px-8 py-6 rounded shadow-md shadow-black bg-yellow-400 font-bold lg:text-black text-white transition-all`}
          >
            <li className="flex items-center gap-3">
              <i className="ri-home-line text-3xl md:hidden block"></i>
              <a href="#home" className="font-medium opacity-75">
                Beranda
              </a>
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-information-line text-3xl md:hidden block"></i>
              <a href="#about" className="font-medium opacity-75">
              Tentang Kami
              </a>
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-information-line text-3xl md:hidden block"></i>
              <a href="#testimoni" className="font-medium opacity-75">
                Testimoni
              </a>
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-store-fill  text-3xl md:hidden block"></i>
              <a href="#produk" className="font-medium opacity-75">
                Produk
              </a>
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-phone-line text-3xl md:hidden block"></i>
              <a href="#kontak" className="font-medium opacity-75">
                Kontak
              </a>
            </li>
          </ul>
          <div className="social flex items-center gap-2">
            <a
              href="https://www.instagram.com/kumagi.bake?igsh=cTJkODYxejd0dHcw"
              className="bg-yellow-500 px-5 py-2 rounded-full text-black font-bold hover:bg-yellow-400 transition-all"
            >
              Sosial Media
            </a>
            <i
              className="ri-menu-line text-3xl lg:hidden block"
              onClick={handleClick}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
