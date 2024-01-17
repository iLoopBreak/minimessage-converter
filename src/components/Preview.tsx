import { useStore } from "@nanostores/react"
import { input, settings } from "../store"
import { useAPI } from "../hooks/useAPI"
import { transform } from "./Output"
import { useMemo } from "react"
import { useCachedStore } from "../hooks/useCachedStore"


interface Props {
    previewUrl: string
}

export const Preview = ({ previewUrl }: Props) => {
    const [$settings, updateSettings] = useCachedStore(settings);
    const [$input, updateInput] = useCachedStore(input);

    const result = useMemo(() => transform($input, $settings), [$input, $settings])
    const [response, sendMessage] = useAPI({ input: result, url: previewUrl })

    if (response == null || response.dom === undefined) return (<></>)

    // console.log("Preview got response ", response)

    return (
        <>
        {/* Still working on preview side */}
            <div id="output-pane" className="flex flex-grow-1 flex-shrink-0 
            bg-cover"
                style={{ backgroundImage: "url(/assets/images/grass.jpg)" }}>
                <div id="chat-entry-box" className="hidden">_</div>
                <div id="server-list-icon" className="hidden">
                    <img id="server-list-image" src="img/kyori.png" alt="Example server icon" />
                </div>
                <div id="output-lines" className="flex flex-grow-1 flex-shrink-0">
                    <div id="server-list-header" className="mc-font hidden">
                        <span >KyoriCraft</span>
                        <span className="is-flex" style={{ color: "#aaaaaa", marginLeft: "auto" }}>
                            0<span style={{ color: "#555555" }}>/</span>20
                            <img id="server-list-ping" src="img/ping.png" />
                        </span>
                    </div>
                    <pre className="font-minecraft 
                    max-w-[42ch] min-h-10 max-h-[282px]
                    whitespace-pre-wrap break-words
                    mb-[118px] px-2
                    chat-scroll
                    text-[18px] leading-[28px] 
                    overflow-x-hidden " style={{
                            backgroundColor: 'rgba(1, 1, 1, 0.4)',
                            textShadow: '3px 3px hsl(0, 0%, 24%)',
                        }} dangerouslySetInnerHTML={{ __html: response.dom.replace("\n", "<br>") }}></pre>
                </div>

            </div></>)
}