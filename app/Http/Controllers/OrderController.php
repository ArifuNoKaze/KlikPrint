<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function create()
    {
        // Tetapkan batas aman printer per hari (misal: 500 lembar)
        $dailyPageLimit = 500;

        // Hitung total halaman dari semua pesanan hari ini
        $pagesPrintedToday = Order::whereDate('created_at', today())->sum('total_pages');

        // Cek apakah kuota sudah penuh
        $isCapped = $pagesPrintedToday >= $dailyPageLimit;

        $orders = Order::where('user_id', auth()->id())->get();
        $latestOrder = $orders->sortByDesc('created_at')->first();

        $statusLabels = [
            'pending' => 'Menunggu Konfirmasi',
            'printing' => 'Sedang Dicetak',
            'ready' => 'Siap Diantar',
            'delivered' => 'Selesai',
        ];

        return Inertia::render('Dashboard', [
            'isCapped'         => $isCapped,
            'remainingPages'   => max(0, $dailyPageLimit - $pagesPrintedToday),
            'totalOrders'      => $orders->count(),
            'totalSavings'     => $orders->sum(fn ($order) => $order->print_type === 'bw' ? 700 * $order->total_pages : 0),
            'latestStatusText' => $latestOrder ? ($statusLabels[$latestOrder->status] ?? 'Tidak Diketahui') : 'Siap Pesan',
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'document'      => 'required|mimes:pdf|max:10240',
            'total_pages'   => 'required|integer|min:1',
            'print_type'    => 'required|in:bw,color',
            'paper_size'    => 'required|in:A4,F4',
            'delivery_slot' => 'required|in:subuh,sore',
            'total_price'   => 'required|numeric',
            'is_bound'      => 'boolean',
        ]);

        // Validasi Keamanan Backend: Cek ulang kuota sebelum menyimpan
        $dailyPageLimit    = 500;
        $pagesPrintedToday = Order::whereDate('created_at', today())->sum('total_pages');

        if (($pagesPrintedToday + $request->total_pages) > $dailyPageLimit) {
            return back()->withErrors([
                'total_pages' => 'Mohon maaf, kuota cetak kami malam ini tersisa ' . max(0, $dailyPageLimit - $pagesPrintedToday) . ' lembar demi menjaga kualitas mesin.',
            ]);
        }

        $path = $request->file('document')->store('documents', 'public');

        $order = Order::create([
            'user_id'       => auth()->id(),
            'document_path' => $path,
            'paper_size'    => $request->paper_size,
            'print_type'    => $request->print_type,
            'total_pages'   => $request->total_pages,
            'is_bound'      => $request->is_bound ?? false,
            'total_price'   => $request->total_price,
            'delivery_slot' => $request->delivery_slot,
            'status'        => 'pending',
        ]);

        return redirect()->route('orders.payment', $order->id);
    }

    // Menampilkan halaman Pembayaran (QRIS)
    public function payment(Order $order)
    {
        // Keamanan tambahan: Pastikan yang membuka halaman ini hanya pemilik pesanannya
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak');
        }

        return Inertia::render('Payment', [
            'order' => $order,
        ]);
    }

    public function history()
    {
        // Ambil pesanan milik user yang sedang login
        $orders = Order::where('user_id', auth()->id())->latest()->get();

        return Inertia::render('History', [
            'orders' => $orders,
        ]);
    }

    // Menampilkan semua pesanan untuk Admin
    public function adminIndex()
    {
        // Ambil semua data pesanan, urutkan dari yang terbaru, dan bawa data user-nya (nama/email)
        $orders = Order::with('user')->latest()->get();

        return Inertia::render('AdminDashboard', [
            'orders' => $orders,
        ]);
    }

    // Mengubah status pesanan
    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,printing,ready,delivered',
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        // FITUR PRIVASI: Hapus PDF secara fisik dari server jika status sudah delivered
        if ($request->status === 'delivered' && $order->document_path !== 'Dihapus (Privasi Terjaga)') {

            // Hapus file dari folder public/documents
            if (Storage::disk('public')->exists($order->document_path)) {
                Storage::disk('public')->delete($order->document_path);
            }

            // Update database agar tidak ada lagi link yang tertinggal
            $order->update([
                'document_path' => 'Dihapus (Privasi Terjaga)',
            ]);
        }

        return redirect()->back();
    }
}
