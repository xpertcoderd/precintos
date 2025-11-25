import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export function useExport() {
    const generateAndDownloadCSV = (data, filename = 'tabla.csv') => {
        if (!data || data.length === 0) {
            console.warn('No data to export');
            return;
        }
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        saveAs(blob, filename);
    };

    return {
        generateAndDownloadCSV
    };
}
