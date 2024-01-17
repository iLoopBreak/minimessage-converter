import type { Atom } from "nanostores";
import type { AtomStorage } from "../store";
import { useStore } from "@nanostores/react";

export const useCachedStore = <T = unknown>(atomStorage: AtomStorage<T>): [T, (arg0: T) => void] => {
    const [atom, update] = atomStorage;
    const $atom = useStore(atom)
    
    return [$atom, update]
}