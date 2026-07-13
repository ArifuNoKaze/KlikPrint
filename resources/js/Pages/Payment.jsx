import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Payment({ auth, order }) {

    // Format pesan WhatsApp otomatis
    const waNumber = "6285756946155"; // Ganti dengan nomor Admin/Kurir KlikPrint
    const message = `Halo KlikPrint! 🚀\n\nSaya telah melakukan pemesanan dan pembayaran.\n\nDetail Pesanan:\n- ID Pesanan: #${order.id}\n- Tipe: ${order.print_type === 'bw' ? 'Hitam Putih' : 'Warna'}\n- Kertas: ${order.paper_size}\n- Jumlah: ${order.total_pages} Lembar\n- Total: Rp${order.total_price}\n- Slot Antar: ${order.delivery_slot}\n\n[SAYA AKAN MELAMPIRKAN BUKTI TRANSAKSI QRIS DISINI]`;

    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Selesaikan Pembayaran</h2>}
        >
            <Head title="Pembayaran QRIS - KlikPrint" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 p-8 text-center">

                        <div className="mb-6">
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                                Status: Menunggu Pembayaran
                            </span>
                        </div>

                        <h3 className="text-3xl font-black text-gray-800 mb-2">Total: Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</h3>
                        <p className="text-gray-600 mb-8">Scan QRIS di bawah ini menggunakan aplikasi M-Banking atau e-Wallet Anda (Gopay, OVO, Dana, dll).</p>

                        {/* Area Gambar QRIS */}
                        <div className="flex justify-center mb-8">
                            <div className="p-4 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50">
                                {/* GANTI SRC DI BAWAH INI DENGAN GAMBAR QRIS ASLI ANDA */}
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                                    alt="QRIS KlikPrint"
                                    className="w-64 h-64 object-contain"
                                />
                                <p className="mt-4 font-bold text-gray-700">A.N. KLIKPRINT INDONESIA</p>
                            </div>
                        </div>

                        <div className="bg-green-50 p-6 rounded-xl text-left border border-green-100 mb-8">
                            <h4 className="font-bold text-green-800 mb-2">Langkah Terakhir:</h4>
                            <ol className="list-decimal ml-5 text-green-700 space-y-1 text-sm">
                                <li>Lakukan pembayaran sesuai nominal (Rp {order.total_price})</li>
                                <li>Screenshot bukti pembayaran Anda</li>
                                <li>Klik tombol WhatsApp di bawah untuk konfirmasi ke Admin</li>
                            </ol>
                        </div>

                        {/* Tombol Konfirmasi WA */}
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg shadow-green-200 transition transform hover:scale-105"
                        >
                            <span>Konfirmasi ke WhatsApp Admin</span>
                            <span className="ml-2 text-xl">💬</span>
                        </a>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
