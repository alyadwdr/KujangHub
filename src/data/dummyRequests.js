export const dummyRequests = [
    {
        id: "1",
        sourceApp: "BIOS",
        badgeColor: "#1CA651",
        title: "Peminjaman APAR CO2 21kg General",
        date: "10 menit yang lalu",
        requester: {
            name: "Tono Sartono",
            nip: "3082625",
            dept: "Teknologi Informasi PKC",
        },
        actionType: "approve_reject",
        detail: {
            "Jumlah Unit": "1 Unit",
            "No Transakasi": "BIOS/20260722/0031",
            "Jenis Peminjaman": "Barang Inventaris",
            "Tanggal Peminjaman": "22 Juli 2026"
        },
        note: "Digunakan untuk tutorial menggunakan APAR di Safety Induction",
    },
    {
        id: "2",
        sourceApp: "Simrisk",
        badgeColor: "#2563EB",
        title: "Approval RSCA - Risiko Operasional IT",
        date: "46 menit yang lalu",
        requester: {
            name: "Tono Sartono",
            nip: "3082625",
            dept: "Teknologi Informasi PKC",
        },
        actionType: "redirect_only",
        detail: {
            "RCSA Kode": "RCSA-001-C0813730002-2024-001",
            "Periode": "2024",
            "Unit Kerja": "Departemen Teknologi Informasi & Komunikasi",
            "Status": "Submit to Manager",
        },
        note: "-"
    },
    {
        id: "3",
        sourceApp: "Nutriku",
        badgeColor: "#FFB900",  
        title: "ORD/20260721835/0004",
        date: "3 jam yang lalu",
        requester: {
            name: "Tono Sartono",
            nip: "3082625",
            dept: "Teknologi Informasi PKC",
        },
        actionType: "approve_reject",
        detail: {
            "No.Order": "ORD/20260721835/0004",
            "Keperluan": "Untuk rapat"
        },
        note: "-",
    },
];

export default dummyRequests;
