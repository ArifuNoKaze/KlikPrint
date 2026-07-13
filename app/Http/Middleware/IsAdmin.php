<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        // Cek apakah user yang login memiliki role 'admin'
        if (auth()->user()->role !== 'admin') {
            // Jika bukan admin (misal: 'pelanggan'), tendang keluar!
            abort(403, 'Akses Ditolak! Anda bukan admin KlikPrint.');
        }

        return $next($request);
    }
}
