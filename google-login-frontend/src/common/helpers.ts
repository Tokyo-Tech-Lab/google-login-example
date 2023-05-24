export function isValidJSON(str: string) {
    try {
        const object = JSON.parse(str);
        if (object && typeof object === 'object') return true;
        return false;
    } catch (error) {
        return false;
    }
}