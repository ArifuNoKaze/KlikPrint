import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function History({ auth, orders }) {

    const getStatusStyle = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'printing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'ready': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'pending': return 'Menunggu Konfirmasi';
            case 'printing': return 'Sedang Dicetak';
            case 'ready': return 'Siap Diantar';
            case 'delivered': return 'Selesai';
            default: return 'Tidak Diketahui';
        }
    };

    const sortedOrders = [...orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const totalOrders = sortedOrders.length;
    const totalSpent = sortedOrders.reduce((sum, order) => sum + Number(order.total_price || 0), 0);
    const pendingCount = sortedOrders.filter((order) => order.status === 'pending').length;
    const latestOrder = sortedOrders[0];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Riwayat Pesanan</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Lihat aktivitas pesanan terakhir dan status pengiriman Anda.
                        </p>
                    </div>
                    <Link href={route('dashboard')} className="inline-flex items-center justify-center rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-green-700 transition">
                        Buat Pesanan Baru
                    </Link>
                </div>
            }
        >
            <Head title="Riwayat Pesanan - KlikPrint" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-[1.9fr,1fr] gap-6">
                        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-green-600 uppercase tracking-[0.2em]">Ringkasan Pesanan</p>
                                    <h3 className="mt-3 text-3xl font-black text-gray-900">Semua pesanan Anda</h3>
                                    <p className="mt-2 text-sm text-gray-500">Dapatkan status terkini, jumlah total pesanan, dan perkiraan biaya dalam 1 tampilan.</p>
                                </div>
                                <div className="rounded-3xl bg-green-50 p-4 text-green-700">
                                    <span className="text-3xl font-black">{totalOrders}</span>
                                    <p className="text-sm font-medium">Pesanan</p>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Total Bayar</p>
                                    <p className="mt-3 text-2xl font-bold text-gray-900">Rp{new Intl.NumberFormat('id-ID').format(totalSpent)}</p>
                                </div>
                                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Menunggu</p>
                                    <p className="mt-3 text-2xl font-bold text-orange-600">{pendingCount}</p>
                                </div>
                                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Status Terakhir</p>
                                    <p className="mt-3 text-2xl font-bold text-gray-900">{latestOrder ? getStatusText(latestOrder.status) : 'Belum ada pesanan'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-lg">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em]">Tips Cepat</p>
                            <h3 className="mt-4 text-3xl font-black">Buat pesananmu lebih efisien</h3>
                            <ul className="mt-6 space-y-4 text-sm text-green-100">
                                <li>• Gunakan ukuran kertas yang sesuai untuk meminimalkan pemotongan.</li>
                                <li>• Pilih jilid hanya jika butuh agar biaya tetap hemat.</li>
                                <li>• Periksa ulang jumlah halaman sebelum upload.</li>
                            </ul>
                            <div className="mt-8 rounded-3xl bg-white/10 p-6">
                                <p className="text-xs uppercase tracking-[0.2em] text-green-100">Pesanan terbaru</p>
                                <p className="mt-3 text-lg font-semibold">{latestOrder ? `INV-${latestOrder.id.toString().padStart(4, '0')}` : 'Belum ada pesanan'}</p>
                                <p className="mt-2 text-sm text-green-100/80">{latestOrder ? new Date(latestOrder.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Ayo mulai pesan sekarang!'}</p>
                            </div>
                        </div>
                    </div>

                    {orders.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
                            <p className="text-sm font-semibold text-gray-500">Sepertinya belum ada pesanan di akunmu.</p>
                            <p className="mt-3 text-2xl font-black text-gray-900">Ayo mulai cetak sekarang!</p>
                            <Link href={route('dashboard')} className="mt-6 inline-flex rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-green-700 transition">
                                Buat Pesanan Baru
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {sortedOrders.map((order) => (
                                <div key={order.id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                    <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                                <span className="font-semibold text-gray-900">INV-{order.id.toString().padStart(4, '0')}</span>
                                                <span>•</span>
                                                <span>{new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                            </div>
                                            <div className="mt-3 text-lg font-bold text-gray-900">{order.total_pages} Lembar · {order.print_type === 'bw' ? 'Hitam Putih' : 'Warna'}</div>
                                            <p className="mt-2 text-sm text-gray-600">{order.paper_size} · {order.delivery_slot === 'subuh' ? 'Subuh (05:30-07:30)' : 'Sore (15:00-17:00)'}</p>
                                            <p className="mt-2 text-sm text-gray-600">{order.is_bound ? 'Jilid Softcover ditambahkan' : 'Tanpa jilid'}</p>
                                            {order.description && (
                                                <p className="mt-3 rounded-3xl bg-gray-50 p-4 text-sm text-gray-700 border border-gray-200">
                                                    {order.description.length > 180 ? `${order.description.substring(0, 180)}...` : order.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-start gap-3 sm:items-end">
                                            <span className={`rounded-full border px-4 py-2 text-xs font-semibold ${getStatusStyle(order.status)}`}>{getStatusText(order.status)}</span>
                                            <div className="rounded-3xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900">
                                                Rp{new Intl.NumberFormat('id-ID').format(order.total_price)}
                                            </div>
                                            {order.status === 'pending' && (
                                                <Link href={route('orders.payment', order.id)} className="inline-flex rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-green-700 transition">
                                                    Lihat Pembayaran
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
