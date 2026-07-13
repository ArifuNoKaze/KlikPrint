import { Link, Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth }) {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            question: "Berapa lama waktu untuk pesanan di-proses?",
            answer: "Pesanan diterima malam (23:00-03:00) akan diproses dan dicetak malam itu juga. Pengantaran dilakukan pagi (05:30-07:30). Jika pesan sore hari, proses dimulai keesokan harinya."
        },
        {
            question: "Bagaimana jika hasil cetak tidak sesuai?",
            answer: "Kami 100% bertanggung jawab! Setiap pesanan melalui quality check sebelum dikirim. Jika ada masalah, kami akan ganti gratis atau refund penuh."
        },
        {
            question: "Apakah bisa di-customize? Warna kertas, jenis kertas, dll?",
            answer: "Bisa banget! Di dashboard pesanan, Anda bisa memilih jenis kertas (HVS, Artpaper, dll), warna, dan tipe pengikat. Pilihan lengkap untuk kebutuhan Anda."
        },
        {
            question: "Berapa area pengantaran?",
            answer: "Saat ini kami melayani area kampus dan kos-kosan dalam radius 5km dari pusat kota. Lihat coverage map di app untuk area spesifik Anda."
        },
        {
            question: "Bisa pre-order untuk minggu depan?",
            answer: "Tentu! Anda bisa pesan berhari-hari sebelumnya. Kami akan mengingatkan Anda 1 jam sebelum proses mulai. Fleksibel sesuai timeline Anda."
        }
    ];

    return (
        <>
            <Head title="KlikPrint - Cetak & Antar Subuh" />
            <div className="min-h-screen bg-white text-gray-900">
                {/* Navbar */}
                <nav className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 border-b border-gray-100">
                    <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                        <div className="flex items-center space-x-2">
                            <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                KlikPrint
                            </div>
                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Beta</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-green-600 transition">Fitur</a>
                            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-green-600 transition">Harga</a>
                            <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-green-600 transition">FAQ</a>
                            {auth.user ? (
                                <Link href={route('dashboard')} className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-sm font-medium text-gray-600 hover:text-green-600 transition">
                                        Masuk
                                    </Link>
                                    <Link href={route('register')} className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="px-6 py-20 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block mb-4">
                                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                                    ✨ Layanan Pertama di Indonesia
                                </span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
                                Tidur Nyenyak,<br />
                                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Kami Urus Cetaknya</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Upload PDF malam, kami cetak tengah malam, hasil diantar subuh. Tugas Anda siap sebelum dosen masuk kelas. Hemat waktu, hemat stress.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <Link href={route('register')} className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-green-200 transition transform hover:scale-105">
                                    Mulai Sekarang
                                </Link>
                                <a href="#features" className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-200 transition">
                                    Lihat Cara Kerja
                                </a>
                            </div>

                            <div className="flex items-center space-x-8 pt-8 border-t border-gray-200">
                                <div>
                                    <div className="text-2xl font-black text-green-600">2.5k+</div>
                                    <div className="text-sm text-gray-600">Mahasiswa aktif</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-green-600">4.9★</div>
                                    <div className="text-sm text-gray-600">Rating</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-green-600">24/7</div>
                                    <div className="text-sm text-gray-600">Layanan siaga</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl blur-3xl opacity-30"></div>
                            <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-200">
                                <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                        <div className="text-sm font-semibold text-gray-500 mb-1">Langkah 1: Upload</div>
                                        <div className="text-2xl font-black text-green-600">📤 Drop PDF Anda</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                        <div className="text-sm font-semibold text-gray-500 mb-1">Langkah 2: Tidur</div>
                                        <div className="text-2xl font-black text-green-600">😴 Istirahat</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                        <div className="text-sm font-semibold text-gray-500 mb-1">Langkah 3: Ambil</div>
                                        <div className="text-2xl font-black text-green-600">🎉 Tugas Siap!</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Proof */}
                <section className="bg-gray-50 px-6 py-12 border-y border-gray-200">
                    <div className="max-w-7xl mx-auto">
                        <p className="text-center text-gray-600 font-semibold mb-8">Dipercaya oleh mahasiswa dari universitas terkemuka</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
                            <div className="text-center opacity-60 hover:opacity-100 transition">
                                <div className="font-black text-2xl text-gray-400">STIMIK</div>
                            </div>
                            <div className="text-center opacity-60 hover:opacity-100 transition">
                                <div className="font-black text-2xl text-gray-400">UINDK</div>
                            </div>
                            <div className="text-center opacity-60 hover:opacity-100 transition">
                                <div className="font-black text-2xl text-gray-400">UNTAD</div>
                            </div>
                            <div className="text-center opacity-60 hover:opacity-100 transition">
                                <div className="font-black text-2xl text-gray-400">UNISA</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="px-6 py-20 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Kenapa Pilih KlikPrint?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Solusi cetak yang dirancang khusus untuk ritme hidup mahasiswa modern</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 group-hover:scale-110 transition transform">
                                <img src="https://img.icons8.com/ios-filled/48/16a34a/alarm-clock.png" alt="clock" className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Midnight Service</h3>
                            <p className="text-gray-600">Terima pesanan mulai tengah malam hingga pagi hari. Kami kerja saat orang lain tidur.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 group-hover:scale-110 transition transform">
                                <img src="https://img.icons8.com/ios-filled/48/16a34a/rocket.png" alt="rocket" className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Proses Kilat</h3>
                            <p className="text-gray-600">Dari upload ke pengantaran hanya butuh beberapa jam. Tidak ada antri, tidak ada ribet.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 group-hover:scale-110 transition transform">
                                <img src="https://img.icons8.com/ios-filled/48/16a34a/color-palette.png" alt="palette" className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Customize Penuh</h3>
                            <p className="text-gray-600">Pilih jenis kertas, warna, ukuran, hingga binding. Sesuai keinginan dan budget Anda.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 group-hover:scale-110 transition transform">
                                <img src="https://img.icons8.com/ios-filled/48/16a34a/smartphone.png" alt="phone" className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Dashboard Real-time</h3>
                            <p className="text-gray-600">Track pesanan Anda kapan saja. Status update otomatis dari print hingga pengantaran.</p>
                        </div>

                        {/* Feature 5 */}
                        <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 group-hover:scale-110 transition transform">
                                <img src="https://img.icons8.com/ios-filled/48/16a34a/money-bag.png" alt="money" className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Harga Terjangkau</h3>
                            <p className="text-gray-600">Mulai dari Rp500/lembar. Tidak ada biaya tersembunyi, hitung transparan di awal.</p>
                        </div>

                        {/* Feature 6 */}
                        <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 group-hover:scale-110 transition transform">
                                <img src="https://img.icons8.com/ios-filled/48/16a34a/check-all.png" alt="check" className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Garansi Kepuasan</h3>
                            <p className="text-gray-600">Tidak puas? Ganti gratis atau refund 100%. Kepuasan Anda adalah prioritas kami.</p>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="bg-gray-50 px-6 py-20 border-y border-gray-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black mb-4">Paket Harga Fleksibel</h2>
                            <p className="text-lg text-gray-600">Pembayaran transparan, tidak ada biaya tersembunyi</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Basic */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-200">
                                <h3 className="text-xl font-bold mb-2">Basic</h3>
                                <p className="text-gray-600 text-sm mb-6">Untuk tugas ringan</p>
                                <div className="mb-6">
                                    <span className="text-3xl font-black">Rp500</span>
                                    <span className="text-gray-600">/lembar</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center space-x-2">
                                        <span className="text-green-600">✓</span>
                                        <span className="text-sm">Kertas HVS putih</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="text-green-600">✓</span>
                                        <span className="text-sm">Cetak B&W</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="text-green-600">✓</span>
                                        <span className="text-sm">Pengantaran subuh</span>
                                    </li>
                                </ul>
                                <Link href={route('register')} className="w-full py-3 border border-gray-300 text-gray-900 rounded-xl font-bold hover:bg-gray-50 transition text-center">
                                    Pilih Paket
                                </Link>
                            </div>

                            {/* Professional (Popular) */}
                            <div className="bg-white p-8 rounded-2xl border-2 border-green-600 relative">
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                                        PALING POPULER
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Professional</h3>
                                <p className="text-gray-600 text-sm mb-6">Untuk presentasi & cover</p>
                                <div className="mb-6">
                                    <span className="text-3xl font-black">Rp1.200</span>
                                    <span className="text-gray-600">/lembar</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center space-x-2">
                                        <span className="text-green-600">✓</span>
                                        <span className="text-sm">Kertas pilihan (HVS, Artpaper)</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="text-green-600">✓</span>
                                        <span className="text-sm">Cetak warna full</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="text-green-600">✓</span>
                                        <span className="text-sm">Binding tersedia</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="text-green-600">✓</span>
                                        <span className="text-sm">Pengantaran prioritas</span>
                                    </li>
                                </ul>
                                <Link href={route('register')} className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition text-center">
                                    Mulai Sekarang
                                </Link>
                            </div>

                            {/* Premium */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-200">
                                <h3 className="text-xl font-bold mb-2">Premium Plus</h3>
                                <p className="text-gray-600 text-sm mb-6">Untuk skripsi & buku</p>
                                <div className="mb-6">
                                    <span className="text-3xl font-black">Rp2.500</span>
                                    <span className="text-gray-600">/lembar</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center space-x-2">
                                        <span className="text-green-600">✓</span>
                                        <span className="text-sm">Semua fitur Professional</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="text-green-600">✓</span>
                                        <span className="text-sm">Jilid hardcover</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="text-green-600">✓</span>
                                        <span className="text-sm">Laminating opsional</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <span className="text-green-600">✓</span>
                                        <span className="text-sm">Konsultasi design gratis</span>
                                    </li>
                                </ul>
                                <Link href={route('register')} className="w-full py-3 border border-gray-300 text-gray-900 rounded-xl font-bold hover:bg-gray-50 transition text-center">
                                    Pilih Paket
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="px-6 py-20 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Cerita dari Pengguna</h2>
                        <p className="text-lg text-gray-600">Lihat bagaimana KlikPrint membantu mahasiswa lain</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                                    AM
                                </div>
                                <div className="ml-4">
                                    <p className="font-bold">Amin, Mahasiswa ITB</p>
                                    <p className="text-sm text-gray-600">Teknik Mesin</p>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                "Ini game changer banget! Dulu saya harus keluar kos jam 1 malam untuk nyari print, sekarang cukup upload dari bed. Tugas sudah jadi pagi-pagi."
                            </p>
                            <div className="mt-4 text-yellow-400">★★★★★</div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                                    SK
                                </div>
                                <div className="ml-4">
                                    <p className="font-bold">Sarah, Mahasiswa UI</p>
                                    <p className="text-sm text-gray-600">Desain Grafis</p>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                "Kualitas printnya terjaga! Warna-warna design saya cetak sempurna. Plus, harganya jauh lebih murah dari print shop biasa. Highly recommended!"
                            </p>
                            <div className="mt-4 text-yellow-400">★★★★★</div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                                    RD
                                </div>
                                <div className="ml-4">
                                    <p className="font-bold">Ridho, Mahasiswa UNPAD</p>
                                    <p className="text-sm text-gray-600">Administrasi Bisnis</p>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                "Sulit cari layanan print malam di kota kecil. KlikPrint jadi solusi sempurna. Pengantarnya on-time, responsif, dan genuine pedulian sama customer."
                            </p>
                            <div className="mt-4 text-yellow-400">★★★★★</div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="bg-gray-50 px-6 py-20 border-y border-gray-200">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black mb-4">Pertanyaan Umum</h2>
                            <p className="text-lg text-gray-600">Temukan jawaban untuk pertanyaan Anda</p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full px-8 py-4 flex justify-between items-center hover:bg-gray-50 transition"
                                    >
                                        <h3 className="text-left font-bold text-gray-900">{faq.question}</h3>
                                        <span className="text-2xl text-green-600 transition transform" style={{
                                            transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)'
                                        }}>
                                            ▼
                                        </span>
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-20 max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-16 text-center text-white">
                        <h2 className="text-4xl font-black mb-4">Siap Coba KlikPrint?</h2>
                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                            Daftar sekarang dan dapatkan diskon 20% untuk pesanan pertama Anda. Tidak perlu kartu kredit, hanya email dan nomor HP.
                        </p>
                        <Link href={route('register')} className="inline-block px-10 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105">
                            Mulai Gratis Sekarang
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300 px-6 py-12 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                            <div>
                                <h3 className="text-white font-black mb-4">KlikPrint</h3>
                                <p className="text-sm">Solusi cetak malam untuk mahasiswa yang sibuk.</p>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-4">Produk</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="hover:text-white transition">Fitur</a></li>
                                    <li><a href="#" className="hover:text-white transition">Harga</a></li>
                                    <li><a href="#" className="hover:text-white transition">Blog</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-4">Perusahaan</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="hover:text-white transition">Tentang</a></li>
                                    <li><a href="#" className="hover:text-white transition">Karir</a></li>
                                    <li><a href="#" className="hover:text-white transition">Kontak</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-4">Sosial</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                                    <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                                    <li><a href="#" className="hover:text-white transition">WhatsApp</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 pt-8 text-sm text-center">
                            <p>&copy; 2024 KlikPrint. Semua hak cipta dilindungi. | <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Terms of Service</a></p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
