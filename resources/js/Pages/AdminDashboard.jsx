import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function AdminDashboard({ auth, orders }) {

    // Fungsi untuk memicu update status ke Laravel
    const handleStatusChange = (orderId, newStatus) => {
        router.patch(route('orders.update-status', orderId), { status: newStatus });
    };

    // Pewarnaan badge status
    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'printing': return 'bg-blue-100 text-blue-800';
            case 'ready': return 'bg-purple-100 text-purple-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pusat Komando (Admin)</h2>}
        >
            <Head title="Admin Dashboard - KlikPrint" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 p-6">

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-black text-gray-800">Daftar Pesanan Masuk 🖨️</h3>
                            <div className="text-sm text-gray-500">Total: {orders.length} Pesanan</div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                                        <th className="p-4 font-bold">ID / Tgl</th>
                                        <th className="p-4 font-bold">Pelanggan</th>
                                        <th className="p-4 font-bold">Spesifikasi</th>
                                        <th className="p-4 font-bold">Slot Antar</th>
                                        <th className="p-4 font-bold">File PDF</th>
                                        <th className="p-4 font-bold">Ubah Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="p-8 text-center text-gray-500">Belum ada pesanan masuk.</td>
                                        </tr>
                                    ) : orders.map((order) => (
                                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                            <td className="p-4">
                                                <div className="font-bold text-green-600">#{order.id}</div>
                                                <div className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString('id-ID')}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-bold text-gray-800">{order.user?.name || 'User Terhapus'}</div>
                                                <div className="text-xs text-gray-500">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-semibold">{order.paper_size} - {order.print_type === 'bw' ? 'B&W' : 'Warna'}</div>
                                                <div className="text-xs text-gray-500">{order.total_pages} Lembar</div>
                                            </td>
                                            <td className="p-4">
                                                <span className="capitalize text-sm font-bold">{order.delivery_slot}</span>
                                            </td>
                                            <td className="p-4">
                                                <a
                                                    href={`/storage/${order.document_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded hover:bg-gray-700 transition"
                                                >
                                                    ⬇️ Unduh PDF
                                                </a>
                                            </td>
                                            <td className="p-4">
                                                <select
                                                    className={`text-sm font-bold rounded-lg border-none shadow-sm cursor-pointer ${getStatusColor(order.status)} focus:ring-0`}
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                >
                                                    <option value="pending">🟡 Pending (Cek WA)</option>
                                                    <option value="printing">🔵 Sedang Dicetak</option>
                                                    <option value="ready">🟣 Siap Diantar</option>
                                                    <option value="delivered">🟢 Selesai (Delivered)</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
