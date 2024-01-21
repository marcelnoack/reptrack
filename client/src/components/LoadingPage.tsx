import rptLogo from '../assets/Logo-512x512.png';

interface Props {
    message?: string;
}

export const LoadingPage = ( { message }: Props ) => {
    return <main
        className="flex-1 overflow-y-auto bg-zinc-800 min-h-screen flex flex-col items-center justify-center gap-2">
        <img src={rptLogo} className="w-1/5 lg:w-1/6 animate-bounce"/>
        {message && <span className="text-white text-md lg:text-lg">{message}</span>}
    </main>
}