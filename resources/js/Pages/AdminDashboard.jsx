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

        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        const revenueToday = orders.reduce((s, o) => {
            const createdAt = new Date(o.created_at);
            if (createdAt >= startOfToday && createdAt < endOfToday) {
                return s + (Number(o.total_price) || 0);
            }
            return s;
        }, 0);

        const revenueMonth = orders.reduce((s, o) => {
            const createdAt = new Date(o.created_at);
            if (createdAt >= startOfMonth && createdAt < endOfToday) {
                return s + (Number(o.total_price) || 0);
            }
            return s;
        }, 0);

        const weeklyOrders = Array.from({ length: 7 }, (_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() - (6 - index));
            const label = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
            const count = orders.filter((o) => {
                const createdAt = new Date(o.created_at);
                return createdAt.toDateString() === date.toDateString();
            }).length;
            return { label, count };
        });

        const latestOrders = [...orders]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5);

        return {
            total,
            pending,
            printing,
            ready,
            delivered,
            revenue,
            revenueToday,
            revenueMonth,
            weeklyOrders,
            latestOrders,
        };
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl text-white shadow-sm">
                                    <div className="text-sm opacity-90">Total Order</div>
                                    <div className="text-3xl font-black">{stats.total}</div>
                                </div>
                                <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-4 rounded-2xl text-white shadow-sm">
                                    <div className="text-sm opacity-90">Pending</div>
                                    <div className="text-3xl font-black">{stats.pending}</div>
                                </div>
                                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl text-white shadow-sm">
                                    <div className="text-sm opacity-90">Dicetak</div>
                                    <div className="text-3xl font-black">{stats.printing}</div>
                                </div>
                                <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-4 rounded-2xl text-white shadow-sm">
                                    <div className="text-sm opacity-90">Diantar</div>
                                    <div className="text-3xl font-black">{stats.ready}</div>
                                </div>
                                <div className="bg-gradient-to-br from-emerald-600 to-green-700 p-4 rounded-2xl text-white shadow-sm">
                                    <div className="text-sm opacity-90">Selesai</div>
                                    <div className="text-3xl font-black">{stats.delivered}</div>
                                </div>
                                <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-4 rounded-2xl text-white shadow-sm">
                                    <div className="text-sm opacity-90">Pendapatan Hari Ini</div>
                                    <div className="text-2xl font-black">Rp {new Intl.NumberFormat('id-ID').format(stats.revenueToday)}</div>
                                </div>
                                <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-4 rounded-2xl text-white shadow-sm">
                                    <div className="text-sm opacity-90">Pendapatan Bulan Ini</div>
                                    <div className="text-2xl font-black">Rp {new Intl.NumberFormat('id-ID').format(stats.revenueMonth)}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-6 mb-6">
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="font-bold text-gray-800">Order Mingguan</h4>
                                            <p className="text-sm text-gray-500">Jumlah pesanan dalam 7 hari terakhir</p>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Live</span>
                                    </div>
                                    <div className="h-52">
                                        <svg viewBox="0 0 320 180" className="w-full h-full">
                                            <line x1="20" y1="150" x2="300" y2="150" stroke="#d1d5db" strokeWidth="1" />
                                            <line x1="20" y1="110" x2="300" y2="110" stroke="#e5e7eb" strokeWidth="1" />
                                            <line x1="20" y1="70" x2="300" y2="70" stroke="#e5e7eb" strokeWidth="1" />
                                            <line x1="20" y1="30" x2="300" y2="30" stroke="#e5e7eb" strokeWidth="1" />
                                            {stats.weeklyOrders.map((item, index) => {
                                                const max = Math.max(...stats.weeklyOrders.map((entry) => entry.count), 1);
                                                const height = 100 * (item.count / max);
                                                const x = 40 + index * 40;
                                                const y = 150 - height;
                                                return (
                                                    <g key={item.label}>
                                                        <rect x={x} y={y} width="22" height={height} rx="6" fill="#16a34a" />
                                                        <text x={x + 11} y="168" textAnchor="middle" fontSize="10" fill="#6b7280">{item.label}</text>
                                                    </g>
                                                );
                                            })}
                                        </svg>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl p-5 text-white shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-bold">Pesanan Terbaru</h4>
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Update</span>
                                    </div>
                                    <div className="space-y-3">
                                        {stats.latestOrders.map((order) => (
                                            <div key={order.id} className="bg-white/15 rounded-xl p-3">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-semibold">#{order.id}</div>
                                                        <div className="text-xs opacity-90">{order.user?.name || 'User Terhapus'}</div>
                                                    </div>
                                                    <span className="text-xs font-semibold uppercase tracking-wide">{order.status}</span>
                                                </div>
                                                <div className="mt-2 text-sm font-semibold">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</div>
                                            </div>
                                        ))}
                                    </div>
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
                                        <th className="p-4 font-bold">Deskripsi</th>
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

                                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {/* Gunakan operator ternary untuk menangani jika deskripsi kosong */}
                                                {order.description ? order.description : (
                                                    <span className="text-gray-300 italic">Tidak ada catatan</span>
                                                )}
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
                                                    {/* <img src="https://img.icons8.com/ios-filled/16/ffffff/download.png" alt="download" className="mr-2" /> */}
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
