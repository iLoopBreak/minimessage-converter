import { useStore } from "@nanostores/react"
import { settings, input } from "../store"
import { useCachedStore } from "../hooks/useCachedStore";

export const InputText = () => {
    const [$input, update] = useCachedStore(input);
    return (
        <>
            <span className="text-xl font-semibold">Input:</span>
            <textarea id="input" rows={10}
                spellCheck={false}
                value={$input}
                onChange={(e) =>{
                    update(e.target.value)
                }}
                className="border-1
                 block 
                 min-h-36 w-full 
                 rounded-md border border-double 
                 border-slate-800 border-transparent 
                 bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border 
                 px-3 py-2 
                
                 transition-all duration-500 [background-clip:padding-box,_border-box] 
                focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] 
                focus:outline-none"
        //         className="bg-gray-800 
		// min-h-36 p-2 
		// w-full"
            ></textarea>
        </>
    )
}