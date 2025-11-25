

export function useFormatters() {

    const ten = (i) => (i < 10 ? '0' : '') + i;

    const getTimeAndDate = (isoDate) => {
        if (!isoDate) return '';
        let dateOut = new Date(isoDate);
        const YYYY = dateOut.getFullYear();
        const MM = ten(dateOut.getMonth() + 1);
        const DD = ten(dateOut.getDate());
        const HH = ten(dateOut.getHours());
        const II = ten(dateOut.getMinutes());
        const SS = ten(dateOut.getSeconds());
        return `${YYYY}-${MM}-${DD}T${HH}:${II}:${SS}`;
    };

    const stringDate_time = (isoDate) => {
        if (!isoDate) return ['', '', ''];
        const dateObj = new Date(isoDate);
        return [
            dateObj.toLocaleString(),
            dateObj.toLocaleDateString(),
            dateObj.toLocaleTimeString()
        ];
    };

    const getStatusColor = (statusId) => {
        switch (statusId) {
            case 1: return { label: 'Enlazado', color: '#def0fc', colorText: '#43a6de' };
            case 2: return { label: 'En Transito', color: '#d5c8e2', colorText: '#161a83' };
            case 3: return { label: 'Completado', color: '#f1f7f2', colorText: '#2a9643' };
            case 4: return { label: 'No va', color: '#f1f7f2', colorText: '#2a9643' };
            case 5: return { label: 'Expirado', color: '#f7f2e5', colorText: '#eda041' };
            case 6: return { label: 'Ubicacion Erronea', color: '#ebcdcc', colorText: '#dd3a35' };
            default: return { label: 'Expired', color: '#f1f7f2', colorText: '#2a9643' };
        }
    };

    return {
        ten,
        getTimeAndDate,
        stringDate_time,
        getStatusColor
    };
}
