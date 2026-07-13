import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function AdminDashboard({ auth, orders }) {

    const [query, setQuery] = useState('');

    const stats = useMemo(() => {
        const total = orders.length;
        const pending = orders.filter(o => o.status === 'pending').length;
        const printing = orders.filter(o => o.status === 'printing').length;
        const ready = orders.filter(o => o.status === 'ready').length;
        const delivered = orders.filter(o => o.status === 'delivered').length;
        const revenue = orders.reduce((s, o) => s + (Number(o.total_price) || 0), 0);
        return { total, pending, printing, ready, delivered, revenue };
    }, [orders]);

    const filteredOrders = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return orders;
        return orders.filter(o => {
            return (
                String(o.id).includes(q) ||
                (o.user && o.user.name && o.user.name.toLowerCase().includes(q)) ||
                (o.status && o.status.toLowerCase().includes(q)) ||
                (o.delivery_slot && o.delivery_slot.toLowerCase().includes(q))
            );
        });
    }, [orders, query]);

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

                        <div className="mb-6">
                            <h3 className="text-2xl font-black text-gray-800 mb-4">Pusat Komando — Pesanan Masuk</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
                                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                    <div className="text-sm text-gray-600">Total Pesanan</div>
                                    <div className="text-2xl font-black text-green-600">{stats.total}</div>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                                    <div className="text-sm text-gray-600">Pending</div>
                                    <div className="text-2xl font-black text-yellow-700">{stats.pending}</div>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <div className="text-sm text-gray-600">Sedang Cetak</div>
                                    <div className="text-2xl font-black text-blue-700">{stats.printing}</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <div className="text-sm text-gray-600">Pendapatan</div>
                                    <div className="text-2xl font-black text-gray-800">Rp {new Intl.NumberFormat('id-ID').format(stats.revenue)}</div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center gap-4">
                                <div className="flex-1">
                                    <input
                                        type="search"
                                        placeholder="Cari by ID, nama pelanggan, status, atau slot antar..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                                    />
                                </div>
                                <div className="text-sm text-gray-500">Total: {stats.total} Pesanan</div>
                            </div>
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
                                    {filteredOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="p-8 text-center text-gray-500">Tidak ada pesanan yang sesuai.</td>
                                        </tr>
                                    ) : filteredOrders.map((order) => (
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
                                                    <img src="https://img.icons8.com/ios-filled/16/ffffff/download.png" alt="download" className="mr-2" />
                                                    Unduh PDF
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
