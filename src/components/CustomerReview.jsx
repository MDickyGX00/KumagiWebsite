import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

const CustomerReview = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // Modal untuk peringatan login
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal untuk sukses tambah review
  const [showGagalModal, setShowGagalModal] = useState(false); // Modal untuk sukses tambah review
  const [showValidationModal, setShowValidationModal] = useState(null);
  const [review, setReview] = useState({
    nama: "",
    komentar: "",
    nilai: 0,
  });
  const [reviews, setReviews] = useState([]); // Menyimpan data review dari database

  // Mengambil data review dari database saat komponen dimuat
  useEffect(() => {
    axiosInstance
      .get("/review")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data review:", error);
      });

    const token = Cookies.get("jwt_token");
    if (token) {
      axiosInstance
        .get("/validate-token")
        .then(() => setIsLoggedIn(true))
        .catch(() => setIsLoggedIn(false));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (review.nama.length < 6) {
      setShowValidationModal({
        title: "Nama Terlalu Pendek",
        message: "Nama harus terdiri dari minimal 6 huruf.",
      });
      return;
    }

    // Validasi panjang komentar minimal 24 huruf
    if (review.komentar.length < 24) {
      setShowValidationModal({
        title: "Komentar Terlalu Pendek",
        message: "Komentar harus terdiri dari minimal 24 huruf.",
      });
      return;
    }

    axiosInstance
      .post("/review", review)
      .then((response) => {
        setReviews([...reviews, response.data]);
        setReview({ nama: "", komentar: "", nilai: 0 });
        setShowModal(false);
        setShowSuccessModal(true); // Tampilkan modal sukses
      })
      .catch(() => {
        setShowGagalModal(true); // Tampilkan modal Gagal
      });
  };

  const handleAddReviewClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="testimoni pt-20 pb-20 bg-yellow-400" id="testimoni">
      <h1 className="md:text-5xl/tight text-3xl font-medium mb-2 text-center">
        Customer Reviews
      </h1>
      <p className="text-center">
        Apa kata pelanggan kami tentang layanan kami.
      </p>
      <div className="testimoni-box pt-12 grid grid-cols-1 lg:grid-cols-3 gap-10 px-12 xl:px-36 auto-rows-auto">
        {reviews
          .filter((item) => item.nilai >= 4) // Hanya tampilkan review dengan rating 4 dan 5
          .map((item, index) => (
            <div
              key={index}
              className="box rounded-lg p-4 shadow bg-white flex flex-col h-[250px]" // Pastikan semua card memiliki tinggi yang sama
            >
              <h1 className="nama font-bold text-lg">{item.nama}</h1>

              {/* Komentar dengan scrolling */}
              <div className="komentar mt-2 text-gray-700 break-words whitespace-normal max-h-30 overflow-y-auto pr-2 flex-grow">
                {item.komentar}
              </div>

              {/* Rating tetap di bawah */}
              <div className="mt-auto">
                <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
                <h2 className="rating text-yellow-500">
                  {"⭐".repeat(item.nilai)}
                </h2>
              </div>
            </div>
          ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleAddReviewClick}
          className="bg-yellow-700 text-white transition-all py-2 px-4 rounded-full hover:bg-yellow-800"
        >
          Tambah Review
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Tambah Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium mb-1"
                >
                  Nama
                </label>
                <input
                  id="nama"
                  type="text"
                  name="nama"
                  value={review.nama}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="komentar"
                  className="block text-sm font-medium mb-1"
                >
                  Komentar
                </label>
                <textarea
                  id="komentar"
                  name="komentar"
                  value={review.komentar}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="nilai"
                  className="block text-sm font-medium mb-1"
                >
                  Rating
                </label>
                <select
                  id="nilai"
                  name="nilai"
                  value={review.nilai}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">Pilih Rating</option>
                  <option value="1">1 - Sangat Buruk</option>
                  <option value="2">2 - Buruk</option>
                  <option value="3">3 - Cukup</option>
                  <option value="4">4 - Bagus</option>
                  <option value="5">5 - Sangat Bagus</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-lg font-bold mb-4">
              Review Berhasil Ditambahkan
            </h2>
            <p>Terima kasih telah memberikan ulasan Anda!</p>
            <div className="mt-4">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Oke
              </button>
            </div>
          </div>
        </div>
      )}

      {showGagalModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-lg font-bold mb-4">Gagal Menambahkan Review</h2>
            <p>Silakan coba lagi.</p>
            <div className="mt-4">
              <button
                onClick={() => setShowGagalModal(false)}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Oke
              </button>
            </div>
          </div>
        </div>
      )}

      {showValidationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-lg font-bold mb-4">
              {showValidationModal.title}
            </h2>
            <p>{showValidationModal.message}</p>
            <div className="mt-4">
              <button
                onClick={() => setShowValidationModal(null)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-lg font-bold mb-4">Anda Harus Login</h2>
            <p>Silakan login terlebih dahulu untuk menambahkan review.</p>
            <div className="mt-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReview;
