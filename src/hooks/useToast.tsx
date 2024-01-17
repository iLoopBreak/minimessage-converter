import { useEffect, useState } from "react"
import { Toast } from "@/components/Toast"


interface Props {
    message: string,
    type: "success" | "error" | "warning" | "info"
}

export const useToast = ({ message, type }: Props): [() => void, JSX.Element | null] => {
    const [show, setShow] = useState(false)
    const [hide, setHide] = useState(false)

    useEffect(() => {
        if (!show) return

        const timeout = setTimeout(() => {
            setShow(false)
        }, 1500);

        return () => {
            clearTimeout(timeout)
        }
    }, [show])

    useEffect(() => {
        if (hide) return

        const timeout = setTimeout(() => {
            setHide(true)
        }, 1800);

        return () => {
            clearTimeout(timeout)
        }
    }, [hide])

    return [() => {
        setShow(true)
        setHide(false)
    }, (<Toast message={message} show={show} hide={hide && !show} />)]
}
