import { useStore } from "@nanostores/react";
import { settings, rgbFormats, characters } from "../store";
import { useCachedStore } from "../hooks/useCachedStore";


export const Options = ({ }) => {
    const [$settings,update] = useCachedStore(settings);

    return (<>
        <div className="flex flex-row justify-around ">
            <div className="flex break-words flex-row gap-2 items-center">
                <input id="compact" type="checkbox" checked={$settings.compact}
                    onChange={() => update({
                        ...$settings,
                        compact: !$settings.compact
                    })} />
                <label htmlFor="compact">
                    Compact &lt;u&gt; vs &lt;underlined&gt;
                </label>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <select id="character" value={$settings.character}
                    onChange={(e) => {
                        update({
                            ...$settings,
                            character: e.target.value
                        })
                    }}
                    className="bg-gray-700">

                    {characters.map((character) => (
                        <option value={character} key={character}>
                            {character}
                        </option>
                    ))}
                </select>
                <label htmlFor="character">
                    Color character
                </label>
            </div>
            <div className="flex flex-shrink-0  flex-row gap-2 items-center">
                <select id="rgbFormat" value={$settings.rgbFormat}
                    onChange={(e) =>
                        update({
                            ...$settings,
                            rgbFormat: e.target.value
                        })
                    }
                    className="bg-gray-700">

                    {rgbFormats.map((rgbFormat) => (
                        <option value={rgbFormat} key={rgbFormat}>
                            {rgbFormat}
                        </option>
                    ))}

                </select>
                <label htmlFor="rgbFormat" >
                    RGB Format
                </label>
            </div>
        </div>
    </>);
}
