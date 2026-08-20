export const dummyRequests = [
    {
        id: "1",
        sourceApp: "BIOS",
        badgeColor: "#1CA651",
        title: "Peminjaman APAR CO2 21kg General",
        date: new Date().toISOString(),
        requester: {
            name: "Tono Sartono",
            nip: "3082625",
            dept: "Teknologi Informasi PKC",
        },
        actionType: "approve_reject",
        webviewUrl: "https://pupuk-kujang.co.id/",
        detail: {
            "Jumlah Unit": "1 Unit",
            "No Transakasi": "BIOS/20260722/0031",
            "Jenis Peminjaman": "Barang Inventaris",
            "Tanggal Peminjaman": "22 Juli 2026"
        },
        note: "Digunakan untuk tutorial menggunakan APAR di Safety Induction",
        attachments: [{ name: "Lampiran.pdf" }],
    },
    {
        id: "2",
        sourceApp: "Simrisk",
        badgeColor: "#E4211F",
        title: "Approval RSCA - Risiko Operasional IT",
        date: new Date(Date.now() - 46 * 60 * 1000).toISOString(),
        requester: {
            name: "Tono Sartono",
            nip: "3082625",
            dept: "Teknologi Informasi PKC",
        },
        actionType: "redirect_only",
        webviewUrl: "https://pupuk-kujang.co.id/",
        detail: {
            "RCSA Kode": "RCSA-001-C0813730002-2024-001",
            "Periode": "2024",
            "Unit Kerja": "Departemen Teknologi Informasi & Komunikasi",
            "Status": "Submit to Manager",
        },
        note: "-",
        attachments: [{ name: "Lampiran.pdf" }],
    },
    {
        id: "3",
        sourceApp: "Nutriku",
        badgeColor: "#FFB900",  
        title: "ORD/20260721835/0004",
        date: new Date(Date.now() - 26 * 60 * 1000).toISOString(),
        requester: {
            name: "Tono Sartono",
            nip: "3082625",
            dept: "Teknologi Informasi PKC",
        },
        actionType: "approve_reject",
        webviewUrl: "https://pupuk-kujang.co.id/",
        detail: {
            "No.Order": "ORD/20260721835/0004",
            "Keperluan": "Untuk rapat"
        },
        note: "-",
        attachments: [{ name: "Lampiran.pdf" }],
    },
    {
    id: "4",
    sourceApp: "DTS",
    badgeColor: "#2F6FE0",
    title: "Approval Dokumen Kontrak Vendor",
    date: new Date(Date.now() - 26 * 60 * 1000).toISOString(),
    requester: { name: "Tono Sartono", nip: "3082625", dept: "Teknologi Informasi PKC" },
    actionType: "approve_reject",
    webviewUrl: "https://pupuk-kujang.co.id/",
    detail: { "No Dokumen": "DOC/2026/0089" },
    note: "-",
    attachments: [],
},
];

export default dummyRequests;
