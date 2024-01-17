import { atom, map, type Atom } from "nanostores";


export enum ColorCharacter {
    Ampersand = '&',
    Section = '§'
}

export enum RgbFormat {
    Hex = '{#RRGGBB}',
    Html = '&#RRGGBB'
}

export const rgbFormatRegex = new Map().set(RgbFormat.Hex, '{#([0-9a-f]{6})}').set(RgbFormat.Html, '$char#([0-9a-f]{6})');

export type Settings = {
    compact: boolean;
    character: ColorCharacter;
    rgb: boolean;
    rgbFormat: RgbFormat;
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
    character: ColorCharacter.Ampersand,
    rgb: true,
    rgbFormat: RgbFormat.Hex,
})

export const input = storageAtom<string>('input', '');
