<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // Mengizinkan kolom-kolom ini diisi oleh sistem
    protected $fillable = [
        'user_id',
        'document_path',
        'paper_size',
        'print_type',
        'total_pages',
        'description',
        'total_price',
        'delivery_slot',
        'status',
        'qris_receipt_path',
        'is_bound',
    ];

    // Relasi: Satu pesanan dimiliki oleh satu user (mahasiswa)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
