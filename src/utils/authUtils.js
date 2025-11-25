export function decodeBase64Token(token) {
    try {
        const decodedJson = atob(token);
        return JSON.parse(decodedJson);
    } catch (e) {
        console.error('decodeBase64Token error:', e);
        return null;
    }
}
