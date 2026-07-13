<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OrderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Order Routes - Pesanan (hanya untuk user yang sudah login)
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard dan form pesanan baru
    Route::get('/dashboard', [OrderController::class, 'create'])->name('dashboard');
    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');

    // Menyimpan pesanan baru
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

    // Menampilkan halaman pembayaran/QRIS
    Route::get('/orders/{order}/payment', [OrderController::class, 'payment'])->name('orders.payment');

    // Menampilkan daftar pesanan user
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

    // Menampilkan detail pesanan
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');

    // Riwayat pesanan
    Route::get('/history', [OrderController::class, 'history'])->name('history');
});

// Rute Admin (Dilindungi super ketat oleh middleware 'admin')
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [OrderController::class, 'adminIndex'])->name('admin.dashboard');
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.update-status');
});

require __DIR__.'/auth.php';
