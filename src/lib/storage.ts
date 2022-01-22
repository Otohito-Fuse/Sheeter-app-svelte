const storageKey = 'sveltenote/notes';

export const makeStorageKey = (s: string) => ('LeadSheeterApp/' + s);

export const loadFromStorage = (s: string) => {
    const rawData = sessionStorage.getItem(makeStorageKey(s));
    if (rawData) {
        return JSON.parse(rawData)['text'];
    } else {
        return "";
    }
}

export const saveToStorage = (s: string, text: string) => {
    const data: any = {
        'text': text
    };
    sessionStorage.setItem(makeStorageKey(s), JSON.stringify(data));
}