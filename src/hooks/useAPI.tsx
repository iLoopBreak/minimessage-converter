import { useEffect, useState } from "react"

interface Props {
    input: string,
    url: string
}

interface Response {
    success: Boolean,
    dom?: String,
    errorMessage?: String
}

const message = (input: string) => {
    return JSON.stringify({
        "type": "call",
        "miniMessage": input,
        "isolateNewlines": false
    })
}

const useSocket = <T = unknown>(url: string, onOpen: (socket: WebSocket)=>void) => {
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [response, setResponse] = useState<T | null>(null)

    useEffect(() => {
        const ws = new WebSocket(url);
        setSocket(ws)
        ws.onmessage = function (event) {
            try {
                const data = JSON.parse(event.data)
                setResponse(data.parseResult)
            } catch (err) {
                console.log(err);
            }
        };
        ws.onopen = function (event) {
            onOpen(ws)
        }
        ws.onerror = function (event) {
            console.error("Error connecting to websocket", event)
        }
        
        return () => {
            if(ws.readyState == WebSocket.OPEN)
                ws.close()
            setSocket(null)
        };
    }, []);

    const sendMessage = (message: string) => {
        if(socket === null) 
            return
        if(socket.readyState !== WebSocket.OPEN) 
            return
        
        socket.send(message)
    }

    return { sendMessage, response }
}

export const useAPI = ({ input, url }: Props): [Response | null, any] => {

    const { sendMessage, response } = useSocket<Response>(url, (socket)=> {
        if(socket.readyState !== WebSocket.OPEN) 
            return
        
        socket.send(message(input))
    })

    useEffect(() => {
        sendMessage(message(input))
    }, [input])

    return [
        response,
        sendMessage
    ]

}