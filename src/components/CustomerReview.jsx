import { useState, useEffect } from "react";
import axios from "axios";

const CustomerReview = () => {
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState({
    nama: "",
    komentar: "",
    nilai: 0,
  });
  const [reviews, setReviews] = useState([]); // Menyimpan data review dari database

  // Mengambil data review dari database saat komponen dimuat
  useEffect(() => {
    axios
      .get("http://10.20.20.23:8080/review")
      .then((response) => {
        setReviews(response.data); // Simpan data review ke state
      })
      .catch((error) => {
        console.error("Gagal mengambil data review:", error);
      });
  }, []);

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kirim review ke database
    axios
      .post("http://10.20.20.23:8080/review", review)
      .then((response) => {
        alert("Review berhasil ditambahkan!");
        setReviews([...reviews, response.data]); // Tambahkan review baru ke list
        setReview({ nama: "", komentar: "", nilai: 0 }); // Reset form
        setShowModal(false); // Tutup modal
      })
      .catch((error) => {
        console.error("Gagal menambahkan review:", error);
        alert("Gagal menambahkan review. Silakan coba lagi.");
      });
  };

  return (
    <div className="testimoni pt-20 pb-20 bg-yellow-400" id="testimoni">
      <h1 className="md:text-5xl/tight text-3xl font-medium mb-2 text-center">
        Customer Reviews
      </h1>
      <p className="text-center">
        Apa kata pelanggan kami tentang layanan kami.
      </p>
      <div className="testimoni-box pt-12 grid grid-cols-1 lg:grid-cols-3 gap-10 px-12 xl:px-36">
        {/* Tampilkan review dari state */}
        {reviews.map((item, index) => (
          <div key={index} className="box rounded-lg p-4 shadow bg-white">
            <h1 className="nama font-bold text-lg">{item.nama}</h1>
            <p className="komentar mt-2">{item.komentar}</p>
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
            <h2 className="rating text-yellow-500">
              {"⭐".repeat(item.nilai)} {/* Tampilkan bintang sesuai rating */}
            </h2>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => setShowModal(true)}
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
    </div>
  );
};

export default CustomerReview;
