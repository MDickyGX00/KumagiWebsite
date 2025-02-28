import AboutImage from "../assets/images/about.png";
import HeroImage from "../assets/images/heroimg.jpg";
import CustomerReview from "../components/CustomerReview";
import ContactUs from "../components/ContactUs";
import Product from "../components/Product";

const HomePage = () => {
  return (
    <div className="mx-auto homepage">
      <div className="hero pt-20">
        <div
          className="box w-full h-96 bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HeroImage})` }}
        >
          <div className="sambutan flex px-14 py-6 sm:py-20 lg:py-28 justify-center text-center">
            <div className="box">
              <h1 className="text-yellow-100 text-2xl  md:text-4xl outline-2  font-bold">
                Kumagi Bake: Manisnya Hari Dimulai di Sini
              </h1>
              <p className="pt-10 text-yellow-100">
                Apakah Anda mencari kue yang bukan hanya lezat, tetapi juga
                dibuat dengan cinta? Kumagi Bake hadir untuk memberikan
                kehangatan dalam setiap gigitan.
              </p>
              <div className="button pt-5">
                <a
                  href="#about"
                  className="bg-yellow-400 px-14 py-3 rounded-md text-black font-bold hover:bg-yellow-500 transition-all"
                >
                  Lebih Lanjut
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="bg-white mx-auto pb-20 pt-20 px-10" id="about">
        <div className="headerAbout pb-6 md:pb-14 text-center">
          <div className="box">
            <h1 className="text-2xl md:text-5xl/tight">Tentang Kami</h1>
          </div>
        </div>
        <div className="about grid xl:grid-cols-2 grid-cols-1 gap-5 xl:gap-20 items-center px-4 xl:px-8">
          {/* Gambar di sebelah kiri */}
          <div className="box xl:shadow-left shadow-all">
            <img
              src={AboutImage}
              alt=""
              className="md:w-full md:m-0 bg-no-repeat mx-auto"
            />
          </div>
          {/* Teks di sebelah kanan */}
          <div className="box border-y-4 border-yellow-400 py-2">
            <p className="text-base/normal md:text-xl 2xl:text-2xl font-light">
              Kumagi Bake hadir untuk menghadirkan kue berkualitas tinggi yang
              tidak hanya lezat, tetapi juga membawa kebahagiaan di setiap
              gigitan. Dengan bahan terbaik dan sentuhan resep tradisional serta
              modern, kami menciptakan kue yang penuh rasa dan kenangan. Baik
              untuk perayaan, kejutan, atau sekadar memanjakan diri, kue-kue
              kami siap menyempurnakan hari Anda.
            </p>
            <p className="mt-4 text-blue-600 hover:underline">
              📍{" "}
              <a
                href="https://maps.app.goo.gl/ag8iVF1XKU1ZBbVi9"
              >
                Lihat Lokasi di Google Maps
              </a>
            </p>
          </div>
        </div>
      </div>

      <CustomerReview />
      <Product />
      <ContactUs />
    </div>
  );
};

export default HomePage;
