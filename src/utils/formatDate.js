function isSameDay(d1, d2) {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

export function formatTimeInbox(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (isSameDay(date, now)) {
        return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
    }
    if (isSameDay(date, yesterday)) {
        return "Kemarin";
    }
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "numeric", year: "2-digit" });
}

export function formatTimeHome(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (isSameDay(date, now)) {
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 1) return "Baru saja";
        if (diffMins < 60) return `${diffMins} menit yang lalu`;
        const diffHours = Math.floor(diffMins / 60);
        return `${diffHours} jam yang lalu`;
    }
    if (isSameDay(date, yesterday)) {
        return "Kemarin";
    }
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "numeric", year: "2-digit" });
}