import { useStore } from "@nanostores/react";
import { settings, input, rgbFormatRegex } from "../store"
import type { Settings } from "../store";
import { ClipboardIcon } from "../icons/Clipboard";
import { useCachedStore } from "../hooks/useCachedStore";

const colorMap = {
    "0": "<black>",
    "1": "<dark_blue>",
    "2": "<dark_green>",
    "3": "<dark_aqua>",
    "4": "<dark_red>",
    "5": "<dark_purple>",
    "6": "<gold>",
    "7": "<gray>",
    "8": "<dark_gray>",
    "9": "<blue>",
    "a": "<green>",
    "b": "<aqua>",
    "c": "<red>",
    "d": "<light_purple>",
    "e": "<yellow>",
    "f": "<white>",
}

const modifierMap = {
    "n": ["<u>", "<underlined>"],
    "m": ["<st>", "<strikethrough>"],
    "k": ["<obf>", "<obfuscated>"],
    "o": ["<i>", "<italic>"],
    "l": ["<b>", "<bold>"],
    "r": ["<r>", "<reset>"],
}
/*

*/

export const transform = (input: string, settings: Settings) => {
    const rgbFormat = settings.rgbFormat.replace('&', settings.character);

    let result = input

    for (const [key, value] of Object.entries(colorMap)) {
        result = result.replaceAll(`${settings.character}${key}`, value)
    }

    for (const [key, value] of Object.entries(modifierMap)) {
        result = result.replaceAll(`${settings.character}${key}`, value[settings.compact ? 0 : 1])
    }

    if (settings.rgb) {
        const regex = rgbFormatRegex.get(settings.rgbFormat).replace('$char', settings.character)
        const matcher = new RegExp(regex, "g");

        result = result.replaceAll(matcher, "<#$1>")
    }

    return result
}


export const Output = () => {
    const [$settings, updateSettings] = useCachedStore(settings);
    const [$input, updateInput] = useCachedStore(input);

    return (
        <div className="relative w-full flex flex-row gap-2 items-center">
            <textarea readOnly={true} className="resize-none 
            p-2 text-slate-300 leading-4
            max-h-12 overflow-y-auto
            rounded-tl-md rounded-bl-md rounded-br-md
            bg-gray-800 w-full"
                value={transform($input, $settings)}>

            </textarea>
            <button className="bg-slate-400 bg-opacity-50 hover:bg-slate-600 hover:bg-opacity-85 
            p-1 rounded-bl-md
            absolute top-0 right-0"
                onClick={() => {
                    navigator.clipboard.writeText(transform($input, $settings))
                }}><ClipboardIcon className="size-4" /> </button>
        </div>
    )
}
