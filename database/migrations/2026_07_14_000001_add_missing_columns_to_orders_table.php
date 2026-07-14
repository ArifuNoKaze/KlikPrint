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
        Schema::table('orders', function (Blueprint $table) {
            if (!Schema::hasColumn('orders', 'description')) {
                $table->text('description')->nullable()->after('total_pages');
            }

            if (!Schema::hasColumn('orders', 'is_bound')) {
                $table->boolean('is_bound')->default(false)->after('total_pages');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (Schema::hasColumn('orders', 'description')) {
                $table->dropColumn('description');
            }

            if (Schema::hasColumn('orders', 'is_bound')) {
                $table->dropColumn('is_bound');
            }
        });
    }
};
