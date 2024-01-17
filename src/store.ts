import { atom, map, type Atom } from "nanostores";

export const characters = [
    '&',
    '§'
];

export const rgbFormatRegex = new Map().set('{#RRGGBB}', '{#([0-9a-f]{6})}').set('&#RRGGBB', '$char#([0-9a-f]{6})');

export const rgbFormats = [
    '{#RRGGBB}',
    '&#RRGGBB'
];

export type Settings = {
    compact: boolean;
    character: '&' | '§';
    rgb: boolean;
    rgbFormat: '{#RRGGBB}' | '&#RRGGBB';
}

export type AtomStorage<T> = [Atom<T>, (arg0: T) => void];

const storageAtom = <T = unknown>(key: string, defaultValue: T): AtomStorage<T> => {
    const store = atom<T>(localStorage.getItem(key) ?
        JSON.parse(localStorage.getItem(key)!) :
        defaultValue);

    const update = (value: T) => {
        if (value === null) {
            localStorage.removeItem(key);
            store.set(defaultValue);
            return;
        }
        localStorage.setItem(key, JSON.stringify(value));
        store.set(value);
    }

    return [store, update]
}

export const settings = storageAtom<Settings>('settings', {
    compact: true,
    character: '&',
    rgb: true,
    rgbFormat: '{#RRGGBB}',
})



export const input = storageAtom<string>('input', '');
