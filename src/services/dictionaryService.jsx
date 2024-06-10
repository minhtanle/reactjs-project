export const searchWord = async (string) => {
    string = string.trim().replaceAll('  ', '');
    if (!/^[a-z0-9]+$/i.test(string)) return null;

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${string}`);
    const data = await response.json();
    if (response.status !== 200) {
        return null;
    }
    return data;
}