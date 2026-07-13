import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Dashboard({ auth, isCapped, remainingPages, totalOrders = 0, totalSavings = 0, latestStatusText = 'Siap Pesan' }) {
    const { data, setData, post, processing, errors } = useForm({
        document: null,
        paper_size: "A4",
        print_type: "bw",
        total_pages: 1,
        delivery_slot: "subuh",
        description: "",
        is_bound: false,
        total_price: 500,
    });

    const [previewName, setPreviewName] = useState("");

    const currencyFormat = (value) => new Intl.NumberFormat("id-ID").format(value);

    const getWordCount = (text) => {
        const trimmed = text.trim();
        return trimmed ? trimmed.split(/\s+/).length : 0;
    };

    const descriptionWordCount = getWordCount(data.description);

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        const normalized = value.replace(/\s+/g, " ");
        const words = normalized.trim().split(" ").filter(Boolean);

        if (words.length <= 150) {
            setData("description", value);
            return;
        }

        setData("description", words.slice(0, 150).join(" ") + " ");
    };

    useEffect(() => {
        const pricePerPage = data.print_type === "bw" ? 500 : 1200;
        let calculateTotal =
            pricePerPage * (data.total_pages > 0 ? data.total_pages : 1);

        if (data.is_bound) {
            calculateTotal += 10000; // Biaya tambahan jilid sesuai Business Plan
        }

        setData("total_price", calculateTotal);
    }, [data.print_type, data.total_pages, data.is_bound]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("document", file);
            setPreviewName(file.name);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("orders.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Buat Pesanan Baru
                    </h2>
                    <Link
                        href={route("history")}
                        className="text-sm font-medium text-green-600 hover:text-green-800 underline"
                    >
                        Lihat Riwayat Pesanan
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard - Buat Pesanan" />

            <div className="py-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-gray-900 mb-2">
                            Selamat Datang,{" "}
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                {auth.user.name}
                            </span>
                            ! 👋
                        </h1>
                        <p className="text-gray-600">
                            Siap melanjutkan tugas? Upload file Anda dan biarkan
                            KlikPrint yang urus sisanya.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid gap-6 xl:grid-cols-[2fr,1fr] mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Total Pesanan</p>
                                        <p className="mt-4 text-4xl font-extrabold text-gray-900">{totalOrders}</p>
                                    </div>
                                    {/* <div className="text-5xl">📋</div> */}
                                </div>
                                <p className="mt-4 text-sm text-gray-500">Semua pesanan yang sudah kamu buat.</p>
                            </div>
                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Total Penghematan</p>
                                        <p className="mt-4 text-4xl font-extrabold text-emerald-600">Rp{currencyFormat(totalSavings)}</p>
                                    </div>
                                    {/* <div className="text-5xl">💰</div> */}
                                </div>
                                <p className="mt-4 text-sm text-gray-500">Angka ini menunjukkan estimasi hematmu.</p>
                            </div>
                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Status Terbaru</p>
                                        <p className="mt-4 text-3xl font-extrabold text-orange-600">{latestStatusText}</p>
                                    </div>
                                    {/* <div className="text-5xl">⏱️</div> */}
                                </div>
                                <p className="mt-4 text-sm text-gray-500">Pesanan terbaru kamu saat ini.</p>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-green-700 p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">Ringkasan Pesanan</p>
                                    <h3 className="mt-4 text-3xl font-black">Preview pesananmu</h3>
                                </div>
                                <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">Realtime</span>
                            </div>
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-3xl bg-white/10 p-4">
                                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-100">Tipe Cetak</p>
                                    <p className="mt-2 text-lg font-semibold">{data.print_type === 'bw' ? 'Hitam Putih' : 'Warna'}</p>
                                </div>
                                <div className="rounded-3xl bg-white/10 p-4">
                                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-100">Ukuran</p>
                                    <p className="mt-2 text-lg font-semibold">{data.paper_size}</p>
                                </div>
                                <div className="rounded-3xl bg-white/10 p-4">
                                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-100">Halaman</p>
                                    <p className="mt-2 text-lg font-semibold">{data.total_pages}</p>
                                </div>
                                <div className="rounded-3xl bg-white/10 p-4">
                                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-100">Jilid</p>
                                    <p className="mt-2 text-lg font-semibold">{data.is_bound ? 'Softcover' : 'Tanpa jilid'}</p>
                                </div>
                            </div>
                            <div className="mt-8 rounded-3xl bg-white/10 p-5">
                                <p className="text-xs uppercase tracking-[0.3em] text-emerald-100">Total Estimasi</p>
                                <p className="mt-2 text-3xl font-black">Rp{currencyFormat(data.total_price)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Form Section */}
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-8 border-b border-gray-200">
                            <h2 className="text-3xl font-black text-gray-900 mb-1">
                                Buat Pesanan Baru
                            </h2>
                            <p className="text-gray-600">
                                Isi form di bawah dan mulai proses cetak Anda
                                sekarang
                            </p>
                        </div>

                        {/* BANNER PERINGATAN ORDER CAPPING */}
                        {isCapped && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                                <h4 className="text-red-800 font-bold">
                                    Mohon Maaf, Kuota Harian Penuh
                                </h4>
                                <p className="text-red-600 text-sm mt-1">
                                    Untuk menjaga kualitas hasil cetak dan
                                    mencegah mesin mengalami overheat, kami
                                    membatasi jumlah pesanan harian. Silakan
                                    kembali lagi besok pagi.
                                </p>
                            </div>
                        )}

                        {/* TAMPILKAN SISA KUOTA JIKA BELUM PENUH */}
                        {!isCapped && remainingPages <= 100 && (
                            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                                <p className="text-yellow-700 text-sm font-medium">
                                    Informasi: Kuota cetak malam ini tersisa{" "}
                                    {remainingPages} lembar.
                                </p>
                            </div>
                        )}

                        <form onSubmit={submit} className={`p-8 space-y-8 ${isCapped ? "opacity-50 pointer-events-none" : ""}`}>
                            {/* Step 1: Upload File */}
                            <div className="border-l-4 border-green-500 pl-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-3">
                                        1
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Upload File PDF
                                    </h3>
                                </div>
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full p-8 border-2 border-green-300 border-dashed rounded-2xl cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition group"
                                    >
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="text-5xl mb-3 group-hover:scale-110 transition transform">
                                                📄
                                            </div>
                                            <p className="mb-2 text-base text-gray-800 font-bold">
                                                {previewName ? (
                                                    <span className="text-green-600">
                                                        ✓ {previewName}
                                                    </span>
                                                ) : (
                                                    <>
                                                        Klik atau drag file PDF
                                                        di sini
                                                    </>
                                                )}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Format: PDF | Ukuran maksimal:
                                                10MB
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </label>
                                </div>
                                {errors.document && (
                                    <div className="text-red-500 text-sm mt-3 font-semibold">
                                        ⚠️ {errors.document}
                                    </div>
                                )}
                            </div>

                            <div className="border-l-4 border-green-500 pl-6 bg-white rounded-3xl border border-green-100 p-6 shadow-sm">
                                <div className="flex items-center mb-4">
                                    <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-3">
                                        ✍️
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Deskripsi Pesanan
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Tambahkan instruksi cetak atau informasi khusus. Maksimal 150 kata.
                                        </p>
                                    </div>
                                </div>
                                <textarea
                                    rows="5"
                                    className="w-full rounded-2xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 px-4 py-3 text-sm text-gray-900 resize-none transition"
                                    value={data.description}
                                    onChange={handleDescriptionChange}
                                    placeholder="Contoh: Mohon cetak bolak-balik, gunakan margin 2 cm, dan rapikan halaman daftar isi."
                                />
                                <div className="mt-3 flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Opsional, cukup 30 kata.</span>
                                    <span className={descriptionWordCount > 30 ? "text-red-600 font-semibold" : "text-gray-500"}>
                                        {descriptionWordCount}/30 kata
                                    </span>
                                </div>
                                {errors.description && (
                                    <div className="text-red-500 text-sm mt-3 font-semibold">
                                        ⚠️ {errors.description}
                                    </div>
                                )}
                            </div>

                            {/* Step 2-5: Settings Grid */}
                            <div>
                                <div className="flex items-center mb-6">
                                    <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-3">
                                        2
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Konfigurasi Pesanan
                                    </h3>
                                </div>
                                <div className="border-l-4 border-green-500 pl-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Pages */}
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                                            Jumlah Halaman
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm px-4 py-3 transition"
                                            value={data.total_pages}
                                            onChange={(e) =>
                                                setData(
                                                    "total_pages",
                                                    parseInt(e.target.value) ||
                                                        0,
                                                )
                                            }
                                            required
                                        />
                                        {errors.total_pages && (
                                            <div className="text-red-500 text-sm mt-2">
                                                {errors.total_pages}
                                            </div>
                                        )}
                                    </div>

                                    {/* Print Type */}
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                                            Tipe Cetak
                                        </label>
                                        <select
                                            className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm px-4 py-3 transition"
                                            value={data.print_type}
                                            onChange={(e) =>
                                                setData(
                                                    "print_type",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="bw">
                                                Hitam Putih - Rp500/lbr
                                            </option>
                                            <option value="color">
                                                Warna - Rp1.200/lbr
                                            </option>
                                        </select>
                                    </div>

                                    {/* Paper Size */}
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                                            Ukuran Kertas
                                        </label>
                                        <div className="flex gap-4">
                                            <label
                                                className="flex items-center flex-1 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
                                                style={{
                                                    borderColor:
                                                        data.paper_size === "A4"
                                                            ? "#16a34a"
                                                            : "#d1d5db",
                                                    backgroundColor:
                                                        data.paper_size === "A4"
                                                            ? "#f0fdf4"
                                                            : "white",
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    className="text-green-600"
                                                    value="A4"
                                                    checked={
                                                        data.paper_size === "A4"
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "paper_size",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 font-semibold">
                                                    A4
                                                </span>
                                            </label>
                                            <label
                                                className="flex items-center flex-1 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
                                                style={{
                                                    borderColor:
                                                        data.paper_size === "F4"
                                                            ? "#16a34a"
                                                            : "#d1d5db",
                                                    backgroundColor:
                                                        data.paper_size === "F4"
                                                            ? "#f0fdf4"
                                                            : "white",
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    className="text-green-600"
                                                    value="F4"
                                                    checked={
                                                        data.paper_size === "F4"
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "paper_size",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 font-semibold">
                                                    F4
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Delivery */}
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                                            Waktu Pengantaran
                                        </label>
                                        <select
                                            className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm px-4 py-3 transition"
                                            value={data.delivery_slot}
                                            onChange={(e) =>
                                                setData(
                                                    "delivery_slot",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="subuh">
                                                🌙 Subuh Pagi (05:30 - 07:30)
                                            </option>
                                            <option value="sore">
                                                ☀️ Sore Hari (15:00 - 17:00)
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-5 w-5"
                                        checked={data.is_bound}
                                        onChange={(e) =>
                                            setData(
                                                "is_bound",
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    <span className="ml-3 text-gray-700 font-medium">
                                        Tambahkan Jilid Softcover (+Rp10.000)
                                    </span>
                                </label>
                            </div>

                            {/* Price Summary & CTA */}
                            <div className="mt-10 bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                                        <p className="text-gray-600 text-sm font-semibold mb-1">
                                            Harga per Lembar
                                        </p>
                                        <p className="text-2xl font-black text-green-600">
                                            Rp
                                            {new Intl.NumberFormat(
                                                "id-ID",
                                            ).format(
                                                data.print_type === "bw"
                                                    ? 500
                                                    : 1200,
                                            )}
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                                        <p className="text-gray-600 text-sm font-semibold mb-1">
                                            Jumlah Halaman
                                        </p>
                                        <p className="text-2xl font-black text-gray-900">
                                            {data.total_pages}
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                                        <p className="text-gray-600 text-sm font-semibold mb-1">
                                            Total Pembayaran
                                        </p>
                                        <p className="text-2xl font-black text-green-600">
                                            Rp
                                            {new Intl.NumberFormat(
                                                "id-ID",
                                            ).format(data.total_price)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="submit"
                                        disabled={
                                            processing ||
                                            !data.document ||
                                            isCapped
                                        }
                                        className={`px-6 py-3 rounded-md font-semibold text-white transition ${processing || !data.document || isCapped ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-800"}`}
                                    >
                                        {isCapped
                                            ? "Kuota Penuh"
                                            : processing
                                              ? "Memproses..."
                                              : "Lanjutkan ke Pembayaran"}
                                    </button>
                                    <button
                                        type="reset"
                                        className="px-6 py-4 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition"
                                        onClick={() => {
                                            setData({
                                                ...data,
                                                document: null,
                                            });
                                            setPreviewName("");
                                        }}
                                    >
                                        Bersihkan Form
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Info Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                            <div className="text-3xl mb-2">💡</div>
                            <h3 className="font-bold text-gray-900 mb-1">
                                Butuh Bantuan?
                            </h3>
                            <p className="text-sm text-gray-700 mb-3">
                                Tim support kami siap membantu Anda 24/7 via
                                WhatsApp atau email.
                            </p>
                            <a
                                href="#"
                                className="text-blue-600 font-semibold text-sm hover:underline"
                            >
                                Hubungi Support →
                            </a>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                            <div className="text-3xl mb-2">📚</div>
                            <h3 className="font-bold text-gray-900 mb-1">
                                Panduan Lengkap
                            </h3>
                            <p className="text-sm text-gray-700 mb-3">
                                Lihat panduan step-by-step untuk memaksimalkan
                                hasil cetak Anda.
                            </p>
                            <a
                                href="#"
                                className="text-purple-600 font-semibold text-sm hover:underline"
                            >
                                Baca Panduan →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
