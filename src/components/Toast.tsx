
interface Props {
    message: string,
    show: boolean,
    hide: boolean
}

export const Toast = ({ message, show, hide }: Props) => {

    return (
        <div id="toast-simple" className={`fixed bottom-5 right-5 
            flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse 
            text-gray-500 bg-white divide-x 
            rtl:divide-x-reverse divide-gray-200 
            rounded-lg shadow 
            dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800
            ${show ? "delay-200" : "animate-jump-out delay-0"}
            ${hide && "hidden"}
            transition-2
            animate-fade-up animate-once animate-duration-700 animate-ease-out animate-normal`} role="alert">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9" />
            </svg>
            <div className="ps-4 text-sm font-normal">{message}</div>
        </div>
    )
}