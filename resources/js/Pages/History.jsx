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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Riwayat Pesanan</h2>
                    <Link href={route('dashboard')} className="text-sm font-medium text-green-600 hover:text-green-800 underline">
                        Buat Pesanan Baru
                    </Link>
                </div>
            }
        >
            <Head title="Riwayat Pesanan - KlikPrint" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200 p-6">

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                                        <th className="p-4 font-semibold uppercase tracking-wider">ID Pesanan</th>
                                        <th className="p-4 font-semibold uppercase tracking-wider">Tanggal</th>
                                        <th className="p-4 font-semibold uppercase tracking-wider">Detail</th>
                                        <th className="p-4 font-semibold uppercase tracking-wider">Total</th>
                                        <th className="p-4 font-semibold uppercase tracking-wider">Status</th>
                                        <th className="p-4 font-semibold uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="p-8 text-center text-gray-500">Anda belum pernah membuat pesanan.</td>
                                        </tr>
                                    ) : orders.map((order) => (
                                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-4 font-medium text-gray-900">
                                                INV-{order.id.toString().padStart(4, '0')}
                                            </td>
                                            <td className="p-4 text-sm text-gray-600">
                                                {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </td>
                                            <td className="p-4 text-sm text-gray-600">
                                                {order.total_pages} Lembar ({order.print_type === 'bw' ? 'Hitam Putih' : 'Warna'}) <br/>
                                                {order.is_bound ? '+ Jilid Softcover' : 'Tanpa Jilid'}
                                            </td>
                                            <td className="p-4 font-medium text-gray-900">
                                                Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(order.status)}`}>
                                                    {getStatusText(order.status)}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {order.status === 'pending' && (
                                                    <Link href={route('orders.payment', order.id)} className="text-sm font-medium text-blue-600 hover:text-blue-800 underline">
                                                        Lihat Pembayaran
                                                    </Link>
                                                )}
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
