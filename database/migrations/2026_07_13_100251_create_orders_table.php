<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Relasi ke mahasiswa/user
            $table->string('document_path'); // Tempat menyimpan file PDF tugas
            $table->enum('paper_size', ['A4', 'F4']);
            $table->enum('print_type', ['bw', 'color']); // bw = hitam putih (Rp500), color (Rp1000)
            $table->integer('total_pages');
            $table->decimal('total_price', 10, 2);
            $table->enum('delivery_slot', ['subuh', 'sore']); // Sesuai jendela distribusi
            $table->enum('status', ['pending', 'printing', 'ready', 'delivered'])->default('pending');
            $table->string('qris_receipt_path')->nullable(); // Bukti bayar
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
